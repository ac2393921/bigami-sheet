import {
  Character,
  CharacterSkill,
  School,
  Rank,
  SkillCategory,
  createCharacter,
  createCharacterSkill,
} from '../index'

describe('Character 型定義', () => {
  describe('createCharacter', () => {
    it('必須項目のみで Character を作成できる', () => {
      const character: Character = createCharacter({
        name: '霧隠れの才蔵',
        player_name: 'プレイヤー1',
        school: '斜歯忍軍',
        rank: '中忍',
      })

      expect(character.name).toBe('霧隠れの才蔵')
      expect(character.player_name).toBe('プレイヤー1')
      expect(character.school).toBe('斜歯忍軍')
      expect(character.rank).toBe('中忍')
      expect(character.life_points).toBe(6) // デフォルト値
      expect(character.achievement_points).toBe(0) // デフォルト値
      expect(character.is_public).toBe(false) // デフォルト値
      expect(character.id).toBeDefined()
      expect(character.user_id).toBeDefined()
      expect(character.created_at).toBeInstanceOf(Date)
      expect(character.updated_at).toBeInstanceOf(Date)
    })

    it('オプション項目を含めて Character を作成できる', () => {
      const character: Character = createCharacter({
        name: '霧隠れの才蔵',
        player_name: 'プレイヤー1',
        school: '斜歯忍軍',
        rank: '中忍',
        age: 25,
        gender: '男性',
        cover: '商人',
        belief: '我',
        life_points: 8,
        achievement_points: 5,
        is_public: true,
      })

      expect(character.age).toBe(25)
      expect(character.gender).toBe('男性')
      expect(character.cover).toBe('商人')
      expect(character.belief).toBe('我')
      expect(character.life_points).toBe(8)
      expect(character.achievement_points).toBe(5)
      expect(character.is_public).toBe(true)
    })

    it('流派は定義された値のみ受け入れる', () => {
      const validSchools: School[] = [
        '斜歯忍軍',
        '鞍馬神流',
        'ハグレモノ',
        '比良坂機関',
        '私立御斎学園',
        '隠忍の血統',
      ]

      validSchools.forEach((school) => {
        const character = createCharacter({
          name: 'テストシノビ',
          player_name: 'テストプレイヤー',
          school,
          rank: '中忍',
        })
        expect(character.school).toBe(school)
      })
    })

    it('階級は定義された値のみ受け入れる', () => {
      const validRanks: Rank[] = ['中忍', '中忍頭', '上忍', '上忍頭']

      validRanks.forEach((rank) => {
        const character = createCharacter({
          name: 'テストシノビ',
          player_name: 'テストプレイヤー',
          school: '斜歯忍軍',
          rank,
        })
        expect(character.rank).toBe(rank)
      })
    })
  })
})

describe('CharacterSkill 型定義', () => {
  describe('createCharacterSkill', () => {
    it('特技を作成できる', () => {
      const skill: CharacterSkill = createCharacterSkill({
        character_id: 'test-character-id',
        skill_category: '器術',
        skill_name: '絡繰術',
      })

      expect(skill.character_id).toBe('test-character-id')
      expect(skill.skill_category).toBe('器術')
      expect(skill.skill_name).toBe('絡繰術')
      expect(skill.is_acquired).toBe(false) // デフォルト値
      expect(skill.is_gap).toBe(false) // デフォルト値
      expect(skill.id).toBeDefined()
    })

    it('習得済み特技を作成できる', () => {
      const skill: CharacterSkill = createCharacterSkill({
        character_id: 'test-character-id',
        skill_category: '体術',
        skill_name: '骨法術',
        is_acquired: true,
      })

      expect(skill.is_acquired).toBe(true)
      expect(skill.is_gap).toBe(false)
    })

    it('ギャップ特技を作成できる', () => {
      const skill: CharacterSkill = createCharacterSkill({
        character_id: 'test-character-id',
        skill_category: '忍術',
        skill_name: '意気',
        is_acquired: true,
        is_gap: true,
      })

      expect(skill.is_acquired).toBe(true)
      expect(skill.is_gap).toBe(true)
    })

    it('特技カテゴリは定義された値のみ受け入れる', () => {
      const validCategories: SkillCategory[] = [
        '器術',
        '体術',
        '忍術',
        '謀術',
        '戦術',
        '妖術',
      ]

      validCategories.forEach((category) => {
        const skill = createCharacterSkill({
          character_id: 'test-character-id',
          skill_category: category,
          skill_name: 'テスト特技',
        })
        expect(skill.skill_category).toBe(category)
      })
    })
  })
})
