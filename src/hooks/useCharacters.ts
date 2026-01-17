/**
 * useCharacters フック
 * キャラクターの CRUD 操作を提供する
 */

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Character, CreateCharacterInput } from '@/types'

interface UseCharactersReturn {
  characters: Character[]
  loading: boolean
  error: Error | null
  fetchCharacters: () => Promise<void>
  fetchCharacter: (id: string) => Promise<Character | null>
  createCharacter: (input: CreateCharacterInput) => Promise<Character | null>
}

export function useCharacters(): UseCharactersReturn {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  /**
   * 公開されているキャラクター一覧を取得する
   */
  const fetchCharacters = async (): Promise<void> => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: fetchError } = await supabase
        .from('characters')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false })

      if (fetchError) {
        setError(fetchError as Error)
        setCharacters([])
      } else {
        setCharacters((data || []) as Character[])
      }
    } catch (err) {
      setError(err as Error)
      setCharacters([])
    } finally {
      setLoading(false)
    }
  }

  /**
   * 指定した ID のキャラクターを取得する
   */
  const fetchCharacter = async (id: string): Promise<Character | null> => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: fetchError } = await supabase
        .from('characters')
        .select('*')
        .eq('id', id)
        .single()

      if (fetchError) {
        setError(fetchError as Error)
        return null
      }

      return (data as Character) || null
    } catch (err) {
      setError(err as Error)
      return null
    } finally {
      setLoading(false)
    }
  }

  /**
   * 新しいキャラクターを作成する
   */
  const createCharacter = async (
    input: CreateCharacterInput
  ): Promise<Character | null> => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: insertError } = await supabase
        .from('characters')
        .insert(input)
        .select()
        .single()

      if (insertError) {
        setError(insertError as Error)
        return null
      }

      return (data as Character) || null
    } catch (err) {
      setError(err as Error)
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    characters,
    loading,
    error,
    fetchCharacters,
    fetchCharacter,
    createCharacter,
  }
}
