-- ===================================
-- シノビガミ キャラクター管理サイト
-- データベーススキーマ
-- ===================================

-- characters テーブル
CREATE TABLE IF NOT EXISTS characters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  player_name TEXT NOT NULL,
  school TEXT NOT NULL,
  rank TEXT NOT NULL,
  age INTEGER,
  gender TEXT,
  cover TEXT,
  belief TEXT,
  life_points INTEGER DEFAULT 6 NOT NULL,
  achievement_points INTEGER DEFAULT 0 NOT NULL,
  is_public BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- character_skills テーブル
CREATE TABLE IF NOT EXISTS character_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE NOT NULL,
  skill_category TEXT NOT NULL,
  skill_name TEXT NOT NULL,
  is_acquired BOOLEAN DEFAULT false NOT NULL,
  is_gap BOOLEAN DEFAULT false NOT NULL
);

-- インデックス作成
CREATE INDEX IF NOT EXISTS idx_characters_user_id ON characters(user_id);
CREATE INDEX IF NOT EXISTS idx_characters_is_public ON characters(is_public);
CREATE INDEX IF NOT EXISTS idx_character_skills_character_id ON character_skills(character_id);

-- updated_at の自動更新トリガー
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_characters_updated_at
  BEFORE UPDATE ON characters
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ===================================
-- RLS (Row Level Security) ポリシー
-- ===================================

-- characters テーブルの RLS を有効化
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;

-- SELECT: 公開されているか、自分のキャラクターのみ閲覧可能
CREATE POLICY "Characters are viewable by owner or if public"
  ON characters FOR SELECT
  USING (
    is_public = true
    OR auth.uid() = user_id
  );

-- INSERT: 認証済みユーザーは自分のキャラクターを作成可能
CREATE POLICY "Users can insert their own characters"
  ON characters FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: 自分のキャラクターのみ更新可能
CREATE POLICY "Users can update their own characters"
  ON characters FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: 自分のキャラクターのみ削除可能
CREATE POLICY "Users can delete their own characters"
  ON characters FOR DELETE
  USING (auth.uid() = user_id);

-- character_skills テーブルの RLS を有効化
ALTER TABLE character_skills ENABLE ROW LEVEL SECURITY;

-- SELECT: 親の characters テーブルと同じロジック
CREATE POLICY "Character skills are viewable based on character access"
  ON character_skills FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM characters
      WHERE characters.id = character_skills.character_id
      AND (characters.is_public = true OR characters.user_id = auth.uid())
    )
  );

-- INSERT: 自分のキャラクターにのみスキルを追加可能
CREATE POLICY "Users can insert skills for their own characters"
  ON character_skills FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM characters
      WHERE characters.id = character_skills.character_id
      AND characters.user_id = auth.uid()
    )
  );

-- UPDATE: 自分のキャラクターのスキルのみ更新可能
CREATE POLICY "Users can update skills for their own characters"
  ON character_skills FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM characters
      WHERE characters.id = character_skills.character_id
      AND characters.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM characters
      WHERE characters.id = character_skills.character_id
      AND characters.user_id = auth.uid()
    )
  );

-- DELETE: 自分のキャラクターのスキルのみ削除可能
CREATE POLICY "Users can delete skills for their own characters"
  ON character_skills FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM characters
      WHERE characters.id = character_skills.character_id
      AND characters.user_id = auth.uid()
    )
  );
