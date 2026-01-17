import {
  SCHOOLS,
  RANKS,
  SKILL_CATEGORIES,
  SKILLS,
  School,
  Rank,
  SkillCategory,
  getSkillsByCategory,
  getAllSkills,
} from '../index'

describe('マスターデータ', () => {
  describe('SCHOOLS（流派）', () => {
    it('6つの流派が定義されている', () => {
      expect(SCHOOLS).toHaveLength(6)
    })

    it('期待される流派が含まれている', () => {
      const expectedSchools: School[] = [
        '斜歯忍軍',
        '鞍馬神流',
        'ハグレモノ',
        '比良坂機関',
        '私立御斎学園',
        '隠忍の血統',
      ]

      expectedSchools.forEach((school) => {
        expect(SCHOOLS).toContain(school)
      })
    })
  })

  describe('RANKS（階級）', () => {
    it('4つの階級が定義されている', () => {
      expect(RANKS).toHaveLength(4)
    })

    it('期待される階級が含まれている', () => {
      const expectedRanks: Rank[] = ['中忍', '中忍頭', '上忍', '上忍頭']

      expectedRanks.forEach((rank) => {
        expect(RANKS).toContain(rank)
      })
    })
  })

  describe('SKILL_CATEGORIES（特技カテゴリ）', () => {
    it('6つの特技カテゴリが定義されている', () => {
      expect(SKILL_CATEGORIES).toHaveLength(6)
    })

    it('期待される特技カテゴリが含まれている', () => {
      const expectedCategories: SkillCategory[] = [
        '器術',
        '体術',
        '忍術',
        '謀術',
        '戦術',
        '妖術',
      ]

      expectedCategories.forEach((category) => {
        expect(SKILL_CATEGORIES).toContain(category)
      })
    })
  })

  describe('SKILLS（特技リスト）', () => {
    it('すべての特技カテゴリに対する特技リストが定義されている', () => {
      SKILL_CATEGORIES.forEach((category) => {
        expect(SKILLS[category]).toBeDefined()
        expect(Array.isArray(SKILLS[category])).toBe(true)
      })
    })

    it('各カテゴリに11個の特技が定義されている', () => {
      SKILL_CATEGORIES.forEach((category) => {
        expect(SKILLS[category]).toHaveLength(11)
      })
    })

    it('器術の特技が正しく定義されている', () => {
      const expected = [
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
      ]

      expect(SKILLS['器術']).toEqual(expected)
    })

    it('体術の特技が正しく定義されている', () => {
      const expected = [
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
      ]

      expect(SKILLS['体術']).toEqual(expected)
    })

    it('忍術の特技が正しく定義されている', () => {
      const expected = [
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
      ]

      expect(SKILLS['忍術']).toEqual(expected)
    })

    it('謀術の特技が正しく定義されている', () => {
      const expected = [
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
      ]

      expect(SKILLS['謀術']).toEqual(expected)
    })

    it('戦術の特技が正しく定義されている', () => {
      const expected = [
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
      ]

      expect(SKILLS['戦術']).toEqual(expected)
    })

    it('妖術の特技が正しく定義されている', () => {
      const expected = [
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
      ]

      expect(SKILLS['妖術']).toEqual(expected)
    })
  })

  describe('getSkillsByCategory', () => {
    it('指定されたカテゴリの特技リストを取得できる', () => {
      const skills = getSkillsByCategory('器術')
      expect(skills).toHaveLength(11)
      expect(skills[0]).toBe('絡繰術')
    })

    it('すべてのカテゴリで特技リストを取得できる', () => {
      SKILL_CATEGORIES.forEach((category) => {
        const skills = getSkillsByCategory(category)
        expect(skills).toHaveLength(11)
        expect(Array.isArray(skills)).toBe(true)
      })
    })
  })

  describe('getAllSkills', () => {
    it('すべての特技を取得できる', () => {
      const allSkills = getAllSkills()
      expect(allSkills).toHaveLength(66) // 6カテゴリ × 11特技
    })

    it('各特技がカテゴリと特技名を持つ', () => {
      const allSkills = getAllSkills()
      allSkills.forEach((skill) => {
        expect(skill.category).toBeDefined()
        expect(skill.name).toBeDefined()
        expect(SKILL_CATEGORIES).toContain(skill.category)
      })
    })

    it('器術の最初の特技が含まれている', () => {
      const allSkills = getAllSkills()
      const firstSkill = allSkills.find(
        (s) => s.category === '器術' && s.name === '絡繰術'
      )
      expect(firstSkill).toBeDefined()
    })
  })
})
