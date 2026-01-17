/**
 * Supabase クライアントのテスト
 */

describe('Supabase Client', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  describe('環境変数が設定されている場合', () => {
    beforeEach(() => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key'
    })

    it('supabase クライアントがエクスポートされること', async () => {
      const { supabase } = await import('../supabase')
      expect(supabase).toBeDefined()
    })

    it('supabase クライアントが正しく初期化されること', async () => {
      const { supabase } = await import('../supabase')
      expect(supabase.auth).toBeDefined()
      expect(supabase.from).toBeDefined()
    })
  })

  describe('環境変数が設定されていない場合', () => {
    beforeEach(() => {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL
      delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    })

    it('エラーがコンソールに警告されること', async () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation()

      await import('../supabase')

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Supabase 環境変数が設定されていません')
      )

      consoleWarnSpy.mockRestore()
    })
  })
})
