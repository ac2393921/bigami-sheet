/**
 * Header コンポーネント
 * アプリケーション全体のヘッダーを表示
 */

import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/router'

export const Header = () => {
  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleLogin = () => {
    router.push('/login')
  }

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('ログアウトに失敗しました:', error)
    }
  }

  return (
    <header className="bg-sumi text-kinari border-b border-nezumi">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">シノビガミ キャラクター管理</h1>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm">{user.email}</span>
              <Button onClick={handleLogout} variant="outline">
                ログアウト
              </Button>
            </>
          ) : (
            <Button onClick={handleLogin}>ログイン</Button>
          )}
        </div>
      </div>
    </header>
  )
}
