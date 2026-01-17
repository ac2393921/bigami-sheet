// 流派の型定義
export const SCHOOLS = [
  '斜歯忍軍',
  '鞍馬神流',
  'ハグレモノ',
  '比良坂機関',
  '私立御斎学園',
  '隠忍の血統',
] as const

export type School = (typeof SCHOOLS)[number]

// 階級の型定義
export const RANKS = ['中忍', '中忍頭', '上忍', '上忍頭'] as const

export type Rank = (typeof RANKS)[number]

// 特技カテゴリの型定義
export const SKILL_CATEGORIES = [
  '器術',
  '体術',
  '忍術',
  '謀術',
  '戦術',
  '妖術',
] as const

export type SkillCategory = (typeof SKILL_CATEGORIES)[number]

// 特技リスト
export const SKILLS: Record<SkillCategory, string[]> = {
  器術: [
    '絡繰術',
    '火術',
    '水術',
    '針術',
    '罠術',
    '遁走術',
    '騎乗術',
    '手裏剣術',
    '手練',
    '身体操術',
    '生存術',
  ],
  体術: [
    '骨法術',
    '走法',
    '飛術',
    '棒術',
    '手甲術',
    '刀術',
    '鎖術',
    '壊器術',
    '弓術',
    '砲術',
    '野戦術',
  ],
  忍術: [
    '意気',
    '変装術',
    '香術',
    '分身の術',
    '隠形術',
    '軽身の術',
    '鳴動の術',
    '吸気術',
    '胴撃ち',
    '潜水術',
    '霞し',
  ],
  謀術: [
    '医術',
    '毒術',
    '兵糧術',
    '調略術',
    '用兵術',
    '対人術',
    '言霊術',
    '幻術',
    '傀儡の術',
    '暗号術',
    '伝達術',
  ],
  戦術: [
    '腹話術',
    '瞳術',
    '布術',
    '跳脚',
    '死点撃',
    '刀を',
    '縛り術',
    '隠し武器術',
    '拷問術',
    '調査術',
    '潜入術',
  ],
  妖術: [
    '異形化',
    '召喚術',
    '呪術',
    '死体術',
    '拷問術',
    '結界術',
    '封印術',
    '獣化',
    '憑依術',
    '言霊術',
    '鬼術',
  ],
}

// 特技情報の型
export interface Skill {
  category: SkillCategory
  name: string
}

// Character 型定義
export interface Character {
  id: string
  user_id: string
  name: string
  player_name: string
  school: School
  rank: Rank
  age?: number
  gender?: string
  cover?: string
  belief?: string
  life_points: number
  achievement_points: number
  is_public: boolean
  created_at: Date
  updated_at: Date
}

// CharacterSkill 型定義
export interface CharacterSkill {
  id: string
  character_id: string
  skill_category: SkillCategory
  skill_name: string
  is_acquired: boolean
  is_gap: boolean
}

// Character 作成用の型（必須項目のみ）
export interface CreateCharacterInput {
  name: string
  player_name: string
  school: School
  rank: Rank
  age?: number
  gender?: string
  cover?: string
  belief?: string
  life_points?: number
  achievement_points?: number
  is_public?: boolean
}

// CharacterSkill 作成用の型（必須項目のみ）
export interface CreateCharacterSkillInput {
  character_id: string
  skill_category: SkillCategory
  skill_name: string
  is_acquired?: boolean
  is_gap?: boolean
}

// UUID 生成のヘルパー関数（簡易版）
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// Character 作成関数
export const createCharacter = (input: CreateCharacterInput): Character => {
  const now = new Date()
  return {
    id: generateUUID(),
    user_id: generateUUID(),
    name: input.name,
    player_name: input.player_name,
    school: input.school,
    rank: input.rank,
    age: input.age,
    gender: input.gender,
    cover: input.cover,
    belief: input.belief,
    life_points: input.life_points ?? 6,
    achievement_points: input.achievement_points ?? 0,
    is_public: input.is_public ?? false,
    created_at: now,
    updated_at: now,
  }
}

// CharacterSkill 作成関数
export const createCharacterSkill = (
  input: CreateCharacterSkillInput
): CharacterSkill => {
  return {
    id: generateUUID(),
    character_id: input.character_id,
    skill_category: input.skill_category,
    skill_name: input.skill_name,
    is_acquired: input.is_acquired ?? false,
    is_gap: input.is_gap ?? false,
  }
}

// 指定されたカテゴリの特技リストを取得
export const getSkillsByCategory = (category: SkillCategory): string[] => {
  return SKILLS[category]
}

// すべての特技を取得
export const getAllSkills = (): Skill[] => {
  return SKILL_CATEGORIES.flatMap((category) =>
    SKILLS[category].map((skillName) => ({
      category,
      name: skillName,
    }))
  )
}
