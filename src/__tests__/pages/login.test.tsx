/**
 * ログインページのテスト
 */

import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import LoginPage from '../login'
import { AuthProvider } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

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
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/login',
    query: {},
    asPath: '/login',
  }),
}))

describe('LoginPage', () => {
  const mockSupabase = supabase as jest.Mocked<typeof supabase>

  beforeEach(() => {
    jest.clearAllMocks()

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

  it('ページタイトルが表示されること', () => {
    render(<LoginPage />, { wrapper: Wrapper })

    expect(
      screen.getByRole('heading', { name: /ログイン/i })
    ).toBeInTheDocument()
  })

  it('Google ログインボタンが表示されること', () => {
    render(<LoginPage />, { wrapper: Wrapper })

    expect(
      screen.getByRole('button', { name: /Google でログイン/i })
    ).toBeInTheDocument()
  })

  it('Twitter ログインボタンが表示されること', () => {
    render(<LoginPage />, { wrapper: Wrapper })

    expect(
      screen.getByRole('button', { name: /Twitter でログイン/i })
    ).toBeInTheDocument()
  })

  it('Discord ログインボタンが表示されること', () => {
    render(<LoginPage />, { wrapper: Wrapper })

    expect(
      screen.getByRole('button', { name: /Discord でログイン/i })
    ).toBeInTheDocument()
  })

  it('説明文が表示されること', () => {
    render(<LoginPage />, { wrapper: Wrapper })

    expect(
      screen.getByText(/ソーシャルアカウントでログインしてください/i)
    ).toBeInTheDocument()
  })
})
