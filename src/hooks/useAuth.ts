/**
 * useAuth フック
 * AuthContext を使いやすくラップする
 */

import { useAuthContext } from '@/contexts/AuthContext'

export function useAuth() {
  return useAuthContext()
}
