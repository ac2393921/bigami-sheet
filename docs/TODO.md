# TODO: シノビガミ キャラクター管理サイト

作成日: 2026-01-17
生成元: planning-tasks
設計書: DESIGN.md

## 概要

TRPGゲーム「シノビガミ」のキャラクターシートを管理するWebサイト。
ユーザーはキャラクターを作成・編集・削除し、他のユーザーと共有できる。

**Phase 1: MVP** の実装を行う。

## 実装タスク

### フェーズ1: プロジェクト基盤構築

- [ ] Next.js + TypeScript プロジェクトの初期化
- [ ] Tailwind CSS のセットアップ
- [ ] shadcn/ui の初期化と和モダンテーマ設定
- [ ] 必要なshadcn/uiコンポーネントの追加（Button, Input, Select, Card, Table等）
- [ ] プロジェクト構造の作成（src/lib, src/contexts, src/types, src/hooks, src/components）
- [ ] [CHECK] lint/format/build の実行と確認

### フェーズ2: 型定義とマスターデータ

- [ ] [RED] 型定義（Character, Skill等）のテスト作成
- [ ] [GREEN] 型定義の実装（src/types/index.ts）
- [ ] [RED] マスターデータ（流派、階級、特技）のテスト作成
- [ ] [GREEN] マスターデータの実装
- [ ] [REFACTOR] 型定義とマスターデータの整理
- [ ] [CHECK] lint/format/build の実行と確認

### フェーズ3: Supabaseセットアップ

- [ ] supabase-js パッケージのインストール
- [ ] 環境変数ファイル（.env.local）の設定
- [ ] [RED] Supabaseクライアントのテスト作成
- [ ] [GREEN] Supabaseクライアントの実装（src/lib/supabase.ts）
- [ ] [REFACTOR] エラーハンドリングの改善
- [ ] [CHECK] lint/format/build の実行と確認

### フェーズ4: データベーススキーマ作成

- [ ] Supabaseダッシュボードでcharactersテーブル作成
- [ ] Supabaseダッシュボードでcharacter_skillsテーブル作成
- [ ] RLSポリシーの設定（SELECT/INSERT/UPDATE/DELETE）
- [ ] [CHECK] Supabaseダッシュボードでスキーマ確認

### フェーズ5: 認証機能の実装

- [ ] [RED] AuthContextの動作テスト作成
- [ ] [GREEN] AuthContext実装（src/contexts/AuthContext.tsx）
- [ ] [RED] useAuthフックのテスト作成
- [ ] [GREEN] useAuthフック実装（src/hooks/useAuth.ts）
- [ ] [RED] ログインページのレンダリングテスト作成
- [ ] [GREEN] ログインページUI実装（src/pages/login.tsx）
- [ ] [RED] Headerログインボタンのテスト作成
- [ ] [GREEN] Headerログインボタン機能実装
- [ ] [REFACTOR] 認証関連コードの整理
- [ ] [CHECK] lint/format/build の実行と確認
- [ ] Supabaseダッシュボードでソーシャルログイン設定（Google, Twitter, Discord）

### フェーズ6: キャラクターCRUD - 型とフック

- [ ] [RED] useCharactersフックの一覧取得テスト作成
- [ ] [GREEN] 一覧取得機能の実装
- [ ] [RED] useCharactersフックの詳細取得テスト作成
- [ ] [GREEN] 詳細取得機能の実装
- [ ] [RED] useCharactersフックの作成機能テスト作成
- [ ] [GREEN] 作成機能の実装
- [ ] [RED] useCharactersフックの更新機能テスト作成
- [ ] [GREEN] 更新機能の実装
- [ ] [RED] useCharactersフックの削除機能テスト作成
- [ ] [GREEN] 削除機能の実装
- [ ] [REFACTOR] CRUD処理の共通化
- [ ] [CHECK] lint/format/build の実行と確認

### フェーズ7: キャラクター作成フォーム

- [ ] [RED] CharacterFormの基本レンダリングテスト作成
- [ ] [GREEN] CharacterForm基本UI実装（src/components/organisms/Form/CharacterForm.tsx）
- [ ] [RED] 基本情報入力フィールドのテスト作成
- [ ] [GREEN] 基本情報入力フィールド実装（名前、プレイヤー名、流派、階級等）
- [ ] [RED] バリデーションテスト作成
- [ ] [GREEN] バリデーション実装
- [ ] [RED] 保存処理のテスト作成
- [ ] [GREEN] Supabaseへの保存処理実装
- [ ] [REFACTOR] フォームコンポーネントの整理
- [ ] [CHECK] lint/format/build の実行と確認

### フェーズ8: 特技表コンポーネント

- [ ] [RED] SkillTableの6x11グリッドレンダリングテスト作成
- [ ] [GREEN] SkillTable基本UI実装（src/components/organisms/SkillTable/SkillTable.tsx）
- [ ] [RED] 習得チェック機能のテスト作成
- [ ] [GREEN] 習得チェック機能実装
- [ ] [RED] ギャップ設定機能のテスト作成
- [ ] [GREEN] ギャップ設定機能実装
- [ ] [RED] 特技データの永続化テスト作成
- [ ] [GREEN] 特技データの永続化実装
- [ ] [REFACTOR] 特技表コンポーネントの最適化
- [ ] [CHECK] lint/format/build の実行と確認

### フェーズ9: キャラクター作成ページ

- [ ] [RED] 作成ページのレンダリングテスト作成
- [ ] [GREEN] 作成ページUI実装（src/pages/create.tsx）
- [ ] [RED] フォーム送信フローのテスト作成
- [ ] [GREEN] フォーム送信・リダイレクト処理実装
- [ ] [REFACTOR] ページコンポーネントの整理
- [ ] [CHECK] lint/format/build の実行と確認

### フェーズ10: キャラクター詳細・編集ページ

- [ ] [RED] 詳細ページのレンダリングテスト作成
- [ ] [GREEN] 詳細ページUI実装（src/pages/characters/[id].tsx）
- [ ] [RED] 編集ページのレンダリングテスト作成
- [ ] [GREEN] 編集ページUI実装（src/pages/characters/[id]/edit.tsx）
- [ ] [RED] 更新処理のテスト作成
- [ ] [GREEN] 更新処理実装
- [ ] [REFACTOR] 詳細・編集ページの共通化
- [ ] [CHECK] lint/format/build の実行と確認

### フェーズ11: キャラクター一覧・検索機能

- [ ] [RED] CharacterListBoardのSupabase連携テスト作成
- [ ] [GREEN] CharacterListBoard Supabase連携実装
- [ ] [RED] 検索機能（シノビ名・プレイヤー名）のテスト作成
- [ ] [GREEN] 検索機能実装
- [ ] [RED] フィルタ機能（流派・階級）のテスト作成
- [ ] [GREEN] フィルタ機能実装
- [ ] [REFACTOR] 検索・フィルタロジックの最適化
- [ ] [CHECK] lint/format/build の実行と確認

### フェーズ12: トップページ統合

- [ ] [RED] トップページの統合テスト作成
- [ ] [GREEN] トップページ実装（src/pages/index.tsx）
- [ ] [RED] _app.tsxへのAuthProvider追加テスト作成
- [ ] [GREEN] _app.tsx修正
- [ ] [REFACTOR] ページ間ナビゲーションの整理
- [ ] [CHECK] lint/format/build の実行と確認

### フェーズ13: 品質保証

- [ ] [STRUCTURAL] コード整理（動作変更なし）
- [ ] 全テスト実行と確認
- [ ] lint/format/build の最終確認
- [ ] 手動での機能テスト（設計書10.1の手順に従う）

## 実装ノート

### MUSTルール遵守事項
- TDD: RED → GREEN → REFACTOR → CHECK サイクルを厳守
- CHECK: 各フェーズ完了時に lint/format/build を実行
- Tidy First: 構造変更と動作変更を分離
- コミット: [BEHAVIORAL] または [STRUCTURAL] プレフィックス必須

### 参照ドキュメント
- 設計書: DESIGN.md

### 技術スタック
- Next.js 13.3.0
- React 18.2.0
- TypeScript 5.0.3
- Tailwind CSS 3.3.1
- shadcn/ui
- Supabase (Database, Auth, Storage)

### デザインコンセプト: 和モダン
- 墨色（#1a1a1a）- メインテキスト、ヘッダー
- 朱色（#c53d43）- アクセント、ボタン
- 生成り色（#f5f3e7）- 背景
- 藍色（#264348）- サブアクセント
- 鼠色（#7d7d7d）- セカンダリテキスト
