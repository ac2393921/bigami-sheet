/**
 * CharacterForm コンポーネントのテスト
 */

import { render, screen } from '@testing-library/react'
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
})
