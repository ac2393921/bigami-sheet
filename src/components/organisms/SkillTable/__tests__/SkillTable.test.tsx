/**
 * SkillTable コンポーネントのテスト
 */

import { render, screen } from '@testing-library/react'
import { SkillTable } from '../SkillTable'
import { SKILL_CATEGORIES, SKILLS } from '@/types'

describe('SkillTable', () => {
  describe('基本レンダリング', () => {
    it('特技表が正しくレンダリングされること', () => {
      render(<SkillTable skills={[]} onSkillsChange={() => {}} />)

      // テーブル要素が存在することを確認
      expect(screen.getByRole('table')).toBeInTheDocument()
    })

    it('6つの特技カテゴリ（器術、体術、忍術、謀術、戦術、妖術）のヘッダーが表示されること', () => {
      render(<SkillTable skills={[]} onSkillsChange={() => {}} />)

      SKILL_CATEGORIES.forEach((category) => {
        expect(screen.getByText(category)).toBeInTheDocument()
      })
    })

    it('各カテゴリに11個の特技が表示されること', () => {
      render(<SkillTable skills={[]} onSkillsChange={() => {}} />)

      // 各カテゴリの特技数を確認
      SKILL_CATEGORIES.forEach((category) => {
        const skills = SKILLS[category]
        expect(skills).toHaveLength(11)

        // 各特技名が表示されていることを確認（重複する特技名もあるため getAllByText を使用）
        skills.forEach((skillName) => {
          const elements = screen.getAllByText(skillName)
          expect(elements.length).toBeGreaterThanOrEqual(1)
        })
      })
    })

    it('6列 × 11行のグリッドが表示されること', () => {
      render(<SkillTable skills={[]} onSkillsChange={() => {}} />)

      // ヘッダー行を除いて11行あることを確認
      const rows = screen.getAllByRole('row')
      // ヘッダー行 + 11データ行 = 12行
      expect(rows).toHaveLength(12)
    })
  })
})
