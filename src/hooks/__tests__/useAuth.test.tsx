/**
 * useAuth フックのテスト
 */

import { renderHook } from '@testing-library/react'
import { ReactNode } from 'react'
import { useAuth } from '../useAuth'
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

describe('useAuth', () => {
  const mockSupabase = supabase as jest.Mocked<typeof supabase>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('AuthProvider の外で使用した場合エラーをスローすること', () => {
    // エラーメッセージを抑制
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

    expect(() => {
      renderHook(() => useAuth())
    }).toThrow('useAuthContext must be used within an AuthProvider')

    consoleErrorSpy.mockRestore()
  })

  it('AuthProvider 内で使用した場合、認証コンテキストを返すこと', () => {
    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: null },
      error: null,
    })

    mockSupabase.auth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: jest.fn() } },
    } as any)

    const wrapper = ({ children }: { children: ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    )

    const { result } = renderHook(() => useAuth(), { wrapper })

    expect(result.current).toBeDefined()
    expect(result.current.user).toBeDefined()
    expect(result.current.loading).toBeDefined()
    expect(result.current.signInWithProvider).toBeDefined()
    expect(result.current.signOut).toBeDefined()
  })

  it('user プロパティにアクセスできること', () => {
    const mockSession = {
      user: {
        id: 'test-user-id',
        email: 'test@example.com',
      },
    }

    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: mockSession },
      error: null,
    } as any)

    mockSupabase.auth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: jest.fn() } },
    } as any)

    const wrapper = ({ children }: { children: ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    )

    const { result } = renderHook(() => useAuth(), { wrapper })

    // user は非同期で設定されるため、初期値は null の可能性がある
    expect(result.current.user !== undefined).toBe(true)
  })

  it('loading プロパティにアクセスできること', () => {
    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: null },
      error: null,
    })

    mockSupabase.auth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: jest.fn() } },
    } as any)

    const wrapper = ({ children }: { children: ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    )

    const { result } = renderHook(() => useAuth(), { wrapper })

    expect(typeof result.current.loading).toBe('boolean')
  })

  it('signInWithProvider メソッドを呼び出せること', async () => {
    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: null },
      error: null,
    })

    mockSupabase.auth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: jest.fn() } },
    } as any)

    mockSupabase.auth.signInWithOAuth.mockResolvedValue({
      data: { provider: 'google', url: 'https://example.com/auth' },
      error: null,
    } as any)

    const wrapper = ({ children }: { children: ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    )

    const { result } = renderHook(() => useAuth(), { wrapper })

    await result.current.signInWithProvider('google')

    expect(mockSupabase.auth.signInWithOAuth).toHaveBeenCalledWith({
      provider: 'google',
    })
  })

  it('signOut メソッドを呼び出せること', async () => {
    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: null },
      error: null,
    })

    mockSupabase.auth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: jest.fn() } },
    } as any)

    mockSupabase.auth.signOut.mockResolvedValue({
      error: null,
    })

    const wrapper = ({ children }: { children: ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    )

    const { result } = renderHook(() => useAuth(), { wrapper })

    await result.current.signOut()

    expect(mockSupabase.auth.signOut).toHaveBeenCalled()
  })
})
