/**
 * Header コンポーネントのテスト
 */

import { render, screen, fireEvent } from '@testing-library/react'
import { ReactNode } from 'react'
import { Header } from '../Header'
import { AuthProvider } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/router'

// Supabase クライアントをモック
jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(),
      signInWithOAuth: jest.fn(),
      signOut: jest.fn(),
    },
  },
}))

// Next.js の useRouter をモック
const mockPush = jest.fn()
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('Header', () => {
  const mockSupabase = supabase as jest.Mocked<typeof supabase>
  const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>

  beforeEach(() => {
    jest.clearAllMocks()

    mockUseRouter.mockReturnValue({
      push: mockPush,
      pathname: '/',
      query: {},
      asPath: '/',
    } as any)

    mockSupabase.auth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: jest.fn() } },
    } as any)
  })

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  )

  describe('ログインしていない場合', () => {
    beforeEach(() => {
      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: null },
        error: null,
      })
    })

    it('タイトルが表示されること', async () => {
      render(<Header />, { wrapper: Wrapper })

      // AuthContext の初期化を待つ
      await screen.findByText(/シノビガミ キャラクター管理/i)

      expect(
        screen.getByText(/シノビガミ キャラクター管理/i)
      ).toBeInTheDocument()
    })

    it('ログインボタンが表示されること', async () => {
      render(<Header />, { wrapper: Wrapper })

      await screen.findByRole('button', { name: /ログイン/i })

      expect(
        screen.getByRole('button', { name: /ログイン/i })
      ).toBeInTheDocument()
    })

    it('ログインボタンをクリックすると /login に遷移すること', async () => {
      render(<Header />, { wrapper: Wrapper })

      const loginButton = await screen.findByRole('button', {
        name: /ログイン/i,
      })
      fireEvent.click(loginButton)

      expect(mockPush).toHaveBeenCalledWith('/login')
    })

    it('ログアウトボタンは表示されないこと', async () => {
      render(<Header />, { wrapper: Wrapper })

      await screen.findByRole('button', { name: /ログイン/i })

      expect(
        screen.queryByRole('button', { name: /ログアウト/i })
      ).not.toBeInTheDocument()
    })
  })

  describe('ログインしている場合', () => {
    const mockUser = {
      id: 'test-user-id',
      email: 'test@example.com',
      aud: 'authenticated',
      created_at: '2024-01-01T00:00:00Z',
    }

    beforeEach(() => {
      mockSupabase.auth.getSession.mockResolvedValue({
        data: {
          session: {
            user: mockUser,
            access_token: 'mock-token',
            refresh_token: 'mock-refresh-token',
            expires_in: 3600,
            token_type: 'bearer',
            expires_at: Date.now() + 3600000,
          },
        },
        error: null,
      })
    })

    it('タイトルが表示されること', async () => {
      render(<Header />, { wrapper: Wrapper })

      await screen.findByText(/シノビガミ キャラクター管理/i)

      expect(
        screen.getByText(/シノビガミ キャラクター管理/i)
      ).toBeInTheDocument()
    })

    it('ユーザーのメールアドレスが表示されること', async () => {
      render(<Header />, { wrapper: Wrapper })

      await screen.findByText(/test@example\.com/i)

      expect(screen.getByText(/test@example\.com/i)).toBeInTheDocument()
    })

    it('ログアウトボタンが表示されること', async () => {
      render(<Header />, { wrapper: Wrapper })

      await screen.findByRole('button', { name: /ログアウト/i })

      expect(
        screen.getByRole('button', { name: /ログアウト/i })
      ).toBeInTheDocument()
    })

    it('ログアウトボタンをクリックするとログアウト処理が実行されること', async () => {
      mockSupabase.auth.signOut.mockResolvedValue({ error: null })

      render(<Header />, { wrapper: Wrapper })

      const logoutButton = await screen.findByRole('button', {
        name: /ログアウト/i,
      })
      fireEvent.click(logoutButton)

      expect(mockSupabase.auth.signOut).toHaveBeenCalled()
    })

    it('ログインボタンは表示されないこと', async () => {
      render(<Header />, { wrapper: Wrapper })

      await screen.findByRole('button', { name: /ログアウト/i })

      expect(
        screen.queryByRole('button', { name: /ログイン/i })
      ).not.toBeInTheDocument()
    })
  })
})
