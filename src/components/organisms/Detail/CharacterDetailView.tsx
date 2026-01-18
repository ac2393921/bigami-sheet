/**
 * CharacterDetailView コンポーネント
 * キャラクター詳細情報を表示する
 */

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Character } from '@/types'

interface CharacterDetailViewProps {
  character: Character
  isOwner: boolean
  onEdit: () => void
  onDelete: () => void
}

export function CharacterDetailView({
  character,
  isOwner,
  onEdit,
  onDelete,
}: CharacterDetailViewProps) {
  return (
    <div className="space-y-6">
      {/* 基本情報カード */}
      <Card className="bg-white shadow-md">
        <CardHeader className="border-b border-kinari">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl text-sumi">
              {character.name}
            </CardTitle>
            {isOwner && (
              <div className="flex gap-2">
                <Button variant="outline" onClick={onEdit}>
                  編集
                </Button>
                <Button variant="destructive" onClick={onDelete}>
                  削除
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* プレイヤー名 */}
            <div>
              <div className="text-sm font-medium text-nezumi mb-1">
                プレイヤー名
              </div>
              <div className="text-sumi">{character.player_name}</div>
            </div>

            {/* 流派 */}
            <div>
              <div className="text-sm font-medium text-nezumi mb-1">流派</div>
              <div className="text-sumi">{character.school}</div>
            </div>

            {/* 階級 */}
            <div>
              <div className="text-sm font-medium text-nezumi mb-1">階級</div>
              <div className="text-sumi">{character.rank}</div>
            </div>

            {/* 年齢 */}
            {character.age !== undefined && (
              <div>
                <div className="text-sm font-medium text-nezumi mb-1">年齢</div>
                <div className="text-sumi">{character.age}</div>
              </div>
            )}

            {/* 性別 */}
            {character.gender && (
              <div>
                <div className="text-sm font-medium text-nezumi mb-1">性別</div>
                <div className="text-sumi">{character.gender}</div>
              </div>
            )}

            {/* カバー */}
            {character.cover && (
              <div>
                <div className="text-sm font-medium text-nezumi mb-1">
                  カバー
                </div>
                <div className="text-sumi">{character.cover}</div>
              </div>
            )}

            {/* 信念 */}
            {character.belief && (
              <div>
                <div className="text-sm font-medium text-nezumi mb-1">信念</div>
                <div className="text-sumi">{character.belief}</div>
              </div>
            )}

            {/* 生命力 */}
            <div>
              <div className="text-sm font-medium text-nezumi mb-1">生命力</div>
              <div className="text-sumi">{character.life_points}</div>
            </div>

            {/* 功績点 */}
            <div>
              <div className="text-sm font-medium text-nezumi mb-1">功績点</div>
              <div className="text-sumi">{character.achievement_points}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
