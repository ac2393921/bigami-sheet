/**
 * Supabase クライアント
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// デフォルト値（環境変数が未設定の場合）
const defaultUrl = 'https://placeholder.supabase.co'
const defaultKey = 'placeholder-anon-key'

// 環境変数の存在確認
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase 環境変数が設定されていません。.env.local ファイルを確認してください。'
  )
}

// Supabase クライアントの初期化
export const supabase = createClient(
  supabaseUrl || defaultUrl,
  supabaseAnonKey || defaultKey
)
