# シノビガミ キャラクター管理サイト - 設計書

## 1. 概要

TRPGゲーム「シノビガミ」のキャラクターシートを管理するWebサイト。
ユーザーはキャラクターを作成・編集・削除し、他のユーザーと共有できる。

## 2. 技術スタック

### フロントエンド（既存 + 追加）
- Next.js 13.3.0
- React 18.2.0
- TypeScript 5.0.3
- Tailwind CSS 3.3.1
- Storybook 7.0.2
- **shadcn/ui**（新規追加）

### デザインコンセプト: 和モダン
- **カラーパレット**
  - 墨色（#1a1a1a）- メインテキスト、ヘッダー
  - 朱色（#c53d43）- アクセント、ボタン
  - 生成り色（#f5f3e7）- 背景
  - 藍色（#264348）- サブアクセント
  - 鼠色（#7d7d7d）- セカンダリテキスト
- **フォント**: Noto Serif JP / Reggae One（ロゴ）
- **UIパターン**: 和紙風テクスチャ、墨線風ボーダー

### バックエンド（新規）
- Supabase
  - Database (PostgreSQL)
  - Authentication（Google, Twitter, Discord）
  - Storage（将来的に画像保存用）

## 3. 機能要件

### 3.1 認証機能
- ユーザー登録・ログイン・ログアウト
- ソーシャルログイン対応: Google, Twitter, Discord
- Supabase Authを使用

### 3.2 キャラクター管理（CRUD）
| 操作 | 説明 |
|------|------|
| Create | 新規キャラクター作成 |
| Read | 一覧表示・詳細閲覧 |
| Update | キャラクター編集 |
| Delete | キャラクター削除 |

### 3.3 共有機能（Phase 3）
- 公開/非公開設定
- 共有URL生成
- 他ユーザーのキャラクター閲覧

### 3.4 検索・フィルタ（既存UIあり）
- シノビ名・プレイヤー名で検索
- 流派でフィルタ
- 階級でフィルタ

## 4. データモデル

### 4.1 ER図

```
┌─────────────────┐       ┌─────────────────────┐
│     users       │       │     characters      │
│ (Supabase Auth) │       │                     │
├─────────────────┤       ├─────────────────────┤
│ id (UUID) PK    │──────<│ id (UUID) PK        │
│ email           │       │ user_id (UUID) FK   │
│ created_at      │       │ name                │
└─────────────────┘       │ player_name         │
                          │ school              │
                          │ rank                │
                          │ age                 │
                          │ gender              │
                          │ cover               │
                          │ belief              │
                          │ life_points         │
                          │ achievement_points  │
                          │ is_public           │
                          │ created_at          │
                          │ updated_at          │
                          └──────────┬──────────┘
                                     │
                                     │
                          ┌──────────┴──────────┐
                          │  character_skills   │
                          ├─────────────────────┤
                          │ id (UUID) PK        │
                          │ character_id FK     │
                          │ skill_category      │
                          │ skill_name          │
                          │ is_acquired         │
                          │ is_gap              │
                          └─────────────────────┘
```

### 4.2 テーブル定義

#### users（Supabase Auth管理）
| カラム | 型 | 説明 |
|--------|------|------|
| id | UUID | 主キー |
| email | TEXT | メールアドレス |
| created_at | TIMESTAMP | 作成日時 |

#### characters
| カラム | 型 | 説明 |
|--------|------|------|
| id | UUID | 主キー |
| user_id | UUID | 外部キー → users.id |
| name | TEXT | シノビ名 |
| player_name | TEXT | プレイヤー名 |
| school | TEXT | 流派 |
| rank | TEXT | 階級 |
| age | INTEGER | 年齢（NULL可） |
| gender | TEXT | 性別（NULL可） |
| cover | TEXT | カバー（NULL可） |
| belief | TEXT | 信念（NULL可） |
| life_points | INTEGER | 生命力（デフォルト: 6） |
| achievement_points | INTEGER | 功績点（デフォルト: 0） |
| is_public | BOOLEAN | 公開設定（デフォルト: false） |
| created_at | TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | 更新日時 |

#### character_skills
| カラム | 型 | 説明 |
|--------|------|------|
| id | UUID | 主キー |
| character_id | UUID | 外部キー → characters.id |
| skill_category | TEXT | 特技カテゴリ（器術/体術/忍術/謀術/戦術/妖術） |
| skill_name | TEXT | 特技名 |
| is_acquired | BOOLEAN | 習得済みフラグ |
| is_gap | BOOLEAN | ギャップフラグ |

### 4.3 マスターデータ定義値

#### 流派（school）
```typescript
const SCHOOLS = [
  '斜歯忍軍',
  '鞍馬神流',
  'ハグレモノ',
  '比良坂機関',
  '私立御斎学園',
  '隠忍の血統',
] as const
```

#### 階級（rank）
```typescript
const RANKS = [
  '中忍',
  '中忍頭',
  '上忍',
  '上忍頭',
] as const
```

#### 特技カテゴリと特技名
```typescript
const SKILL_CATEGORIES = ['器術', '体術', '忍術', '謀術', '戦術', '妖術'] as const

const SKILLS: Record<string, string[]> = {
  器術: ['絡繰術', '火術', '水術', '針術', '罠術', '遁走術', '騎乗術', '手裏剣術', '手練', '身体操術', '生存術'],
  体術: ['骨法術', '走法', '飛術', '棒術', '手甲術', '刀術', '鎖術', '壊器術', '弓術', '砲術', '野戦術'],
  忍術: ['意気', '変装術', '香術', '分身の術', '隠形術', '軽身の術', '鳴動の術', '吸気術', '胴撃ち', '潜水術', '霞し'],
  謀術: ['医術', '毒術', '兵糧術', '調略術', '用兵術', '対人術', '言霊術', '幻術', '傀儡の術', '暗号術', '伝達術'],
  戦術: ['腹話術', '瞳術', '布術', '跳脚', '死点撃', '刀を', '縛り術', '隠し武器術', '拷問術', '調査術', '潜入術'],
  妖術: ['異形化', '召喚術', '呪術', '死体術', '拷問術', '結界術', '封印術', '獣化', '憑依術', '言霊術', '鬼術'],
}
```

## 5. API設計

### 5.1 認証API（Supabase Auth）

| 機能 | メソッド | 説明 |
|------|----------|------|
| signInWithOAuth | POST | ソーシャルログイン |
| signOut | POST | ログアウト |
| getUser | GET | 現在のユーザー取得 |
| onAuthStateChange | - | 認証状態監視 |

### 5.2 キャラクターAPI（Supabase Client）

| 機能 | 操作 | 説明 |
|------|------|------|
| 一覧取得 | SELECT | ユーザーのキャラクター一覧 |
| 詳細取得 | SELECT | 単一キャラクター取得 |
| 作成 | INSERT | 新規キャラクター作成 |
| 更新 | UPDATE | キャラクター編集 |
| 削除 | DELETE | キャラクター削除 |

### 5.3 RLS（Row Level Security）ポリシー

```sql
-- characters テーブル
-- SELECT: 自分のキャラクター + 公開キャラクター
-- INSERT: 認証ユーザーのみ、user_idは自分のID
-- UPDATE: 自分のキャラクターのみ
-- DELETE: 自分のキャラクターのみ

-- character_skills テーブル
-- 親テーブル（characters）の権限に従う
```

## 6. コンポーネント設計

### 6.1 新規作成コンポーネント

```
src/
├── lib/
│   └── supabase.ts              # Supabaseクライアント
├── contexts/
│   └── AuthContext.tsx          # 認証状態管理
├── types/
│   └── index.ts                 # 型定義（Character, Skill等）
├── hooks/
│   ├── useAuth.ts               # 認証フック
│   └── useCharacters.ts         # キャラクターCRUDフック
├── components/
│   └── organisms/
│       ├── Form/
│       │   └── CharacterForm.tsx    # キャラクター作成/編集フォーム
│       └── SkillTable/
│           └── SkillTable.tsx       # 特技表コンポーネント
└── pages/
    ├── create.tsx               # キャラクター作成ページ
    ├── characters/
    │   ├── [id].tsx             # キャラクター詳細ページ
    │   └── [id]/
    │       └── edit.tsx         # キャラクター編集ページ
    └── login.tsx                # ログインページ
```

### 6.2 修正対象コンポーネント

| ファイル | 修正内容 |
|----------|----------|
| `src/pages/index.tsx` | Supabase連携 |
| `src/components/organisms/Board/CharacterListBoard.tsx` | ダミーデータ → Supabase |
| `src/components/organisms/Form/CharacterSearchForm.tsx` | フィルタ機能実装 |
| `src/components/Header/header.tsx` | ログインボタン機能化 |
| `src/pages/_app.tsx` | AuthProvider追加 |

## 7. 画面設計

### 7.1 画面一覧

| ページ | パス | 説明 |
|--------|------|------|
| トップ | `/` | キャラクター一覧 |
| ログイン | `/login` | ソーシャルログイン選択 |
| キャラ作成 | `/create` | 新規キャラクター作成 |
| キャラ詳細 | `/characters/[id]` | キャラクターシート表示 |
| キャラ編集 | `/characters/[id]/edit` | キャラクター編集 |

### 7.2 特技表UI

```
         器術    体術    忍術    謀術    戦術    妖術
    ┌─────┬─────┬─────┬─────┬─────┬─────┐
  1 │絡繰術│骨法術│ 意気 │ 医術 │腹話術│異形化│
    ├─────┼─────┼─────┼─────┼─────┼─────┤
  2 │ 火術 │ 走法 │変装術│ 毒術 │ 瞳術 │召喚術│
    ├─────┼─────┼─────┼─────┼─────┼─────┤
 ...│ ... │ ... │ ... │ ... │ ... │ ... │
    ├─────┼─────┼─────┼─────┼─────┼─────┤
 11 │生存術│野戦術│ 霞し │伝達術│潜入術│ 鬼術 │
    └─────┴─────┴─────┴─────┴─────┴─────┘

セルの状態:
- □ 未習得
- ■ 習得済み
- ◆ ギャップ
```

## 8. 実装フェーズ

### Phase 1: MVP（最初の実装範囲）

0. **Step 0: shadcn/uiセットアップ**
   - shadcn/ui初期化
   - 和モダンテーマ設定（globals.css）
   - 必要なコンポーネント追加（Button, Input, Select, Card, Table等）

1. **Step 1: Supabaseセットアップ**
   - supabase-jsインストール
   - 環境変数設定
   - Supabaseクライアント作成

2. **Step 2: データベーススキーマ作成**
   - characters テーブル
   - character_skills テーブル
   - RLSポリシー設定

3. **Step 3: 認証機能**
   - AuthContext作成
   - ログイン/ログアウトUI
   - ソーシャルログイン設定

4. **Step 4: キャラクター作成フォーム**
   - 基本情報入力フォーム
   - Supabaseへの保存処理
   - バリデーション

5. **Step 5: 特技表コンポーネント**
   - 6x11グリッドUI
   - 習得チェック機能
   - ギャップ設定機能

6. **Step 6: 既存UIとの接続**
   - CharacterListBoard → Supabase連携
   - 検索・フィルタ機能実装

### Phase 2: フルシート
- 忍法マスターデータ + 選択UI
- 奥義マスターデータ + 選択UI
- 忍具マスターデータ + 選択UI
- 背景マスターデータ + 選択UI

### Phase 3: 共有機能
- 公開/非公開設定
- 共有URL生成
- 他ユーザーのキャラクター閲覧

## 9. セキュリティ考慮事項

### 9.1 認証
- Supabase Authによるセッション管理
- JWTトークンの自動更新
- サーバーサイドでの認証状態確認

### 9.2 データアクセス制御
- RLSによる行レベルセキュリティ
- 自分のデータのみ編集・削除可能
- 公開設定のあるデータのみ他者が閲覧可能

### 9.3 入力検証
- クライアントサイドバリデーション
- データベース制約によるバリデーション

## 10. 検証方法

### 10.1 機能テスト手順

1. ソーシャルログインでユーザー登録・ログイン
2. キャラクター作成フォームで新規キャラクター作成
3. 特技表で習得特技をマーキング、ギャップ設定
4. キャラクター一覧に作成したキャラクターが表示されることを確認
5. 検索・フィルタが正常に動作することを確認
6. ログアウト・再ログインでデータが保持されていることを確認

### 10.2 動作確認環境

- 開発: `npm run dev` (localhost:3000)
- Supabase: ダッシュボードでデータ確認
