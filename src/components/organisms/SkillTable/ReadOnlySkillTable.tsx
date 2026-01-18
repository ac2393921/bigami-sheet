/**
 * ReadOnlySkillTable コンポーネント
 * シノビガミの特技表（6カテゴリ × 11特技のグリッド）- 読み取り専用版
 */

import {
  SKILL_CATEGORIES,
  SKILLS,
  type CharacterSkill,
  type SkillCategory,
} from '@/types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface ReadOnlySkillTableProps {
  skills: CharacterSkill[]
}

export function ReadOnlySkillTable({ skills }: ReadOnlySkillTableProps) {
  // 特技の状態を取得するヘルパー関数
  const getSkillState = (
    category: SkillCategory,
    skillName: string
  ): 'none' | 'acquired' | 'gap' => {
    const skill = skills.find(
      (s) => s.skill_category === category && s.skill_name === skillName
    )
    if (!skill) return 'none'
    if (skill.is_gap) return 'gap'
    if (skill.is_acquired) return 'acquired'
    return 'none'
  }

  // セルの表示内容を取得
  const getCellContent = (state: 'none' | 'acquired' | 'gap'): string => {
    switch (state) {
      case 'acquired':
        return '■'
      case 'gap':
        return '◆'
      default:
        return '□'
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {SKILL_CATEGORIES.map((category) => (
              <TableHead key={category} className="text-center font-bold">
                {category}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 11 }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {SKILL_CATEGORIES.map((category) => {
                const skillName = SKILLS[category][rowIndex]
                const state = getSkillState(category, skillName)
                const icon = getCellContent(state)

                return (
                  <TableCell
                    key={`${category}-${skillName}`}
                    className="text-center"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-lg">{icon}</span>
                      <span className="text-sm">{skillName}</span>
                    </div>
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
