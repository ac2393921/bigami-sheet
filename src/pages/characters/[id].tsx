/**
 * キャラクター詳細ページ
 */

import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CharacterDetailView } from '@/components/organisms/Detail/CharacterDetailView'
import { ReadOnlySkillTable } from '@/components/organisms/SkillTable/ReadOnlySkillTable'
import { useCharacters } from '@/hooks/useCharacters'
import { useAuthContext } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import type { Character, CharacterSkill } from '@/types'

export default function CharacterDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const { user } = useAuthContext()
  const { fetchCharacter, deleteCharacter } = useCharacters()

  const [character, setCharacter] = useState<Character | null>(null)
  const [skills, setSkills] = useState<CharacterSkill[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      if (!id || typeof id !== 'string') {
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

        // 特技データを取得
        const { data: skillsData, error: skillsError } = await supabase
          .from('character_skills')
          .select('*')
          .eq('character_id', id)

        if (skillsError) {
          console.error('特技データの取得に失敗しました:', skillsError)
        } else {
          setSkills((skillsData as CharacterSkill[]) || [])
        }
      } catch (err) {
        console.error('データの読み込みに失敗しました:', err)
        setError('データの読み込みに失敗しました')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [id, fetchCharacter])

  const handleEdit = () => {
    router.push(`/characters/${id}/edit`)
  }

  const handleDelete = async () => {
    if (!window.confirm('本当に削除しますか？')) {
      return
    }

    if (typeof id !== 'string') {
      return
    }

    const success = await deleteCharacter(id)

    if (success) {
      router.push('/')
    } else {
      setDeleteError('削除に失敗しました')
    }
  }

  // 所有者判定
  const isOwner = character?.user_id === user?.id

  if (loading) {
    return (
      <main className="min-h-screen p-8 bg-kinari">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-nezumi">読み込み中...</div>
        </div>
      </main>
    )
  }

  if (error || !character) {
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
        <title>{character.name} - シノビガミ キャラクター管理</title>
        <meta
          name="description"
          content={`${character.name}のキャラクターシート`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen p-8 bg-kinari">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold tracking-tight text-sumi mb-8">
            キャラクター詳細
          </h1>

          {/* 削除エラーメッセージ */}
          {deleteError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-destructive">
              {deleteError}
            </div>
          )}

          {/* キャラクター詳細情報 */}
          <div className="mb-8">
            <CharacterDetailView
              character={character}
              isOwner={isOwner}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

          {/* 特技表 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-sumi mb-4">特技</h2>
            <ReadOnlySkillTable skills={skills} />
          </div>
        </div>
      </main>
    </>
  )
}
