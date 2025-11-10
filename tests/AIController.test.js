import AIController from '../src/AIController.js'
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
    accuracy: 0.95,
}

test('AIController is created with valid combatSystem and actions', () => {
    const combat = new CombatSystem()
    const actions = [new CombatAction(validAction)]
    const ai = new AIController(combat, actions)

    expect(ai).toBeDefined()
})

test('AIController throws error if combatSystem is not provided', () => {
    const actions = [new CombatAction(validAction)]

    expect(() => new AIController(undefined, actions)).toThrow(
        'combatSystem is required',
    )
    expect(() => new AIController(null, actions)).toThrow(
        'combatSystem is required',
    )
})

test('AIController throws error if actions is not provided', () => {
    const combat = new CombatSystem()

    expect(() => new AIController(combat, undefined)).toThrow(
        'actions are required',
    )
    expect(() => new AIController(combat, null)).toThrow('actions are required')
})

test('AIController throws error if actions is not an array', () => {
    const combat = new CombatSystem()

    expect(() => new AIController(combat, 'attack')).toThrow(
        'actions must be an array',
    )
    expect(() => new AIController(combat, 123)).toThrow(
        'actions must be an array',
    )
    expect(() => new AIController(combat, {})).toThrow(
        'actions must be an array',
    )
})

test('AIController throws error if actions array is empty', () => {
    const combat = new CombatSystem()

    expect(() => new AIController(combat, [])).toThrow(
        'actions array cannot be empty',
    )
})

test('chooseAction returns action and target for valid combatant', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)
    const actions = [new CombatAction(validAction)]

    combat.startCombat([hero, enemy])
    const ai = new AIController(combat, actions)

    const decision = ai.chooseAction(enemy)

    expect(decision).toBeDefined()
    expect(decision.action).toBeDefined()
    expect(decision.target).toBeDefined()
    expect(decision.target.id).toBe(hero.id)
})

test('chooseAction selects first action from actions array', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)
    const action1 = new CombatAction(validAction)
    const action2 = new CombatAction({ name: 'Heavy Strike', accuracy: 0.8 })
    const actions = [action1, action2]

    combat.startCombat([hero, enemy])
    const ai = new AIController(combat, actions)

    const decision = ai.chooseAction(enemy)

    expect(decision.action).toBe(action1)
})

test('chooseAction selects first opponent as target', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy1 = new Combatant({ ...validEnemy, id: 2, name: 'Goblin 1' })
    const enemy2 = new Combatant({ ...validEnemy, id: 3, name: 'Goblin 2' })
    const actions = [new CombatAction(validAction)]

    combat.startCombat([enemy1, enemy2, hero])
    const ai = new AIController(combat, actions)

    const decision = ai.chooseAction(hero)

    expect(decision.target.id).toBe(enemy1.id)
})

test('chooseAction only targets alive opponents', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy1 = new Combatant({ ...validEnemy, id: 2, name: 'Goblin 1' })
    const enemy2 = new Combatant({ ...validEnemy, id: 3, name: 'Goblin 2' })
    const actions = [new CombatAction(validAction)]

    combat.startCombat([hero, enemy1, enemy2])
    enemy1.isAlive = false

    const ai = new AIController(combat, actions)
    const decision = ai.chooseAction(hero)

    expect(decision.target.id).toBe(enemy2.id)
})

test('chooseAction only targets opponents from different team', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const ally = new Combatant({ ...validHero, id: 2, name: 'Ally' })
    const enemy = new Combatant(validEnemy)
    const actions = [new CombatAction(validAction)]

    combat.startCombat([hero, ally, enemy])
    const ai = new AIController(combat, actions)

    const decision = ai.chooseAction(hero)

    expect(decision.target.id).toBe(enemy.id)
    expect(decision.target.team).not.toBe(hero.team)
})

test('chooseAction returns null when no enemies available', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)
    const actions = [new CombatAction(validAction)]

    combat.startCombat([hero, enemy])
    enemy.isAlive = false

    const ai = new AIController(combat, actions)
    const decision = ai.chooseAction(hero)

    expect(decision).toBeNull()
})

test('chooseAction throws error if combatant is not provided', () => {
    const combat = new CombatSystem()
    const actions = [new CombatAction(validAction)]
    const ai = new AIController(combat, actions)

    expect(() => ai.chooseAction()).toThrow('combatant is required')
    expect(() => ai.chooseAction(null)).toThrow('combatant is required')
    expect(() => ai.chooseAction(undefined)).toThrow('combatant is required')
})

test('AIController decision contains correct structure', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)
    const actions = [new CombatAction(validAction)]

    combat.startCombat([hero, enemy])
    const ai = new AIController(combat, actions)

    const decision = ai.chooseAction(enemy)

    expect(decision).toHaveProperty('action')
    expect(decision).toHaveProperty('target')
    expect(decision.action).toBeInstanceOf(CombatAction)
    expect(decision.target).toBeInstanceOf(Combatant)
})

test('AIController integrates with CombatSystem correctly', () => {
    const combat = new CombatSystem()
    const hero = new Combatant(validHero)
    const enemy = new Combatant(validEnemy)
    const actions = [new CombatAction(validAction)]

    combat.startCombat([hero, enemy])
    const ai = new AIController(combat, actions)

    const decision = ai.chooseAction(enemy)

    const damage = combat.executeAttack(decision.target.id, decision.action)

    expect(typeof damage).toBe('number')
    expect(damage).toBeGreaterThanOrEqual(0)
})
