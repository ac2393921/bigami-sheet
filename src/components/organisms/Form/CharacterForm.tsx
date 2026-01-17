/**
 * CharacterForm コンポーネント
 * キャラクターの作成・編集フォーム
 */

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SCHOOLS, RANKS, type CreateCharacterInput } from '@/types'

interface CharacterFormProps {
  onSubmit: (data: CreateCharacterInput) => void
  initialData?: Partial<CreateCharacterInput>
}

export function CharacterForm({ onSubmit, initialData }: CharacterFormProps) {
  const [formData, setFormData] = useState<Partial<CreateCharacterInput>>({
    name: initialData?.name || '',
    player_name: initialData?.player_name || '',
    school: initialData?.school,
    rank: initialData?.rank,
    age: initialData?.age,
    gender: initialData?.gender || '',
    cover: initialData?.cover || '',
    belief: initialData?.belief || '',
    life_points: initialData?.life_points || 6,
    achievement_points: initialData?.achievement_points || 0,
    is_public: initialData?.is_public || false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 必須フィールドのバリデーション
    if (
      !formData.name ||
      !formData.player_name ||
      !formData.school ||
      !formData.rank
    ) {
      return
    }

    onSubmit(formData as CreateCharacterInput)
  }

  return (
    <form role="form" onSubmit={handleSubmit} className="space-y-6">
      {/* シノビ名 */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          シノビ名 <span className="text-destructive">*</span>
        </label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      {/* プレイヤー名 */}
      <div className="space-y-2">
        <label htmlFor="player_name" className="text-sm font-medium">
          プレイヤー名 <span className="text-destructive">*</span>
        </label>
        <Input
          id="player_name"
          type="text"
          value={formData.player_name}
          onChange={(e) =>
            setFormData({ ...formData, player_name: e.target.value })
          }
          required
        />
      </div>

      {/* 流派 */}
      <div className="space-y-2">
        <label htmlFor="school" className="text-sm font-medium">
          流派 <span className="text-destructive">*</span>
        </label>
        <Select
          value={formData.school}
          onValueChange={(value) =>
            setFormData({ ...formData, school: value as any })
          }
          required
        >
          <SelectTrigger id="school">
            <SelectValue placeholder="流派を選択" />
          </SelectTrigger>
          <SelectContent>
            {SCHOOLS.map((school) => (
              <SelectItem key={school} value={school}>
                {school}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 階級 */}
      <div className="space-y-2">
        <label htmlFor="rank" className="text-sm font-medium">
          階級 <span className="text-destructive">*</span>
        </label>
        <Select
          value={formData.rank}
          onValueChange={(value) =>
            setFormData({ ...formData, rank: value as any })
          }
          required
        >
          <SelectTrigger id="rank">
            <SelectValue placeholder="階級を選択" />
          </SelectTrigger>
          <SelectContent>
            {RANKS.map((rank) => (
              <SelectItem key={rank} value={rank}>
                {rank}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 年齢 */}
      <div className="space-y-2">
        <label htmlFor="age" className="text-sm font-medium">
          年齢
        </label>
        <Input
          id="age"
          type="number"
          value={formData.age || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              age: e.target.value ? parseInt(e.target.value) : undefined,
            })
          }
        />
      </div>

      {/* 性別 */}
      <div className="space-y-2">
        <label htmlFor="gender" className="text-sm font-medium">
          性別
        </label>
        <Input
          id="gender"
          type="text"
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        />
      </div>

      {/* カバー */}
      <div className="space-y-2">
        <label htmlFor="cover" className="text-sm font-medium">
          カバー
        </label>
        <Input
          id="cover"
          type="text"
          value={formData.cover}
          onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
        />
      </div>

      {/* 信念 */}
      <div className="space-y-2">
        <label htmlFor="belief" className="text-sm font-medium">
          信念
        </label>
        <Input
          id="belief"
          type="text"
          value={formData.belief}
          onChange={(e) => setFormData({ ...formData, belief: e.target.value })}
        />
      </div>

      {/* 生命力 */}
      <div className="space-y-2">
        <label htmlFor="life_points" className="text-sm font-medium">
          生命力
        </label>
        <Input
          id="life_points"
          type="number"
          value={formData.life_points}
          onChange={(e) =>
            setFormData({
              ...formData,
              life_points: parseInt(e.target.value) || 0,
            })
          }
        />
      </div>

      {/* 功績点 */}
      <div className="space-y-2">
        <label htmlFor="achievement_points" className="text-sm font-medium">
          功績点
        </label>
        <Input
          id="achievement_points"
          type="number"
          value={formData.achievement_points}
          onChange={(e) =>
            setFormData({
              ...formData,
              achievement_points: parseInt(e.target.value) || 0,
            })
          }
        />
      </div>

      {/* 公開設定 */}
      <div className="flex items-center space-x-2">
        <input
          id="is_public"
          type="checkbox"
          checked={formData.is_public}
          onChange={(e) =>
            setFormData({ ...formData, is_public: e.target.checked })
          }
          className="h-4 w-4"
        />
        <label htmlFor="is_public" className="text-sm font-medium">
          公開する
        </label>
      </div>

      {/* 保存ボタン */}
      <div className="flex justify-end">
        <Button type="submit">保存</Button>
      </div>
    </form>
  )
}
