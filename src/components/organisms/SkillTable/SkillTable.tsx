/**
 * SkillTable コンポーネント
 * シノビガミの特技表（6カテゴリ × 11特技のグリッド）
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

interface SkillTableProps {
  skills: CharacterSkill[]
  onSkillsChange: (skills: CharacterSkill[]) => void
}

export function SkillTable({ skills, onSkillsChange }: SkillTableProps) {
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

  // 特技をクリックしたときの処理
  const handleSkillClick = (category: SkillCategory, skillName: string) => {
    const currentState = getSkillState(category, skillName)
    const existingSkill = skills.find(
      (s) => s.skill_category === category && s.skill_name === skillName
    )

    let newSkills: CharacterSkill[]

    if (currentState === 'none') {
      // 未習得 → 習得済み
      if (existingSkill) {
        newSkills = skills.map((s) =>
          s.skill_category === category && s.skill_name === skillName
            ? { ...s, is_acquired: true, is_gap: false }
            : s
        )
      } else {
        newSkills = [
          ...skills,
          {
            id: `temp-${Date.now()}`,
            character_id: '',
            skill_category: category,
            skill_name: skillName,
            is_acquired: true,
            is_gap: false,
          },
        ]
      }
    } else if (currentState === 'acquired') {
      // 習得済み → ギャップ
      newSkills = skills.map((s) =>
        s.skill_category === category && s.skill_name === skillName
          ? { ...s, is_acquired: false, is_gap: true }
          : s
      )
    } else {
      // ギャップ → 未習得
      newSkills = skills.filter(
        (s) => !(s.skill_category === category && s.skill_name === skillName)
      )
    }

    onSkillsChange(newSkills)
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
                    className="text-center cursor-pointer hover:bg-accent"
                    onClick={() => handleSkillClick(category, skillName)}
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
