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

      {/* 保存ボタン */}
      <div className="flex justify-end">
        <Button type="submit">保存</Button>
      </div>
    </form>
  )
}
