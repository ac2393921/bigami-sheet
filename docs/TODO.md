# TODO: シノビガミ キャラクター管理サイト

作成日: 2026-01-17
生成元: planning-tasks
設計書: DESIGN.md

## 概要

TRPG ゲーム「シノビガミ」のキャラクターシートを管理する Web サイト。
ユーザーはキャラクターを作成・編集・削除し、他のユーザーと共有できる。

**Phase 1: MVP** の実装を行う。

## 実装タスク

### フェーズ 1: プロジェクト基盤構築 ✅

- [x] Next.js + TypeScript プロジェクトの初期化
- [x] Tailwind CSS のセットアップ
- [x] shadcn/ui の初期化と和モダンテーマ設定
- [x] 必要な shadcn/ui コンポーネントの追加（Button, Input, Select, Card, Table 等）
- [x] プロジェクト構造の作成（src/lib, src/contexts, src/types, src/hooks, src/components）
- [x] [CHECK] lint/format/build の実行と確認

### フェーズ 2: 型定義とマスターデータ ✅

- [x] Jest + React Testing Library のセットアップ
- [x] [RED] 型定義（Character, Skill 等）のテスト作成
- [x] [GREEN] 型定義の実装（src/types/index.ts）
- [x] [RED] マスターデータ（流派、階級、特技）のテスト作成
- [x] [GREEN] マスターデータの実装
- [x] [REFACTOR] 型定義とマスターデータの整理
- [x] [CHECK] lint/format/build の実行と確認

### フェーズ 3: Supabase セットアップ ✅

- [x] supabase-js パッケージのインストール
- [x] 環境変数ファイル（.env.local）の設定
- [x] [RED] Supabase クライアントのテスト作成
- [x] [GREEN] Supabase クライアントの実装（src/lib/supabase.ts）
- [x] [REFACTOR] エラーハンドリングの改善
- [x] [CHECK] lint/format/build の実行と確認

### フェーズ 4: データベーススキーマ作成

**テーブル定義（DESIGN.md 4.2 参照）**

#### characters テーブル
- [ ] Supabase SQL Editor で characters テーブルを作成
  - id (UUID, PK, default: gen_random_uuid())
  - user_id (UUID, FK → auth.users, NOT NULL)
  - name (TEXT, NOT NULL)
  - player_name (TEXT, NOT NULL)
  - school (TEXT, NOT NULL)
  - rank (TEXT, NOT NULL)
  - age (INTEGER, NULL)
  - gender (TEXT, NULL)
  - cover (TEXT, NULL)
  - belief (TEXT, NULL)
  - life_points (INTEGER, DEFAULT 6)
  - achievement_points (INTEGER, DEFAULT 0)
  - is_public (BOOLEAN, DEFAULT false)
  - created_at (TIMESTAMP, DEFAULT now())
  - updated_at (TIMESTAMP, DEFAULT now())

#### character_skills テーブル
- [ ] Supabase SQL Editor で character_skills テーブルを作成
  - id (UUID, PK, default: gen_random_uuid())
  - character_id (UUID, FK → characters.id, ON DELETE CASCADE)
  - skill_category (TEXT, NOT NULL)
  - skill_name (TEXT, NOT NULL)
  - is_acquired (BOOLEAN, DEFAULT false)
  - is_gap (BOOLEAN, DEFAULT false)

#### RLS（Row Level Security）ポリシー
- [ ] characters テーブルの RLS を有効化
- [ ] characters テーブルの SELECT ポリシー設定（公開 OR 自分のデータ）
- [ ] characters テーブルの INSERT ポリシー設定（認証ユーザー）
- [ ] characters テーブルの UPDATE ポリシー設定（自分のデータのみ）
- [ ] characters テーブルの DELETE ポリシー設定（自分のデータのみ）
- [ ] character_skills テーブルの RLS を有効化
- [ ] character_skills テーブルのポリシー設定（characters と同じロジック）
- [ ] [CHECK] Supabase ダッシュボードでスキーマとポリシーを確認

### フェーズ 5: 認証機能の実装

- [ ] [RED] AuthContext の動作テスト作成
- [ ] [GREEN] AuthContext 実装（src/contexts/AuthContext.tsx）
- [ ] [RED] useAuth フックのテスト作成
- [ ] [GREEN] useAuth フック実装（src/hooks/useAuth.ts）
- [ ] [RED] ログインページのレンダリングテスト作成
- [ ] [GREEN] ログインページ UI 実装（src/pages/login.tsx）
- [ ] [RED] Header ログインボタンのテスト作成
- [ ] [GREEN] Header ログインボタン機能実装
- [ ] [REFACTOR] 認証関連コードの整理
- [ ] [CHECK] lint/format/build の実行と確認
- [ ] Supabase ダッシュボードでソーシャルログイン設定（Google, Twitter, Discord）

### フェーズ 6: キャラクター CRUD - 型とフック

- [ ] [RED] useCharacters フックの一覧取得テスト作成
- [ ] [GREEN] 一覧取得機能の実装
- [ ] [RED] useCharacters フックの詳細取得テスト作成
- [ ] [GREEN] 詳細取得機能の実装
- [ ] [RED] useCharacters フックの作成機能テスト作成
- [ ] [GREEN] 作成機能の実装
- [ ] [RED] useCharacters フックの更新機能テスト作成
- [ ] [GREEN] 更新機能の実装
- [ ] [RED] useCharacters フックの削除機能テスト作成
- [ ] [GREEN] 削除機能の実装
- [ ] [REFACTOR] CRUD 処理の共通化
- [ ] [CHECK] lint/format/build の実行と確認

### フェーズ 7: キャラクター作成フォーム

- [ ] [RED] CharacterForm の基本レンダリングテスト作成
- [ ] [GREEN] CharacterForm 基本 UI 実装（src/components/organisms/Form/CharacterForm.tsx）
- [ ] [RED] 基本情報入力フィールドのテスト作成
- [ ] [GREEN] 基本情報入力フィールド実装（名前、プレイヤー名、流派、階級等）
- [ ] [RED] バリデーションテスト作成
- [ ] [GREEN] バリデーション実装
- [ ] [RED] 保存処理のテスト作成
- [ ] [GREEN] Supabase への保存処理実装
- [ ] [REFACTOR] フォームコンポーネントの整理
- [ ] [CHECK] lint/format/build の実行と確認

### フェーズ 8: 特技表コンポーネント

- [ ] [RED] SkillTable の 6x11 グリッドレンダリングテスト作成
- [ ] [GREEN] SkillTable 基本 UI 実装（src/components/organisms/SkillTable/SkillTable.tsx）
- [ ] [RED] 習得チェック機能のテスト作成
- [ ] [GREEN] 習得チェック機能実装
- [ ] [RED] ギャップ設定機能のテスト作成
- [ ] [GREEN] ギャップ設定機能実装
- [ ] [RED] 特技データの永続化テスト作成
- [ ] [GREEN] 特技データの永続化実装
- [ ] [REFACTOR] 特技表コンポーネントの最適化
- [ ] [CHECK] lint/format/build の実行と確認

### フェーズ 9: キャラクター作成ページ

- [ ] [RED] 作成ページのレンダリングテスト作成
- [ ] [GREEN] 作成ページ UI 実装（src/pages/create.tsx）
- [ ] [RED] フォーム送信フローのテスト作成
- [ ] [GREEN] フォーム送信・リダイレクト処理実装
- [ ] [REFACTOR] ページコンポーネントの整理
- [ ] [CHECK] lint/format/build の実行と確認

### フェーズ 10: キャラクター詳細・編集ページ

- [ ] [RED] 詳細ページのレンダリングテスト作成
- [ ] [GREEN] 詳細ページ UI 実装（src/pages/characters/[id].tsx）
- [ ] [RED] 編集ページのレンダリングテスト作成
- [ ] [GREEN] 編集ページ UI 実装（src/pages/characters/[id]/edit.tsx）
- [ ] [RED] 更新処理のテスト作成
- [ ] [GREEN] 更新処理実装
- [ ] [REFACTOR] 詳細・編集ページの共通化
- [ ] [CHECK] lint/format/build の実行と確認

### フェーズ 11: キャラクター一覧・検索機能

- [ ] [RED] CharacterListBoard の Supabase 連携テスト作成
- [ ] [GREEN] CharacterListBoard Supabase 連携実装
- [ ] [RED] 検索機能（シノビ名・プレイヤー名）のテスト作成
- [ ] [GREEN] 検索機能実装
- [ ] [RED] フィルタ機能（流派・階級）のテスト作成
- [ ] [GREEN] フィルタ機能実装
- [ ] [REFACTOR] 検索・フィルタロジックの最適化
- [ ] [CHECK] lint/format/build の実行と確認

### フェーズ 12: トップページ統合

- [ ] [RED] トップページの統合テスト作成
- [ ] [GREEN] トップページ実装（src/pages/index.tsx）
- [ ] [RED] \_app.tsx への AuthProvider 追加テスト作成
- [ ] [GREEN] \_app.tsx 修正
- [ ] [REFACTOR] ページ間ナビゲーションの整理
- [ ] [CHECK] lint/format/build の実行と確認

### フェーズ 13: 品質保証

- [ ] [STRUCTURAL] コード整理（動作変更なし）
- [ ] 全テスト実行と確認
- [ ] lint/format/build の最終確認
- [ ] 手動での機能テスト（設計書 10.1 の手順に従う）

## 実装ノート

### MUST ルール遵守事項

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
