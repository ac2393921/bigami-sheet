/**
 * CharacterForm コンポーネントのテスト
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CharacterForm } from '../CharacterForm'

describe('CharacterForm', () => {
  describe('基本レンダリング', () => {
    it('フォームが正しくレンダリングされること', () => {
      const mockOnSubmit = jest.fn()
      render(<CharacterForm onSubmit={mockOnSubmit} />)

      // フォーム要素が存在することを確認
      expect(screen.getByRole('form')).toBeInTheDocument()
    })

    it('シノビ名の入力フィールドが表示されること', () => {
      const mockOnSubmit = jest.fn()
      render(<CharacterForm onSubmit={mockOnSubmit} />)

      expect(screen.getByLabelText(/シノビ名/i)).toBeInTheDocument()
    })

    it('プレイヤー名の入力フィールドが表示されること', () => {
      const mockOnSubmit = jest.fn()
      render(<CharacterForm onSubmit={mockOnSubmit} />)

      expect(screen.getByLabelText(/プレイヤー名/i)).toBeInTheDocument()
    })

    it('流派の選択フィールドが表示されること', () => {
      const mockOnSubmit = jest.fn()
      render(<CharacterForm onSubmit={mockOnSubmit} />)

      expect(screen.getByLabelText(/流派/i)).toBeInTheDocument()
    })

    it('階級の選択フィールドが表示されること', () => {
      const mockOnSubmit = jest.fn()
      render(<CharacterForm onSubmit={mockOnSubmit} />)

      expect(screen.getByLabelText(/階級/i)).toBeInTheDocument()
    })

    it('保存ボタンが表示されること', () => {
      const mockOnSubmit = jest.fn()
      render(<CharacterForm onSubmit={mockOnSubmit} />)

      expect(screen.getByRole('button', { name: /保存/i })).toBeInTheDocument()
    })
  })

  describe('追加の基本情報フィールド', () => {
    it('年齢の入力フィールドが表示されること', () => {
      const mockOnSubmit = jest.fn()
      render(<CharacterForm onSubmit={mockOnSubmit} />)

      expect(screen.getByLabelText(/年齢/i)).toBeInTheDocument()
    })

    it('性別の入力フィールドが表示されること', () => {
      const mockOnSubmit = jest.fn()
      render(<CharacterForm onSubmit={mockOnSubmit} />)

      expect(screen.getByLabelText(/性別/i)).toBeInTheDocument()
    })

    it('カバーの入力フィールドが表示されること', () => {
      const mockOnSubmit = jest.fn()
      render(<CharacterForm onSubmit={mockOnSubmit} />)

      expect(screen.getByLabelText(/カバー/i)).toBeInTheDocument()
    })

    it('信念の入力フィールドが表示されること', () => {
      const mockOnSubmit = jest.fn()
      render(<CharacterForm onSubmit={mockOnSubmit} />)

      expect(screen.getByLabelText(/信念/i)).toBeInTheDocument()
    })

    it('生命力の入力フィールドが表示されること', () => {
      const mockOnSubmit = jest.fn()
      render(<CharacterForm onSubmit={mockOnSubmit} />)

      expect(screen.getByLabelText(/生命力/i)).toBeInTheDocument()
    })

    it('功績点の入力フィールドが表示されること', () => {
      const mockOnSubmit = jest.fn()
      render(<CharacterForm onSubmit={mockOnSubmit} />)

      expect(screen.getByLabelText(/功績点/i)).toBeInTheDocument()
    })

    it('公開設定のチェックボックスが表示されること', () => {
      const mockOnSubmit = jest.fn()
      render(<CharacterForm onSubmit={mockOnSubmit} />)

      expect(screen.getByLabelText(/公開する/i)).toBeInTheDocument()
    })
  })

  describe('デフォルト値', () => {
    it('生命力のデフォルト値が6であること', () => {
      const mockOnSubmit = jest.fn()
      render(<CharacterForm onSubmit={mockOnSubmit} />)

      const lifePointsInput = screen.getByLabelText(
        /生命力/i
      ) as HTMLInputElement
      expect(lifePointsInput.value).toBe('6')
    })

    it('功績点のデフォルト値が0であること', () => {
      const mockOnSubmit = jest.fn()
      render(<CharacterForm onSubmit={mockOnSubmit} />)

      const achievementPointsInput = screen.getByLabelText(
        /功績点/i
      ) as HTMLInputElement
      expect(achievementPointsInput.value).toBe('0')
    })

    it('公開設定のデフォルト値がfalseであること', () => {
      const mockOnSubmit = jest.fn()
      render(<CharacterForm onSubmit={mockOnSubmit} />)

      const isPublicCheckbox = screen.getByLabelText(
        /公開する/i
      ) as HTMLInputElement
      expect(isPublicCheckbox.checked).toBe(false)
    })
  })

  describe('バリデーション', () => {
    it('必須フィールドが空の場合、onSubmitが呼ばれないこと', () => {
      const mockOnSubmit = jest.fn()
      render(<CharacterForm onSubmit={mockOnSubmit} />)

      const submitButton = screen.getByRole('button', { name: /保存/i })
      fireEvent.click(submitButton)

      expect(mockOnSubmit).not.toHaveBeenCalled()
    })

    it('シノビ名のみ入力した場合、onSubmitが呼ばれないこと', () => {
      const mockOnSubmit = jest.fn()
      const initialData = {
        name: 'テストシノビ',
      }
      render(
        <CharacterForm onSubmit={mockOnSubmit} initialData={initialData} />
      )

      const submitButton = screen.getByRole('button', { name: /保存/i })
      fireEvent.click(submitButton)

      expect(mockOnSubmit).not.toHaveBeenCalled()
    })

    it('すべての必須フィールドが入力された場合、onSubmitが呼ばれること', () => {
      const mockOnSubmit = jest.fn()
      const initialData = {
        name: 'テストシノビ',
        player_name: 'テストプレイヤー',
        school: '斜歯忍軍' as const,
        rank: '中忍' as const,
      }
      render(
        <CharacterForm onSubmit={mockOnSubmit} initialData={initialData} />
      )

      const submitButton = screen.getByRole('button', { name: /保存/i })
      fireEvent.click(submitButton)

      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'テストシノビ',
          player_name: 'テストプレイヤー',
          school: '斜歯忍軍',
          rank: '中忍',
        })
      )
    })

    it('オプションフィールドも含めて送信できること', () => {
      const mockOnSubmit = jest.fn()
      const initialData = {
        name: 'テストシノビ',
        player_name: 'テストプレイヤー',
        school: '斜歯忍軍' as const,
        rank: '中忍' as const,
        age: 25,
        gender: '男性',
        cover: '学生',
        belief: '正義',
        is_public: true,
      }
      render(
        <CharacterForm onSubmit={mockOnSubmit} initialData={initialData} />
      )

      const submitButton = screen.getByRole('button', { name: /保存/i })
      fireEvent.click(submitButton)

      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'テストシノビ',
          player_name: 'テストプレイヤー',
          school: '斜歯忍軍',
          rank: '中忍',
          age: 25,
          gender: '男性',
          cover: '学生',
          belief: '正義',
          is_public: true,
        })
      )
    })
  })
})
