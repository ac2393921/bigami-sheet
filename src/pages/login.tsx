/**
 * ログインページ
 */

import Head from 'next/head'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'

export default function LoginPage() {
  const { signInWithProvider } = useAuth()

  const handleGoogleLogin = async () => {
    try {
      await signInWithProvider('google')
    } catch (error) {
      console.error('Google login failed:', error)
    }
  }

  const handleTwitterLogin = async () => {
    try {
      await signInWithProvider('twitter')
    } catch (error) {
      console.error('Twitter login failed:', error)
    }
  }

  const handleDiscordLogin = async () => {
    try {
      await signInWithProvider('discord')
    } catch (error) {
      console.error('Discord login failed:', error)
    }
  }

  return (
    <>
      <Head>
        <title>ログイン - シノビガミ キャラクター管理</title>
        <meta
          name="description"
          content="シノビガミのキャラクターシート管理サイトにログイン"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen flex items-center justify-center p-8 bg-kinari">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-sumi">
              ログイン
            </h1>
            <CardDescription className="text-nezumi">
              ソーシャルアカウントでログインしてください
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full"
            >
              Google でログイン
            </Button>
            <Button
              onClick={handleTwitterLogin}
              variant="outline"
              className="w-full"
            >
              Twitter でログイン
            </Button>
            <Button
              onClick={handleDiscordLogin}
              variant="outline"
              className="w-full"
            >
              Discord でログイン
            </Button>
          </CardContent>
        </Card>
      </main>
    </>
  )
}
