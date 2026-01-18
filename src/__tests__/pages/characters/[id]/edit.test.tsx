/**
 * キャラクター編集ページのテスト
 */

import { render, screen, waitFor } from '@testing-library/react'
import { ReactNode } from 'react'
import CharacterEditPage from '@/pages/characters/[id]/edit'
import { AuthProvider } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/router'
import * as useCharactersModule from '@/hooks/useCharacters'
import type { Character, CharacterSkill } from '@/types'

// Supabase クライアントをモック
jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(),
    },
    from: jest.fn(),
  },
}))

// Next.js の useRouter をモック
const mockPush = jest.fn()
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

// useCharacters フックをモック
jest.mock('@/hooks/useCharacters', () => ({
  useCharacters: jest.fn(),
}))

describe('CharacterEditPage', () => {
  const mockSupabase = supabase as jest.Mocked<typeof supabase>
  const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>
  const mockUseCharacters =
    useCharactersModule.useCharacters as jest.MockedFunction<
      typeof useCharactersModule.useCharacters
    >

  const mockCharacter: Character = {
    id: 'char-1',
    user_id: 'user-1',
    name: 'テストシノビ',
    player_name: 'テストプレイヤー',
    school: '斜歯忍軍',
    rank: '中忍',
    age: 25,
    gender: '男',
    cover: 'サラリーマン',
    belief: '忠',
    life_points: 6,
    achievement_points: 10,
    is_public: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  }

  const mockSkills: CharacterSkill[] = [
    {
      id: 'skill-1',
      character_id: 'char-1',
      skill_category: '器術',
      skill_name: '絡繰術',
      is_acquired: true,
      is_gap: false,
    },
    {
      id: 'skill-2',
      character_id: 'char-1',
      skill_category: '体術',
      skill_name: '骨法術',
      is_acquired: false,
      is_gap: true,
    },
  ]

  const mockFetchCharacter = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    // useRouter のモックを設定
    mockUseRouter.mockReturnValue({
      push: mockPush,
      pathname: '/characters/[id]/edit',
      query: { id: 'char-1' },
      asPath: '/characters/char-1/edit',
    } as any)

    // useCharacters のモックを設定
    mockUseCharacters.mockReturnValue({
      characters: [],
      loading: false,
      error: null,
      fetchCharacters: jest.fn(),
      fetchCharacter: mockFetchCharacter,
      createCharacter: jest.fn(),
      updateCharacter: jest.fn(),
      deleteCharacter: jest.fn(),
    })

    mockSupabase.auth.getSession.mockResolvedValue({
      data: {
        session: {
          user: { id: 'user-1' },
        } as any,
      },
      error: null,
    })

    mockSupabase.auth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: jest.fn() } },
    } as any)
  })

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  )

  describe('基本レンダリング', () => {
    it('ページタイトルが表示されること', async () => {
      mockFetchCharacter.mockResolvedValue(mockCharacter)

      const mockFrom = jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            data: mockSkills,
            error: null,
          })),
        })),
      }))
      mockSupabase.from = mockFrom as any

      render(<CharacterEditPage />, { wrapper: Wrapper })

      await waitFor(() => {
        expect(
          screen.getByRole('heading', { name: /キャラクター編集/i })
        ).toBeInTheDocument()
      })
    })

    it('CharacterForm が表示されること', async () => {
      mockFetchCharacter.mockResolvedValue(mockCharacter)

      const mockFrom = jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            data: mockSkills,
            error: null,
          })),
        })),
      }))
      mockSupabase.from = mockFrom as any

      render(<CharacterEditPage />, { wrapper: Wrapper })

      await waitFor(() => {
        expect(screen.getByRole('form')).toBeInTheDocument()
      })
    })
  })

  describe('データプリロード', () => {
    it('既存データがフォームにプリロードされること', async () => {
      mockFetchCharacter.mockResolvedValue(mockCharacter)

      const mockFrom = jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            data: mockSkills,
            error: null,
          })),
        })),
      }))
      mockSupabase.from = mockFrom as any

      render(<CharacterEditPage />, { wrapper: Wrapper })

      await waitFor(() => {
        expect(screen.getByDisplayValue('テストシノビ')).toBeInTheDocument()
        expect(screen.getByDisplayValue('テストプレイヤー')).toBeInTheDocument()
      })
    })

    it('特技データがSkillTableにプリロードされること', async () => {
      mockFetchCharacter.mockResolvedValue(mockCharacter)

      const mockFrom = jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            data: mockSkills,
            error: null,
          })),
        })),
      }))
      mockSupabase.from = mockFrom as any

      render(<CharacterEditPage />, { wrapper: Wrapper })

      await waitFor(() => {
        expect(screen.getByText('絡繰術')).toBeInTheDocument()
        expect(screen.getByText('骨法術')).toBeInTheDocument()
      })
    })

    it('キャラクターデータが正しく取得される', async () => {
      mockFetchCharacter.mockResolvedValue(mockCharacter)

      const mockFrom = jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            data: mockSkills,
            error: null,
          })),
        })),
      }))
      mockSupabase.from = mockFrom as any

      render(<CharacterEditPage />, { wrapper: Wrapper })

      await waitFor(() => {
        expect(mockFetchCharacter).toHaveBeenCalledWith('char-1')
      })
    })

    it('特技データが正しく取得される', async () => {
      mockFetchCharacter.mockResolvedValue(mockCharacter)

      const mockEq = jest.fn(() => ({
        data: mockSkills,
        error: null,
      }))

      const mockSelect = jest.fn(() => ({
        eq: mockEq,
      }))

      const mockFrom = jest.fn(() => ({
        select: mockSelect,
      }))

      mockSupabase.from = mockFrom as any

      render(<CharacterEditPage />, { wrapper: Wrapper })

      await waitFor(() => {
        expect(mockFrom).toHaveBeenCalledWith('character_skills')
        expect(mockSelect).toHaveBeenCalledWith('*')
        expect(mockEq).toHaveBeenCalledWith('character_id', 'char-1')
      })
    })
  })

  describe('所有者チェック', () => {
    it('非所有者は詳細ページへリダイレクトされる', async () => {
      mockFetchCharacter.mockResolvedValue(mockCharacter)

      mockSupabase.auth.getSession.mockResolvedValue({
        data: {
          session: {
            user: { id: 'user-2' }, // mockCharacter.user_id と不一致
          } as any,
        },
        error: null,
      })

      const mockFrom = jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            data: mockSkills,
            error: null,
          })),
        })),
      }))
      mockSupabase.from = mockFrom as any

      render(<CharacterEditPage />, { wrapper: Wrapper })

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/characters/char-1')
      })
    })

    it('所有者は編集ページを表示できる', async () => {
      mockFetchCharacter.mockResolvedValue(mockCharacter)

      mockSupabase.auth.getSession.mockResolvedValue({
        data: {
          session: {
            user: { id: 'user-1' }, // mockCharacter.user_id と一致
          } as any,
        },
        error: null,
      })

      const mockFrom = jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            data: mockSkills,
            error: null,
          })),
        })),
      }))
      mockSupabase.from = mockFrom as any

      render(<CharacterEditPage />, { wrapper: Wrapper })

      await waitFor(() => {
        expect(screen.getByRole('form')).toBeInTheDocument()
      })

      expect(mockPush).not.toHaveBeenCalledWith('/characters/char-1')
    })
  })

  describe('エラー処理', () => {
    it('キャラクターが見つからない場合、エラーメッセージが表示される', async () => {
      mockFetchCharacter.mockResolvedValue(null)

      render(<CharacterEditPage />, { wrapper: Wrapper })

      await waitFor(() => {
        expect(
          screen.getByText(/キャラクターが見つかりません/i)
        ).toBeInTheDocument()
      })
    })
  })
})
