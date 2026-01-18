/**
 * キャラクター作成ページ
 */

import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { CharacterForm } from '@/components/organisms/Form/CharacterForm'
import { useCharacters } from '@/hooks/useCharacters'
import { supabase } from '@/lib/supabase'
import type { CreateCharacterWithSkillsInput } from '@/types'

export default function CreatePage() {
  const router = useRouter()
  const { createCharacter } = useCharacters()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: CreateCharacterWithSkillsInput) => {
    setIsSubmitting(true)

    try {
      // 特技データを分離
      const { skills, ...characterData } = data

      // キャラクター本体を作成
      const newCharacter = await createCharacter(characterData)

      if (!newCharacter) {
        throw new Error('キャラクターの作成に失敗しました')
      }

      // 特技データがある場合は保存
      if (skills && skills.length > 0) {
        const skillsToInsert = skills.map((skill) => ({
          character_id: newCharacter.id,
          skill_category: skill.skill_category,
          skill_name: skill.skill_name,
          is_acquired: skill.is_acquired,
          is_gap: skill.is_gap,
        }))

        const { error: skillsError } = await supabase
          .from('character_skills')
          .insert(skillsToInsert)

        if (skillsError) {
          console.error('特技データの保存に失敗しました:', skillsError)
          // 特技の保存に失敗してもキャラクターは作成されているので、詳細ページへ遷移
        }
      }

      // キャラクター詳細ページにリダイレクト
      router.push(`/characters/${newCharacter.id}`)
    } catch (error) {
      console.error('キャラクター作成エラー:', error)
      // TODO: エラーメッセージを表示
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>キャラクター作成 - シノビガミ キャラクター管理</title>
        <meta
          name="description"
          content="シノビガミのキャラクターシートを作成"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen p-8 bg-kinari">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold tracking-tight text-sumi mb-8">
            キャラクター作成
          </h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <CharacterForm onSubmit={handleSubmit} />
          </div>
          {isSubmitting && (
            <div className="mt-4 text-center text-nezumi">保存中...</div>
          )}
        </div>
      </main>
    </>
  )
}
