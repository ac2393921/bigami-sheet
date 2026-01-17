/**
 * useCharacters フックのテスト - 一覧取得機能
 */

import { renderHook, waitFor } from '@testing-library/react'
import { useCharacters } from '../useCharacters'
import { supabase } from '@/lib/supabase'
import type { Character } from '@/types'

// Supabase クライアントをモック
jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn(),
  },
}))

describe('useCharacters - 一覧取得', () => {
  const mockSupabase = supabase as jest.Mocked<typeof supabase>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('初期状態では空の配列、loading は false、error は null であること', () => {
    const mockFrom = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          order: jest.fn().mockResolvedValue({
            data: [],
            error: null,
          }),
        }),
      }),
    })
    mockSupabase.from = mockFrom

    const { result } = renderHook(() => useCharacters())

    expect(result.current.characters).toEqual([])
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('fetchCharacters を呼び出すと Supabase から全キャラクター一覧を取得すること', async () => {
    const mockCharacters: Partial<Character>[] = [
      {
        id: 'char-1',
        user_id: 'user-1',
        name: 'テストシノビ1',
        player_name: 'プレイヤー1',
        school: '斜歯忍軍',
        rank: '中忍',
        life_points: 6,
        achievement_points: 0,
        is_public: true,
      },
      {
        id: 'char-2',
        user_id: 'user-2',
        name: 'テストシノビ2',
        player_name: 'プレイヤー2',
        school: '鞍馬神流',
        rank: '上忍',
        life_points: 6,
        achievement_points: 5,
        is_public: true,
      },
    ]

    const mockFrom = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          order: jest.fn().mockResolvedValue({
            data: mockCharacters,
            error: null,
          }),
        }),
      }),
    })
    mockSupabase.from = mockFrom

    const { result } = renderHook(() => useCharacters())

    await result.current.fetchCharacters()

    await waitFor(() => {
      expect(result.current.characters).toHaveLength(2)
      expect(result.current.characters[0].name).toBe('テストシノビ1')
      expect(result.current.characters[1].name).toBe('テストシノビ2')
      expect(result.current.loading).toBe(false)
    })

    expect(mockSupabase.from).toHaveBeenCalledWith('characters')
  })

  it('fetchCharacters の実行中は loading が true になること', async () => {
    let resolvePromise: (value: any) => void
    const delayedPromise = new Promise((resolve) => {
      resolvePromise = resolve
    })

    const mockFrom = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          order: jest.fn().mockReturnValue(delayedPromise),
        }),
      }),
    })
    mockSupabase.from = mockFrom

    const { result } = renderHook(() => useCharacters())

    const fetchPromise = result.current.fetchCharacters()

    await waitFor(() => {
      expect(result.current.loading).toBe(true)
    })

    resolvePromise!({ data: [], error: null })
    await fetchPromise

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
  })

  it('fetchCharacters でエラーが発生した場合、error にエラーが設定されること', async () => {
    const mockError = new Error('データベースエラー')

    const mockFrom = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          order: jest.fn().mockResolvedValue({
            data: null,
            error: mockError,
          }),
        }),
      }),
    })
    mockSupabase.from = mockFrom

    const { result } = renderHook(() => useCharacters())

    await result.current.fetchCharacters()

    await waitFor(() => {
      expect(result.current.error).toBe(mockError)
      expect(result.current.characters).toEqual([])
      expect(result.current.loading).toBe(false)
    })
  })

  it('is_public が true のキャラクターのみ取得すること', async () => {
    const mockFrom = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          order: jest.fn().mockResolvedValue({
            data: [],
            error: null,
          }),
        }),
      }),
    })
    mockSupabase.from = mockFrom

    const { result } = renderHook(() => useCharacters())

    await result.current.fetchCharacters()

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    // from の戻り値の select().eq() が呼ばれていることを確認
    const selectMock = mockFrom().select
    const eqMock = selectMock().eq
    expect(eqMock).toHaveBeenCalledWith('is_public', true)
  })

  it('キャラクター一覧が created_at の降順でソートされること', async () => {
    const mockFrom = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          order: jest.fn().mockResolvedValue({
            data: [],
            error: null,
          }),
        }),
      }),
    })
    mockSupabase.from = mockFrom

    const { result } = renderHook(() => useCharacters())

    await result.current.fetchCharacters()

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    // order が created_at カラムの降順で呼ばれていることを確認
    const selectMock = mockFrom().select
    const eqMock = selectMock().eq
    const orderMock = eqMock().order
    expect(orderMock).toHaveBeenCalledWith('created_at', { ascending: false })
  })
})
