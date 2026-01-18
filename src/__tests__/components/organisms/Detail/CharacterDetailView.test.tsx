/**
 * CharacterDetailView コンポーネントのテスト
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CharacterDetailView } from '@/components/organisms/Detail/CharacterDetailView'
import type { Character } from '@/types'

describe('CharacterDetailView', () => {
  const mockCharacter: Character = {
    id: 'char-1',
    user_id: 'user-1',
    name: 'テストシノビ',
    player_name: 'テストプレイヤー',
    school: '斜歯忍軍',
    rank: '中忍',
    age: 25,
    gender: '男',
    cover: 'サラリーマン',
    belief: '忠',
    life_points: 6,
    achievement_points: 10,
    is_public: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  }

  const mockOnEdit = jest.fn()
  const mockOnDelete = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('基本情報の表示', () => {
    it('シノビ名が表示される', () => {
      render(
        <CharacterDetailView
          character={mockCharacter}
          isOwner={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )

      expect(screen.getByText('テストシノビ')).toBeInTheDocument()
    })

    it('プレイヤー名が表示される', () => {
      render(
        <CharacterDetailView
          character={mockCharacter}
          isOwner={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )

      expect(screen.getByText(/テストプレイヤー/)).toBeInTheDocument()
    })

    it('流派が表示される', () => {
      render(
        <CharacterDetailView
          character={mockCharacter}
          isOwner={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )

      expect(screen.getByText(/斜歯忍軍/)).toBeInTheDocument()
    })

    it('階級が表示される', () => {
      render(
        <CharacterDetailView
          character={mockCharacter}
          isOwner={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )

      expect(screen.getByText(/中忍/)).toBeInTheDocument()
    })

    it('年齢が表示される', () => {
      render(
        <CharacterDetailView
          character={mockCharacter}
          isOwner={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )

      expect(screen.getByText(/25/)).toBeInTheDocument()
    })

    it('性別が表示される', () => {
      render(
        <CharacterDetailView
          character={mockCharacter}
          isOwner={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )

      expect(screen.getByText(/男/)).toBeInTheDocument()
    })

    it('カバーが表示される', () => {
      render(
        <CharacterDetailView
          character={mockCharacter}
          isOwner={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )

      expect(screen.getByText(/サラリーマン/)).toBeInTheDocument()
    })

    it('信念が表示される', () => {
      render(
        <CharacterDetailView
          character={mockCharacter}
          isOwner={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )

      expect(screen.getByText(/忠/)).toBeInTheDocument()
    })

    it('生命力が表示される', () => {
      render(
        <CharacterDetailView
          character={mockCharacter}
          isOwner={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )

      expect(screen.getByText(/6/)).toBeInTheDocument()
    })

    it('功績点が表示される', () => {
      render(
        <CharacterDetailView
          character={mockCharacter}
          isOwner={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )

      expect(screen.getByText(/10/)).toBeInTheDocument()
    })

    it('オプション項目がundefinedでもエラーにならない', () => {
      const characterWithoutOptional: Character = {
        ...mockCharacter,
        age: undefined,
        gender: undefined,
        cover: undefined,
        belief: undefined,
      }

      render(
        <CharacterDetailView
          character={characterWithoutOptional}
          isOwner={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )

      expect(screen.getByText('テストシノビ')).toBeInTheDocument()
    })
  })

  describe('所有者の場合の動作', () => {
    it('isOwner=true の場合、編集ボタンが表示される', () => {
      render(
        <CharacterDetailView
          character={mockCharacter}
          isOwner={true}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )

      expect(screen.getByRole('button', { name: /編集/i })).toBeInTheDocument()
    })

    it('isOwner=true の場合、削除ボタンが表示される', () => {
      render(
        <CharacterDetailView
          character={mockCharacter}
          isOwner={true}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )

      expect(screen.getByRole('button', { name: /削除/i })).toBeInTheDocument()
    })

    it('編集ボタンをクリックするとonEditが呼ばれる', async () => {
      const user = userEvent.setup()

      render(
        <CharacterDetailView
          character={mockCharacter}
          isOwner={true}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )

      const editButton = screen.getByRole('button', { name: /編集/i })
      await user.click(editButton)

      expect(mockOnEdit).toHaveBeenCalledTimes(1)
    })

    it('削除ボタンをクリックするとonDeleteが呼ばれる', async () => {
      const user = userEvent.setup()

      render(
        <CharacterDetailView
          character={mockCharacter}
          isOwner={true}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )

      const deleteButton = screen.getByRole('button', { name: /削除/i })
      await user.click(deleteButton)

      expect(mockOnDelete).toHaveBeenCalledTimes(1)
    })
  })

  describe('非所有者の場合の動作', () => {
    it('isOwner=false の場合、編集ボタンが表示されない', () => {
      render(
        <CharacterDetailView
          character={mockCharacter}
          isOwner={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )

      expect(
        screen.queryByRole('button', { name: /編集/i })
      ).not.toBeInTheDocument()
    })

    it('isOwner=false の場合、削除ボタンが表示されない', () => {
      render(
        <CharacterDetailView
          character={mockCharacter}
          isOwner={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )

      expect(
        screen.queryByRole('button', { name: /削除/i })
      ).not.toBeInTheDocument()
    })
  })
})
