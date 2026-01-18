/**
 * キャラクター編集ページ
 */

import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CharacterForm } from '@/components/organisms/Form/CharacterForm'
import { useCharacters } from '@/hooks/useCharacters'
import { useAuthContext } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import type {
  Character,
  CharacterSkill,
  CreateCharacterWithSkillsInput,
} from '@/types'

export default function CharacterEditPage() {
  const router = useRouter()
  const { id } = router.query
  const { user, loading: authLoading } = useAuthContext()
  const { fetchCharacter } = useCharacters()

  const [character, setCharacter] = useState<Character | null>(null)
  const [initialData, setInitialData] =
    useState<Partial<CreateCharacterWithSkillsInput> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      if (!id || typeof id !== 'string') {
        return
      }

      // 認証情報がまだ読み込まれていない場合は待機
      if (authLoading) {
        return
      }

      setLoading(true)
      setError(null)

      try {
        // キャラクターデータを取得
        const fetchedCharacter = await fetchCharacter(id)

        if (!fetchedCharacter) {
          setError('キャラクターが見つかりません')
          setLoading(false)
          return
        }

        setCharacter(fetchedCharacter)

        // 所有者チェック
        if (fetchedCharacter.user_id !== user?.id) {
          router.push(`/characters/${id}`)
          return
        }

        // 特技データを取得
        const { data: skillsData, error: skillsError } = await supabase
          .from('character_skills')
          .select('*')
          .eq('character_id', id)

        if (skillsError) {
          console.error('特技データの取得に失敗しました:', skillsError)
        }

        const skills = (skillsData as CharacterSkill[]) || []

        // CharacterFormに渡すinitialDataを作成
        setInitialData({
          name: fetchedCharacter.name,
          player_name: fetchedCharacter.player_name,
          school: fetchedCharacter.school,
          rank: fetchedCharacter.rank,
          age: fetchedCharacter.age,
          gender: fetchedCharacter.gender,
          cover: fetchedCharacter.cover,
          belief: fetchedCharacter.belief,
          life_points: fetchedCharacter.life_points,
          achievement_points: fetchedCharacter.achievement_points,
          is_public: fetchedCharacter.is_public,
          skills,
        })
      } catch (err) {
        console.error('データの読み込みに失敗しました:', err)
        setError('データの読み込みに失敗しました')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [id, fetchCharacter, user, router, authLoading])

  const handleSubmit = async (data: CreateCharacterWithSkillsInput) => {
    // TODO: 更新機能は次のサイクルで実装
  }

  if (loading) {
    return (
      <main className="min-h-screen p-8 bg-kinari">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-nezumi">読み込み中...</div>
        </div>
      </main>
    )
  }

  if (error || !character || !initialData) {
    return (
      <main className="min-h-screen p-8 bg-kinari">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-destructive">
            {error || 'キャラクターが見つかりません'}
          </div>
        </div>
      </main>
    )
  }

  return (
    <>
      <Head>
        <title>{character.name}の編集 - シノビガミ キャラクター管理</title>
        <meta
          name="description"
          content={`${character.name}のキャラクターシートを編集`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen p-8 bg-kinari">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold tracking-tight text-sumi mb-8">
            キャラクター編集
          </h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <CharacterForm onSubmit={handleSubmit} initialData={initialData} />
          </div>
        </div>
      </main>
    </>
  )
}
