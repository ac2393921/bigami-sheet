/**
 * CharacterListBoard コンポーネントのテスト
 */

import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { CharacterListBoard } from '../CharacterListBoard'

// useCharacters フックをモック
jest.mock('@/hooks/useCharacters', () => ({
  useCharacters: jest.fn(),
}))

const { useCharacters } = require('@/hooks/useCharacters')

describe('CharacterListBoard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('基本レンダリング', () => {
    it('コンポーネントが正しくレンダリングされること', () => {
      useCharacters.mockReturnValue({
        characters: [],
        loading: false,
        error: null,
        fetchCharacters: jest.fn(),
      })

      render(<CharacterListBoard />)
      expect(screen.getByTestId('character-list-board')).toBeInTheDocument()
    })

    it('ローディング中にローディング表示が出ること', () => {
      useCharacters.mockReturnValue({
        characters: [],
        loading: true,
        error: null,
        fetchCharacters: jest.fn(),
      })

      render(<CharacterListBoard />)
      expect(screen.getByText(/読み込み中/i)).toBeInTheDocument()
    })

    it('エラー発生時にエラーメッセージが表示されること', () => {
      useCharacters.mockReturnValue({
        characters: [],
        loading: false,
        error: new Error('テストエラー'),
        fetchCharacters: jest.fn(),
      })

      render(<CharacterListBoard />)
      expect(screen.getByText(/エラー/i)).toBeInTheDocument()
    })
  })

  describe('Supabase 連携', () => {
    it('マウント時に fetchCharacters が呼ばれること', () => {
      const mockFetchCharacters = jest.fn()
      useCharacters.mockReturnValue({
        characters: [],
        loading: false,
        error: null,
        fetchCharacters: mockFetchCharacters,
      })

      render(<CharacterListBoard />)
      expect(mockFetchCharacters).toHaveBeenCalledTimes(1)
    })

    it('取得したキャラクターが表示されること', async () => {
      const mockCharacters = [
        {
          id: 'test-id-1',
          user_id: 'user-id-1',
          name: 'テストシノビ1',
          player_name: 'プレイヤー1',
          school: '斜歯忍軍',
          rank: '中忍',
          life_points: 6,
          achievement_points: 0,
          is_public: true,
          created_at: new Date('2024-01-01'),
          updated_at: new Date('2024-01-01'),
        },
        {
          id: 'test-id-2',
          user_id: 'user-id-2',
          name: 'テストシノビ2',
          player_name: 'プレイヤー2',
          school: '鞍馬神流',
          rank: '上忍',
          life_points: 6,
          achievement_points: 5,
          is_public: true,
          created_at: new Date('2024-01-02'),
          updated_at: new Date('2024-01-02'),
        },
      ]

      useCharacters.mockReturnValue({
        characters: mockCharacters,
        loading: false,
        error: null,
        fetchCharacters: jest.fn(),
      })

      render(<CharacterListBoard />)

      await waitFor(() => {
        expect(screen.getByText('テストシノビ1')).toBeInTheDocument()
        expect(screen.getByText('テストシノビ2')).toBeInTheDocument()
        expect(screen.getByText('プレイヤー1')).toBeInTheDocument()
        expect(screen.getByText('プレイヤー2')).toBeInTheDocument()
        // 流派と階級は複数の場所に表示されるため、getAllByTextで確認
        expect(screen.getAllByText('斜歯忍軍').length).toBeGreaterThan(0)
        expect(screen.getAllByText('鞍馬神流').length).toBeGreaterThan(0)
      })
    })

    it('公開キャラクターのみ表示されること', () => {
      const mockCharacters = [
        {
          id: 'test-id-1',
          user_id: 'user-id-1',
          name: 'テストシノビ1',
          player_name: 'プレイヤー1',
          school: '斜歯忍軍',
          rank: '中忍',
          life_points: 6,
          achievement_points: 0,
          is_public: true,
          created_at: new Date('2024-01-01'),
          updated_at: new Date('2024-01-01'),
        },
      ]

      useCharacters.mockReturnValue({
        characters: mockCharacters,
        loading: false,
        error: null,
        fetchCharacters: jest.fn(),
      })

      render(<CharacterListBoard />)

      // is_public=true のキャラクターのみ表示される
      expect(screen.getByText('テストシノビ1')).toBeInTheDocument()
    })

    it('キャラクターが0件の場合にメッセージが表示されること', () => {
      useCharacters.mockReturnValue({
        characters: [],
        loading: false,
        error: null,
        fetchCharacters: jest.fn(),
      })

      render(<CharacterListBoard />)
      expect(
        screen.getByText(/キャラクターが見つかりません/i)
      ).toBeInTheDocument()
    })
  })

  describe('検索機能', () => {
    const mockCharacters = [
      {
        id: 'test-id-1',
        user_id: 'user-id-1',
        name: 'テストシノビ1',
        player_name: 'プレイヤー1',
        school: '斜歯忍軍',
        rank: '中忍',
        life_points: 6,
        achievement_points: 0,
        is_public: true,
        created_at: new Date('2024-01-01'),
        updated_at: new Date('2024-01-01'),
      },
      {
        id: 'test-id-2',
        user_id: 'user-id-2',
        name: 'テストシノビ2',
        player_name: 'プレイヤー2',
        school: '鞍馬神流',
        rank: '上忍',
        life_points: 6,
        achievement_points: 5,
        is_public: true,
        created_at: new Date('2024-01-02'),
        updated_at: new Date('2024-01-02'),
      },
      {
        id: 'test-id-3',
        user_id: 'user-id-3',
        name: '忍者太郎',
        player_name: 'タロウ',
        school: 'ハグレモノ',
        rank: '中忍頭',
        life_points: 6,
        achievement_points: 3,
        is_public: true,
        created_at: new Date('2024-01-03'),
        updated_at: new Date('2024-01-03'),
      },
    ]

    it('検索フィールドが表示されること', () => {
      useCharacters.mockReturnValue({
        characters: mockCharacters,
        loading: false,
        error: null,
        fetchCharacters: jest.fn(),
      })

      render(<CharacterListBoard />)
      expect(
        screen.getByPlaceholderText(/シノビ名またはプレイヤー名で検索/i)
      ).toBeInTheDocument()
    })

    it('シノビ名で検索できること', () => {
      useCharacters.mockReturnValue({
        characters: mockCharacters,
        loading: false,
        error: null,
        fetchCharacters: jest.fn(),
      })

      render(<CharacterListBoard />)
      const searchInput = screen.getByPlaceholderText(
        /シノビ名またはプレイヤー名で検索/i
      )

      fireEvent.change(searchInput, { target: { value: 'テストシノビ1' } })

      // テストシノビ1 のみ表示される
      expect(screen.getByText('テストシノビ1')).toBeInTheDocument()
      expect(screen.queryByText('テストシノビ2')).not.toBeInTheDocument()
      expect(screen.queryByText('忍者太郎')).not.toBeInTheDocument()
    })

    it('プレイヤー名で検索できること', () => {
      useCharacters.mockReturnValue({
        characters: mockCharacters,
        loading: false,
        error: null,
        fetchCharacters: jest.fn(),
      })

      render(<CharacterListBoard />)
      const searchInput = screen.getByPlaceholderText(
        /シノビ名またはプレイヤー名で検索/i
      )

      fireEvent.change(searchInput, { target: { value: 'プレイヤー2' } })

      // プレイヤー2 のキャラクターのみ表示される
      expect(screen.getByText('テストシノビ2')).toBeInTheDocument()
      expect(screen.queryByText('テストシノビ1')).not.toBeInTheDocument()
      expect(screen.queryByText('忍者太郎')).not.toBeInTheDocument()
    })

    it('部分一致で検索できること', () => {
      useCharacters.mockReturnValue({
        characters: mockCharacters,
        loading: false,
        error: null,
        fetchCharacters: jest.fn(),
      })

      render(<CharacterListBoard />)
      const searchInput = screen.getByPlaceholderText(
        /シノビ名またはプレイヤー名で検索/i
      )

      fireEvent.change(searchInput, { target: { value: 'テスト' } })

      // 'テスト' を含むキャラクターのみ表示される
      expect(screen.getByText('テストシノビ1')).toBeInTheDocument()
      expect(screen.getByText('テストシノビ2')).toBeInTheDocument()
      expect(screen.queryByText('忍者太郎')).not.toBeInTheDocument()
    })

    it('検索結果が0件の場合にメッセージが表示されること', () => {
      useCharacters.mockReturnValue({
        characters: mockCharacters,
        loading: false,
        error: null,
        fetchCharacters: jest.fn(),
      })

      render(<CharacterListBoard />)
      const searchInput = screen.getByPlaceholderText(
        /シノビ名またはプレイヤー名で検索/i
      )

      fireEvent.change(searchInput, { target: { value: '存在しないキャラ' } })

      expect(
        screen.getByText(/キャラクターが見つかりません/i)
      ).toBeInTheDocument()
    })

    it('検索キーワードをクリアすると全件表示されること', () => {
      useCharacters.mockReturnValue({
        characters: mockCharacters,
        loading: false,
        error: null,
        fetchCharacters: jest.fn(),
      })

      render(<CharacterListBoard />)
      const searchInput = screen.getByPlaceholderText(
        /シノビ名またはプレイヤー名で検索/i
      )

      // 検索
      fireEvent.change(searchInput, { target: { value: 'テスト' } })
      expect(screen.queryByText('忍者太郎')).not.toBeInTheDocument()

      // クリア
      fireEvent.change(searchInput, { target: { value: '' } })
      expect(screen.getByText('忍者太郎')).toBeInTheDocument()
      expect(screen.getByText('テストシノビ1')).toBeInTheDocument()
      expect(screen.getByText('テストシノビ2')).toBeInTheDocument()
    })
  })

  describe('フィルタ機能', () => {
    const mockCharacters = [
      {
        id: 'test-id-1',
        user_id: 'user-id-1',
        name: 'テストシノビ1',
        player_name: 'プレイヤー1',
        school: '斜歯忍軍',
        rank: '中忍',
        life_points: 6,
        achievement_points: 0,
        is_public: true,
        created_at: new Date('2024-01-01'),
        updated_at: new Date('2024-01-01'),
      },
      {
        id: 'test-id-2',
        user_id: 'user-id-2',
        name: 'テストシノビ2',
        player_name: 'プレイヤー2',
        school: '鞍馬神流',
        rank: '上忍',
        life_points: 6,
        achievement_points: 5,
        is_public: true,
        created_at: new Date('2024-01-02'),
        updated_at: new Date('2024-01-02'),
      },
      {
        id: 'test-id-3',
        user_id: 'user-id-3',
        name: '忍者太郎',
        player_name: 'タロウ',
        school: '斜歯忍軍',
        rank: '中忍頭',
        life_points: 6,
        achievement_points: 3,
        is_public: true,
        created_at: new Date('2024-01-03'),
        updated_at: new Date('2024-01-03'),
      },
      {
        id: 'test-id-4',
        user_id: 'user-id-4',
        name: 'くノ一花子',
        player_name: 'ハナコ',
        school: 'ハグレモノ',
        rank: '上忍',
        life_points: 6,
        achievement_points: 10,
        is_public: true,
        created_at: new Date('2024-01-04'),
        updated_at: new Date('2024-01-04'),
      },
    ]

    it('流派フィルタが表示されること', () => {
      useCharacters.mockReturnValue({
        characters: mockCharacters,
        loading: false,
        error: null,
        fetchCharacters: jest.fn(),
      })

      render(<CharacterListBoard />)
      expect(screen.getByRole('combobox', { name: /流派/i })).toBeInTheDocument()
    })

    it('階級フィルタが表示されること', () => {
      useCharacters.mockReturnValue({
        characters: mockCharacters,
        loading: false,
        error: null,
        fetchCharacters: jest.fn(),
      })

      render(<CharacterListBoard />)
      expect(screen.getByRole('combobox', { name: /階級/i })).toBeInTheDocument()
    })

    it('流派でフィルタできること', () => {
      useCharacters.mockReturnValue({
        characters: mockCharacters,
        loading: false,
        error: null,
        fetchCharacters: jest.fn(),
      })

      render(<CharacterListBoard />)
      const schoolFilter = screen.getByRole('combobox', { name: /流派/i })

      fireEvent.change(schoolFilter, { target: { value: '斜歯忍軍' } })

      // 斜歯忍軍のキャラクターのみ表示される
      expect(screen.getByText('テストシノビ1')).toBeInTheDocument()
      expect(screen.getByText('忍者太郎')).toBeInTheDocument()
      expect(screen.queryByText('テストシノビ2')).not.toBeInTheDocument()
      expect(screen.queryByText('くノ一花子')).not.toBeInTheDocument()
    })

    it('階級でフィルタできること', () => {
      useCharacters.mockReturnValue({
        characters: mockCharacters,
        loading: false,
        error: null,
        fetchCharacters: jest.fn(),
      })

      render(<CharacterListBoard />)
      const rankFilter = screen.getByRole('combobox', { name: /階級/i })

      fireEvent.change(rankFilter, { target: { value: '上忍' } })

      // 上忍のキャラクターのみ表示される
      expect(screen.getByText('テストシノビ2')).toBeInTheDocument()
      expect(screen.getByText('くノ一花子')).toBeInTheDocument()
      expect(screen.queryByText('テストシノビ1')).not.toBeInTheDocument()
      expect(screen.queryByText('忍者太郎')).not.toBeInTheDocument()
    })

    it('流派と階級の両方でフィルタできること', () => {
      useCharacters.mockReturnValue({
        characters: mockCharacters,
        loading: false,
        error: null,
        fetchCharacters: jest.fn(),
      })

      render(<CharacterListBoard />)
      const schoolFilter = screen.getByRole('combobox', { name: /流派/i })
      const rankFilter = screen.getByRole('combobox', { name: /階級/i })

      fireEvent.change(schoolFilter, { target: { value: '斜歯忍軍' } })
      fireEvent.change(rankFilter, { target: { value: '中忍' } })

      // 斜歯忍軍 かつ 中忍のキャラクターのみ表示される
      expect(screen.getByText('テストシノビ1')).toBeInTheDocument()
      expect(screen.queryByText('テストシノビ2')).not.toBeInTheDocument()
      expect(screen.queryByText('忍者太郎')).not.toBeInTheDocument()
      expect(screen.queryByText('くノ一花子')).not.toBeInTheDocument()
    })

    it('検索とフィルタを併用できること', () => {
      useCharacters.mockReturnValue({
        characters: mockCharacters,
        loading: false,
        error: null,
        fetchCharacters: jest.fn(),
      })

      render(<CharacterListBoard />)
      const searchInput = screen.getByPlaceholderText(
        /シノビ名またはプレイヤー名で検索/i
      )
      const schoolFilter = screen.getByRole('combobox', { name: /流派/i })

      fireEvent.change(searchInput, { target: { value: 'テスト' } })
      fireEvent.change(schoolFilter, { target: { value: '斜歯忍軍' } })

      // '斜歯忍軍' かつ 'テスト' を含むキャラクターのみ表示される
      expect(screen.getByText('テストシノビ1')).toBeInTheDocument()
      expect(screen.queryByText('テストシノビ2')).not.toBeInTheDocument()
      expect(screen.queryByText('忍者太郎')).not.toBeInTheDocument()
    })

    it('フィルタをクリアすると全件表示されること', () => {
      useCharacters.mockReturnValue({
        characters: mockCharacters,
        loading: false,
        error: null,
        fetchCharacters: jest.fn(),
      })

      render(<CharacterListBoard />)
      const schoolFilter = screen.getByRole('combobox', { name: /流派/i })

      // フィルタ適用
      fireEvent.change(schoolFilter, { target: { value: '斜歯忍軍' } })
      expect(screen.queryByText('テストシノビ2')).not.toBeInTheDocument()

      // フィルタクリア
      fireEvent.change(schoolFilter, { target: { value: '' } })
      expect(screen.getByText('テストシノビ1')).toBeInTheDocument()
      expect(screen.getByText('テストシノビ2')).toBeInTheDocument()
      expect(screen.getByText('忍者太郎')).toBeInTheDocument()
      expect(screen.getByText('くノ一花子')).toBeInTheDocument()
    })
  })
})
