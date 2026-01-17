/**
 * 認証状態管理コンテキスト
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

type AuthContextType = {
  user: User | null
  loading: boolean
  signInWithProvider: (
    provider: 'google' | 'twitter' | 'discord'
  ) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 初期セッションの取得
    const initializeAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Failed to get session:', error)
        } else {
          setUser(data.session?.user ?? null)
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // 認証状態の変化を監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signInWithProvider = async (
    provider: 'google' | 'twitter' | 'discord'
  ) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
    })

    if (error) {
      throw error
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithProvider,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }

  return context
}
