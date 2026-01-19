/**
 * CharacterListBoard コンポーネント
 * キャラクター一覧を表示する
 */

'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { useCharacters } from '@/hooks/useCharacters'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { SCHOOLS, RANKS, type School, type Rank } from '@/types'

export function CharacterListBoard() {
  const { characters, loading, error, fetchCharacters } = useCharacters()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedSchool, setSelectedSchool] = useState<School | ''>('')
  const [selectedRank, setSelectedRank] = useState<Rank | ''>('')

  useEffect(() => {
    fetchCharacters()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 検索キーワードとフィルタによるフィルタリング
  const filteredCharacters = useMemo(() => {
    return characters.filter((character) => {
      // 検索キーワードチェック
      if (searchKeyword) {
        const keyword = searchKeyword.toLowerCase()
        const matchesKeyword =
          character.name.toLowerCase().includes(keyword) ||
          character.player_name.toLowerCase().includes(keyword)
        if (!matchesKeyword) {
          return false
        }
      }

      // 流派フィルタチェック
      if (selectedSchool && character.school !== selectedSchool) {
        return false
      }

      // 階級フィルタチェック
      if (selectedRank && character.rank !== selectedRank) {
        return false
      }

      return true
    })
  }, [characters, searchKeyword, selectedSchool, selectedRank])

  if (loading) {
    return (
      <Card data-testid="character-list-board">
        <CardHeader>
          <CardTitle>キャラクター一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <p className="text-gray-500">読み込み中...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card data-testid="character-list-board">
        <CardHeader>
          <CardTitle>キャラクター一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <p className="text-red-500">
              エラーが発生しました: {error.message}
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card data-testid="character-list-board">
      <CardHeader>
        <CardTitle>キャラクター一覧</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* 検索・フィルタフィールド */}
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="シノビ名またはプレイヤー名で検索"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="max-w-sm"
            />
            <select
              aria-label="流派"
              value={selectedSchool}
              onChange={(e) =>
                setSelectedSchool(e.target.value as School | '')
              }
              className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-[180px]"
            >
              <option value="">すべての流派</option>
              {SCHOOLS.map((school) => (
                <option key={school} value={school}>
                  {school}
                </option>
              ))}
            </select>
            <select
              aria-label="階級"
              value={selectedRank}
              onChange={(e) => setSelectedRank(e.target.value as Rank | '')}
              className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-[180px]"
            >
              <option value="">すべての階級</option>
              {RANKS.map((rank) => (
                <option key={rank} value={rank}>
                  {rank}
                </option>
              ))}
            </select>
          </div>

          {/* テーブル表示 */}
          {filteredCharacters.length === 0 ? (
            <div className="flex justify-center py-8">
              <p className="text-gray-500">キャラクターが見つかりません</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>シノビ名</TableHead>
                  <TableHead>プレイヤー名</TableHead>
                  <TableHead>流派</TableHead>
                  <TableHead>階級</TableHead>
                  <TableHead>生命力</TableHead>
                  <TableHead>功績点</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCharacters.map((character) => (
                  <TableRow key={character.id}>
                    <TableCell>
                      <Link
                        href={`/characters/${character.id}`}
                        className="text-shu hover:underline"
                      >
                        {character.name}
                      </Link>
                    </TableCell>
                    <TableCell>{character.player_name}</TableCell>
                    <TableCell>{character.school}</TableCell>
                    <TableCell>{character.rank}</TableCell>
                    <TableCell>{character.life_points}</TableCell>
                    <TableCell>{character.achievement_points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
