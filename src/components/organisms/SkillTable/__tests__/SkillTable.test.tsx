/**
 * SkillTable コンポーネントのテスト
 */

import { render, screen, fireEvent } from '@testing-library/react'
import { SkillTable } from '../SkillTable'
import { SKILL_CATEGORIES, SKILLS, type CharacterSkill } from '@/types'

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

  describe('習得チェック機能', () => {
    it('未習得の特技をクリックすると、習得済みになること', () => {
      const mockOnSkillsChange = jest.fn()
      render(<SkillTable skills={[]} onSkillsChange={mockOnSkillsChange} />)

      // 「絡繰術」のセルを取得（器術の1番目）
      const cells = screen.getAllByText('絡繰術')
      const skillCell = cells[0].closest('td')
      expect(skillCell).toBeInTheDocument()

      // 初期状態は未習得（□）
      expect(skillCell).toHaveTextContent('□')

      // セルをクリック
      fireEvent.click(skillCell!)

      // onSkillsChange が呼ばれることを確認
      expect(mockOnSkillsChange).toHaveBeenCalledTimes(1)

      // 習得済みの状態で呼ばれることを確認
      const calledSkills = mockOnSkillsChange.mock
        .calls[0][0] as CharacterSkill[]
      expect(calledSkills).toHaveLength(1)
      expect(calledSkills[0]).toMatchObject({
        skill_category: '器術',
        skill_name: '絡繰術',
        is_acquired: true,
        is_gap: false,
      })
    })

    it('習得済みの特技をクリックすると、ギャップになること', () => {
      const initialSkills: CharacterSkill[] = [
        {
          id: 'test-1',
          character_id: 'char-1',
          skill_category: '器術',
          skill_name: '絡繰術',
          is_acquired: true,
          is_gap: false,
        },
      ]
      const mockOnSkillsChange = jest.fn()
      render(
        <SkillTable
          skills={initialSkills}
          onSkillsChange={mockOnSkillsChange}
        />
      )

      // 「絡繰術」のセルを取得
      const cells = screen.getAllByText('絡繰術')
      const skillCell = cells[0].closest('td')
      expect(skillCell).toBeInTheDocument()

      // 初期状態は習得済み（■）
      expect(skillCell).toHaveTextContent('■')

      // セルをクリック
      fireEvent.click(skillCell!)

      // onSkillsChange が呼ばれることを確認
      expect(mockOnSkillsChange).toHaveBeenCalledTimes(1)

      // ギャップの状態で呼ばれることを確認
      const calledSkills = mockOnSkillsChange.mock
        .calls[0][0] as CharacterSkill[]
      expect(calledSkills).toHaveLength(1)
      expect(calledSkills[0]).toMatchObject({
        skill_category: '器術',
        skill_name: '絡繰術',
        is_acquired: false,
        is_gap: true,
      })
    })

    it('複数の特技を習得できること', () => {
      const mockOnSkillsChange = jest.fn()
      render(<SkillTable skills={[]} onSkillsChange={mockOnSkillsChange} />)

      // 「絡繰術」をクリック
      const karakuriCells = screen.getAllByText('絡繰術')
      fireEvent.click(karakuriCells[0].closest('td')!)

      // onSkillsChange が呼ばれることを確認
      expect(mockOnSkillsChange).toHaveBeenCalledTimes(1)

      // 1つ目の特技が習得されていることを確認
      const firstCallSkills = mockOnSkillsChange.mock
        .calls[0][0] as CharacterSkill[]
      expect(firstCallSkills).toHaveLength(1)
      expect(firstCallSkills[0]).toMatchObject({
        skill_category: '器術',
        skill_name: '絡繰術',
        is_acquired: true,
        is_gap: false,
      })
    })
  })

  describe('ギャップ設定機能', () => {
    it('ギャップの特技をクリックすると、未習得に戻ること', () => {
      const initialSkills: CharacterSkill[] = [
        {
          id: 'test-1',
          character_id: 'char-1',
          skill_category: '器術',
          skill_name: '絡繰術',
          is_acquired: false,
          is_gap: true,
        },
      ]
      const mockOnSkillsChange = jest.fn()
      render(
        <SkillTable
          skills={initialSkills}
          onSkillsChange={mockOnSkillsChange}
        />
      )

      // 「絡繰術」のセルを取得
      const cells = screen.getAllByText('絡繰術')
      const skillCell = cells[0].closest('td')
      expect(skillCell).toBeInTheDocument()

      // 初期状態はギャップ（◆）
      expect(skillCell).toHaveTextContent('◆')

      // セルをクリック
      fireEvent.click(skillCell!)

      // onSkillsChange が呼ばれることを確認
      expect(mockOnSkillsChange).toHaveBeenCalledTimes(1)

      // 未習得の状態（配列から削除される）で呼ばれることを確認
      const calledSkills = mockOnSkillsChange.mock
        .calls[0][0] as CharacterSkill[]
      expect(calledSkills).toHaveLength(0)
    })

    it('特技の状態が正しく表示されること', () => {
      const initialSkills: CharacterSkill[] = [
        {
          id: 'test-1',
          character_id: 'char-1',
          skill_category: '器術',
          skill_name: '絡繰術',
          is_acquired: true,
          is_gap: false,
        },
        {
          id: 'test-2',
          character_id: 'char-1',
          skill_category: '器術',
          skill_name: '火術',
          is_acquired: false,
          is_gap: true,
        },
      ]
      render(<SkillTable skills={initialSkills} onSkillsChange={() => {}} />)

      // 「絡繰術」は習得済み（■）
      const karakuriCells = screen.getAllByText('絡繰術')
      const karakuriCell = karakuriCells[0].closest('td')
      expect(karakuriCell).toHaveTextContent('■')

      // 「火術」はギャップ（◆）
      const kajutsuCells = screen.getAllByText('火術')
      const kajutsuCell = kajutsuCells[0].closest('td')
      expect(kajutsuCell).toHaveTextContent('◆')

      // 「水術」は未習得（□）
      const suijutsuCells = screen.getAllByText('水術')
      const suijutsuCell = suijutsuCells[0].closest('td')
      expect(suijutsuCell).toHaveTextContent('□')
    })
  })
})
