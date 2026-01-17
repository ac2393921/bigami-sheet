/**
 * AuthContext のテスト
 */

import { renderHook, waitFor, act } from '@testing-library/react'
import { ReactNode } from 'react'
import { AuthProvider, useAuthContext } from '../AuthContext'
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

describe('AuthContext', () => {
  const mockSupabase = supabase as jest.Mocked<typeof supabase>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('AuthProvider', () => {
    it('Provider が正しくレンダリングされること', () => {
      const wrapper = ({ children }: { children: ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      )

      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: null },
        error: null,
      })

      mockSupabase.auth.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: jest.fn() } },
      } as any)

      const { result } = renderHook(() => useAuthContext(), { wrapper })

      expect(result.current).toBeDefined()
    })

    it('初期化時にセッションを取得すること', async () => {
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

      const { result } = renderHook(() => useAuthContext(), { wrapper })

      await waitFor(() => {
        expect(result.current.user).toEqual(mockSession.user)
      })
    })

    it('認証状態の変化を監視すること', async () => {
      let authCallback: (event: string, session: any) => void = () => {}

      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: null },
        error: null,
      })

      mockSupabase.auth.onAuthStateChange.mockImplementation((callback) => {
        authCallback = callback
        return {
          data: { subscription: { unsubscribe: jest.fn() } },
        } as any
      })

      const wrapper = ({ children }: { children: ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      )

      const { result } = renderHook(() => useAuthContext(), { wrapper })

      // 初期状態では user は null
      await waitFor(() => {
        expect(result.current.user).toBeNull()
      })

      // 認証状態が変化したとき
      const mockUser = {
        id: 'new-user-id',
        email: 'new@example.com',
      }

      act(() => {
        authCallback('SIGNED_IN', { user: mockUser })
      })

      await waitFor(() => {
        expect(result.current.user).toEqual(mockUser)
      })
    })
  })

  describe('ログイン機能', () => {
    it('Google でログインできること', async () => {
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

      const { result } = renderHook(() => useAuthContext(), { wrapper })

      await result.current.signInWithProvider('google')

      expect(mockSupabase.auth.signInWithOAuth).toHaveBeenCalledWith({
        provider: 'google',
      })
    })

    it('Twitter でログインできること', async () => {
      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: null },
        error: null,
      })

      mockSupabase.auth.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: jest.fn() } },
      } as any)

      mockSupabase.auth.signInWithOAuth.mockResolvedValue({
        data: { provider: 'twitter', url: 'https://example.com/auth' },
        error: null,
      } as any)

      const wrapper = ({ children }: { children: ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      )

      const { result } = renderHook(() => useAuthContext(), { wrapper })

      await result.current.signInWithProvider('twitter')

      expect(mockSupabase.auth.signInWithOAuth).toHaveBeenCalledWith({
        provider: 'twitter',
      })
    })

    it('Discord でログインできること', async () => {
      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: null },
        error: null,
      })

      mockSupabase.auth.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: jest.fn() } },
      } as any)

      mockSupabase.auth.signInWithOAuth.mockResolvedValue({
        data: { provider: 'discord', url: 'https://example.com/auth' },
        error: null,
      } as any)

      const wrapper = ({ children }: { children: ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      )

      const { result } = renderHook(() => useAuthContext(), { wrapper })

      await result.current.signInWithProvider('discord')

      expect(mockSupabase.auth.signInWithOAuth).toHaveBeenCalledWith({
        provider: 'discord',
      })
    })

    it('ログインエラーをハンドリングできること', async () => {
      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: null },
        error: null,
      })

      mockSupabase.auth.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: jest.fn() } },
      } as any)

      const mockError = new Error('Login failed')
      mockSupabase.auth.signInWithOAuth.mockResolvedValue({
        data: { provider: null, url: null },
        error: mockError,
      } as any)

      const wrapper = ({ children }: { children: ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      )

      const { result } = renderHook(() => useAuthContext(), { wrapper })

      await expect(result.current.signInWithProvider('google')).rejects.toThrow(
        'Login failed'
      )
    })
  })

  describe('ログアウト機能', () => {
    it('ログアウトできること', async () => {
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

      mockSupabase.auth.signOut.mockResolvedValue({
        error: null,
      })

      const wrapper = ({ children }: { children: ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      )

      const { result } = renderHook(() => useAuthContext(), { wrapper })

      await waitFor(() => {
        expect(result.current.user).toEqual(mockSession.user)
      })

      await result.current.signOut()

      expect(mockSupabase.auth.signOut).toHaveBeenCalled()
    })

    it('ログアウトエラーをハンドリングできること', async () => {
      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: null },
        error: null,
      })

      mockSupabase.auth.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: jest.fn() } },
      } as any)

      const mockError = new Error('Logout failed')
      mockSupabase.auth.signOut.mockResolvedValue({
        error: mockError,
      })

      const wrapper = ({ children }: { children: ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      )

      const { result } = renderHook(() => useAuthContext(), { wrapper })

      await expect(result.current.signOut()).rejects.toThrow('Logout failed')
    })
  })

  describe('loading 状態', () => {
    it('初期化中は loading が true であること', () => {
      mockSupabase.auth.getSession.mockImplementation(
        () =>
          new Promise((resolve) => {
            setTimeout(
              () =>
                resolve({
                  data: { session: null },
                  error: null,
                }),
              100
            )
          })
      )

      mockSupabase.auth.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: jest.fn() } },
      } as any)

      const wrapper = ({ children }: { children: ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      )

      const { result } = renderHook(() => useAuthContext(), { wrapper })

      expect(result.current.loading).toBe(true)
    })

    it('初期化完了後は loading が false であること', async () => {
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

      const { result } = renderHook(() => useAuthContext(), { wrapper })

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
    })
  })
})
