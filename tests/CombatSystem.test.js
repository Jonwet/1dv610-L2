import CombatSystem from '../src/CombatSystem.js'
import Combatant from '../src/Combatant.js'
import CombatAction from '../src/CombatAction.js'

const validHero = {
    id: 1,
    name: 'Hero',
    team: 'player',
    maxHealth: 100,
    attackPower: 20,
    defense: 10,
    speed: 15,
}

const validEnemy = {
    id: 2,
    name: 'Goblin',
    team: 'enemy',
    maxHealth: 50,
    attackPower: 12,
    defense: 5,
    speed: 10,
}

const validAction = {
    name: 'Basic Attack',
    accuracy: 1.0,
}

test('startCombat initializes combat with valid participants', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)

    combat.startCombat([hero, enemy])
    const state = combat.getState()

    expect(state.isActive).toBe(true)
    expect(state.combatants).toHaveLength(2)
    expect(state.currentCombatant).toBeDefined()
})

test('startCombat sets turn order based on speed', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)

    combat.startCombat([hero, enemy])
    const state = combat.getState()

    expect(state.currentCombatant.id).toBe(hero.id)
})

test('startCombat throws error if participants is not an array', () => {
    const combat = new CombatSystem()

    expect(() => combat.startCombat('hero')).toThrow(
        'participants must be a non-empty array',
    )
    expect(() => combat.startCombat(123)).toThrow(
        'participants must be a non-empty array',
    )
    expect(() => combat.startCombat({})).toThrow(
        'participants must be a non-empty array',
    )
    expect(() => combat.startCombat(null)).toThrow(
        'participants must be a non-empty array',
    )
    expect(() => combat.startCombat(undefined)).toThrow(
        'participants must be a non-empty array',
    )
})

test('startCombat throws error if participants array is empty', () => {
    const combat = new CombatSystem()

    expect(() => combat.startCombat([])).toThrow(
        'participants must be a non-empty array',
    )
})

test('executeAttack returns damage dealt on successful hit', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)
    const action = new CombatAction(validAction)

    combat.startCombat([hero, enemy])
    const damage = combat.executeAttack(enemy.id, action)

    expect(typeof damage).toBe('number')
    expect(damage).toBeGreaterThan(0)
})

test('executeAttack reduces target health', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)
    const action = new CombatAction(validAction)

    combat.startCombat([hero, enemy])
    const initialHealth = enemy.currentHealth

    combat.executeAttack(enemy.id, action)

    expect(enemy.currentHealth).toBeLessThan(initialHealth)
})

test('executeAttack logs attack message', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)
    const action = new CombatAction(validAction)

    combat.startCombat([hero, enemy])
    combat.executeAttack(enemy.id, action)

    const log = combat.getCombatLog()
    const attackLog = log.find((entry) => entry.includes('attacked'))

    expect(attackLog).toBeDefined()
    expect(attackLog).toContain(hero.name)
    expect(attackLog).toContain(enemy.name)
})

test('executeAttack returns 0 on miss', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)
    const missAction = new CombatAction({ name: 'Miss', accuracy: 0 })

    combat.startCombat([hero, enemy])
    const damage = combat.executeAttack(enemy.id, missAction)

    expect(damage).toBe(0)
})

test('executeAttack logs miss message when attack misses', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)
    const missAction = new CombatAction({ name: 'Miss', accuracy: 0 })

    combat.startCombat([hero, enemy])
    combat.executeAttack(enemy.id, missAction)

    const log = combat.getCombatLog()
    const missLog = log.find((entry) => entry.includes('missed'))

    expect(missLog).toBeDefined()
})

test('executeAttack logs defeat message when target dies', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const weakEnemy = new Combatant({ ...validEnemy, maxHealth: 1 })
    const action = new CombatAction(validAction)

    combat.startCombat([hero, weakEnemy])
    combat.executeAttack(weakEnemy.id, action)

    const log = combat.getCombatLog()
    const defeatLog = log.find((entry) => entry.includes('defeated'))

    expect(defeatLog).toBeDefined()
})

test('executeAttack deals minimum 1 damage', () => {
    const combat = new CombatSystem()
    const weakHero = new Combatant({ ...validHero, attackPower: 1 })
    const strongEnemy = new Combatant({ ...validEnemy, defense: 100 })
    const action = new CombatAction(validAction)

    combat.startCombat([weakHero, strongEnemy])
    const damage = combat.executeAttack(strongEnemy.id, action)

    expect(damage).toBe(1)
})

test('executeAttack throws error if target not found', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)
    const action = new CombatAction(validAction)

    combat.startCombat([hero, enemy])

    expect(() => combat.executeAttack(999, action)).toThrow(
        'Target 999 not found',
    )
})

test('executeAttack throws error if attacker is dead', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)
    const action = new CombatAction(validAction)

    combat.startCombat([hero, enemy])
    hero.isAlive = false

    expect(() => combat.executeAttack(enemy.id, action)).toThrow(
        `${hero.name} is dead`,
    )
})

test('executeAttack throws error if target is already dead', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)
    const action = new CombatAction(validAction)

    combat.startCombat([hero, enemy])
    enemy.isAlive = false

    expect(() => combat.executeAttack(enemy.id, action)).toThrow(
        `${enemy.name} is already dead`,
    )
})

test('executeDefend sets combatant to defending', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)

    combat.startCombat([hero, enemy])
    combat.executeDefend(hero.id)

    expect(hero.isDefending).toBe(true)
})

test('executeDefend logs defend message', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)

    combat.startCombat([hero, enemy])
    combat.executeDefend(hero.id)

    const log = combat.getCombatLog()
    const defendLog = log.find((entry) => entry.includes('defending'))

    expect(defendLog).toBeDefined()
    expect(defendLog).toContain(hero.name)
})

test('executeDefend reduces damage on next attack', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)
    const action = new CombatAction(validAction)

    combat.startCombat([hero, enemy])

    combat.nextUnitTurn()
    const normalDamage = combat.executeAttack(hero.id, action)

    combat.nextUnitTurn()
    hero.currentHealth = 100
    combat.executeDefend(hero.id)

    combat.nextUnitTurn()
    const defendDamage = combat.executeAttack(hero.id, action)

    expect(defendDamage).toBeLessThan(normalDamage)
})

test('executeDefend throws error if combatant not found', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)

    combat.startCombat([hero, enemy])

    expect(() => combat.executeDefend(999)).toThrow('Combatant 999 not found')
})

test('executeDefend throws error if combatant is dead', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)

    combat.startCombat([hero, enemy])
    hero.isAlive = false

    expect(() => combat.executeDefend(hero.id)).toThrow(`${hero.name} is dead`)
})

test('nextUnitTurn returns next alive combatant', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)

    combat.startCombat([hero, enemy])
    const current = combat.getState().currentCombatant

    const next = combat.nextUnitTurn()

    expect(next).toBeDefined()
    expect(next.id).not.toBe(current.id)
})

test('nextUnitTurn wraps around to first combatant', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)

    combat.startCombat([hero, enemy])

    combat.nextUnitTurn()
    const next = combat.nextUnitTurn()

    expect(next.id).toBe(hero.id)
})

test('nextUnitTurn skips dead combatants', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy1 = new Combatant({ ...validEnemy, id: 2, speed: 12 })
    const enemy2 = new Combatant({ ...validEnemy, id: 3, speed: 8 })

    combat.startCombat([hero, enemy1, enemy2])

    combat.nextUnitTurn()
    enemy1.isAlive = false

    const next = combat.nextUnitTurn()

    expect(next.id).toBe(enemy2.id)
})

test('nextUnitTurn resets defending state for next combatant', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)

    combat.startCombat([hero, enemy])

    enemy.isDefending = true

    const next = combat.nextUnitTurn()

    expect(next.id).toBe(enemy.id)
    expect(enemy.isDefending).toBe(false)
})

test('checkBattleEnd returns false when multiple teams alive', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)

    combat.startCombat([hero, enemy])

    const isOver = combat.checkBattleEnd()

    expect(isOver).toBe(false)
})

test('checkBattleEnd returns true when one team remains', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)

    combat.startCombat([hero, enemy])
    enemy.isAlive = false

    const isOver = combat.checkBattleEnd()

    expect(isOver).toBe(true)
})

test('checkBattleEnd sets winner when battle ends', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)

    combat.startCombat([hero, enemy])
    enemy.isAlive = false

    combat.checkBattleEnd()
    const winner = combat.getWinner()

    expect(winner).toBe('player')
})

test('checkBattleEnd sets isActive to false when battle ends', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)

    combat.startCombat([hero, enemy])
    enemy.isAlive = false

    combat.checkBattleEnd()
    const state = combat.getState()

    expect(state.isActive).toBe(false)
})

test('checkBattleEnd sets winner to none when all dead', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)

    combat.startCombat([hero, enemy])
    hero.isAlive = false
    enemy.isAlive = false

    combat.checkBattleEnd()
    const winner = combat.getWinner()

    expect(winner).toBe('none')
})

test('getState returns current combat state', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)

    combat.startCombat([hero, enemy])
    const state = combat.getState()

    expect(state).toHaveProperty('combatants')
    expect(state).toHaveProperty('currentCombatant')
    expect(state).toHaveProperty('isActive')
})

test('getState returns copy of combatants array', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)

    combat.startCombat([hero, enemy])
    const state = combat.getState()

    expect(state.combatants).toHaveLength(2)
    expect(state.combatants[0]).toBe(hero)
})

test('getCombatLog returns array of log messages', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)

    combat.startCombat([hero, enemy])
    const log = combat.getCombatLog()

    expect(Array.isArray(log)).toBe(true)
    expect(log.length).toBeGreaterThan(0)
})

test('Full combat simulation from start to end', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant({ ...validEnemy, maxHealth: 10 })
    const action = new CombatAction(validAction)

    combat.startCombat([hero, enemy])

    expect(combat.getState().isActive).toBe(true)

    combat.executeAttack(enemy.id, action)

    expect(enemy.currentHealth).toBeLessThan(10)

    combat.nextUnitTurn()
    combat.executeAttack(hero.id, action)

    const isOver = combat.checkBattleEnd()

    if (isOver) {
        expect(combat.getState().isActive).toBe(false)
        expect(combat.getWinner()).toBeDefined()
    }
})

test('Combat handles defending correctly throughout battle', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)
    const action = new CombatAction(validAction)

    combat.startCombat([hero, enemy])

    combat.executeDefend(hero.id)
    expect(hero.isDefending).toBe(true)

    combat.nextUnitTurn()
    combat.executeAttack(hero.id, action)

    expect(hero.isDefending).toBe(true)

    combat.nextUnitTurn()
    expect(hero.isDefending).toBe(false)
})
