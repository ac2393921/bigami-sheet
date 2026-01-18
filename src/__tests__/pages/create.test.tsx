/**
 * キャラクター作成ページのテスト
 */

import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import CreatePage from '@/pages/create'
import { AuthProvider } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/router'
import * as useCharactersModule from '@/hooks/useCharacters'

// Supabase クライアントをモック
jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(),
      signInWithOAuth: jest.fn(),
      signOut: jest.fn(),
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
const mockCreateCharacter = jest.fn()
jest.mock('@/hooks/useCharacters', () => ({
  useCharacters: jest.fn(),
}))

describe('CreatePage', () => {
  const mockSupabase = supabase as jest.Mocked<typeof supabase>
  const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>
  const mockUseCharacters =
    useCharactersModule.useCharacters as jest.MockedFunction<
      typeof useCharactersModule.useCharacters
    >

  beforeEach(() => {
    jest.clearAllMocks()

    // useRouter のモックを設定
    mockUseRouter.mockReturnValue({
      push: mockPush,
      pathname: '/create',
      query: {},
      asPath: '/create',
    } as any)

    // useCharacters のモックを設定
    mockUseCharacters.mockReturnValue({
      characters: [],
      loading: false,
      error: null,
      fetchCharacters: jest.fn(),
      fetchCharacter: jest.fn(),
      createCharacter: mockCreateCharacter,
      updateCharacter: jest.fn(),
      deleteCharacter: jest.fn(),
    })

    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: null },
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
    it('ページタイトルが表示されること', () => {
      render(<CreatePage />, { wrapper: Wrapper })

      expect(
        screen.getByRole('heading', { name: /キャラクター作成/i })
      ).toBeInTheDocument()
    })

    it('CharacterForm が表示されること', () => {
      render(<CreatePage />, { wrapper: Wrapper })

      expect(screen.getByRole('form')).toBeInTheDocument()
    })

    it('シノビ名の入力フィールドが表示されること', () => {
      render(<CreatePage />, { wrapper: Wrapper })

      expect(screen.getByLabelText(/シノビ名/i)).toBeInTheDocument()
    })

    it('プレイヤー名の入力フィールドが表示されること', () => {
      render(<CreatePage />, { wrapper: Wrapper })

      expect(screen.getByLabelText(/プレイヤー名/i)).toBeInTheDocument()
    })

    it('流派の選択フィールドが表示されること', () => {
      render(<CreatePage />, { wrapper: Wrapper })

      expect(screen.getByLabelText(/流派/i)).toBeInTheDocument()
    })

    it('階級の選択フィールドが表示されること', () => {
      render(<CreatePage />, { wrapper: Wrapper })

      expect(screen.getByLabelText(/階級/i)).toBeInTheDocument()
    })

    it('保存ボタンが表示されること', () => {
      render(<CreatePage />, { wrapper: Wrapper })

      expect(screen.getByRole('button', { name: /保存/i })).toBeInTheDocument()
    })
  })
})
