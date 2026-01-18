/**
 * ReadOnlySkillTable コンポーネントのテスト
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReadOnlySkillTable } from '@/components/organisms/SkillTable/ReadOnlySkillTable'
import type { CharacterSkill } from '@/types'

describe('ReadOnlySkillTable', () => {
  describe('基本レンダリング', () => {
    it('特技表のヘッダーが正しく表示される', () => {
      render(<ReadOnlySkillTable skills={[]} />)

      expect(screen.getByText('器術')).toBeInTheDocument()
      expect(screen.getByText('体術')).toBeInTheDocument()
      expect(screen.getByText('忍術')).toBeInTheDocument()
      expect(screen.getByText('謀術')).toBeInTheDocument()
      expect(screen.getByText('戦術')).toBeInTheDocument()
      expect(screen.getByText('妖術')).toBeInTheDocument()
    })

    it('未習得の特技は□アイコンで表示される', () => {
      render(<ReadOnlySkillTable skills={[]} />)

      // 絡繰術（器術の最初の特技）が未習得で表示される
      const skillName = screen.getByText('絡繰術')
      const cellElement = skillName.closest('td')
      expect(cellElement).toHaveTextContent('□')
    })

    it('習得済みの特技は■アイコンで表示される', () => {
      const skills: CharacterSkill[] = [
        {
          id: '1',
          character_id: 'char-1',
          skill_category: '器術',
          skill_name: '絡繰術',
          is_acquired: true,
          is_gap: false,
        },
      ]

      render(<ReadOnlySkillTable skills={skills} />)

      const skillName = screen.getByText('絡繰術')
      const cellElement = skillName.closest('td')
      expect(cellElement).toHaveTextContent('■')
    })

    it('ギャップの特技は◆アイコンで表示される', () => {
      const skills: CharacterSkill[] = [
        {
          id: '1',
          character_id: 'char-1',
          skill_category: '器術',
          skill_name: '火術',
          is_acquired: false,
          is_gap: true,
        },
      ]

      render(<ReadOnlySkillTable skills={skills} />)

      const skillName = screen.getByText('火術')
      const cellElement = skillName.closest('td')
      expect(cellElement).toHaveTextContent('◆')
    })

    it('複数の特技が正しく表示される', () => {
      const skills: CharacterSkill[] = [
        {
          id: '1',
          character_id: 'char-1',
          skill_category: '器術',
          skill_name: '絡繰術',
          is_acquired: true,
          is_gap: false,
        },
        {
          id: '2',
          character_id: 'char-1',
          skill_category: '体術',
          skill_name: '骨法術',
          is_acquired: false,
          is_gap: true,
        },
        {
          id: '3',
          character_id: 'char-1',
          skill_category: '忍術',
          skill_name: '意気',
          is_acquired: false,
          is_gap: false,
        },
      ]

      render(<ReadOnlySkillTable skills={skills} />)

      const karaku = screen.getByText('絡繰術').closest('td')
      expect(karaku).toHaveTextContent('■')

      const koppou = screen.getByText('骨法術').closest('td')
      expect(koppou).toHaveTextContent('◆')

      const iki = screen.getByText('意気').closest('td')
      expect(iki).toHaveTextContent('□')
    })
  })

  describe('読み取り専用の動作', () => {
    it('特技セルをクリックしても状態が変わらない', async () => {
      const user = userEvent.setup()
      const skills: CharacterSkill[] = [
        {
          id: '1',
          character_id: 'char-1',
          skill_category: '器術',
          skill_name: '絡繰術',
          is_acquired: false,
          is_gap: false,
        },
      ]

      render(<ReadOnlySkillTable skills={skills} />)

      const skillName = screen.getByText('絡繰術')
      const cellElement = skillName.closest('td')

      // クリック前は□
      expect(cellElement).toHaveTextContent('□')

      // セルをクリック
      if (cellElement) {
        await user.click(cellElement)
      }

      // クリック後も□のまま（変わらない）
      expect(cellElement).toHaveTextContent('□')
    })

    it('セルにcursor-pointerクラスが付与されていない', () => {
      render(<ReadOnlySkillTable skills={[]} />)

      const skillName = screen.getByText('絡繰術')
      const cellElement = skillName.closest('td')

      expect(cellElement).not.toHaveClass('cursor-pointer')
    })

    it('セルにhover:bg-accentクラスが付与されていない', () => {
      render(<ReadOnlySkillTable skills={[]} />)

      const skillName = screen.getByText('絡繰術')
      const cellElement = skillName.closest('td')

      expect(cellElement).not.toHaveClass('hover:bg-accent')
    })
  })
})
