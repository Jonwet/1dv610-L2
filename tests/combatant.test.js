import Combatant from '../src/Combatant.js'

const validUnit = {
    id: 1,
    name: 'Test Warrior',
    team: 'TeamA',
    maxHealth: 100,
    attackPower: 20,
    defense: 10,
    speed: 15,
}

const unitWithoutId = {
    name: 'Test Warrior',
    team: 'TeamA',
    maxHealth: 100,
    attackPower: 20,
    defense: 10,
    speed: 15,
}

const unitWithoutName = {
    id: 1,
    team: 'TeamA',
    maxHealth: 100,
    attackPower: 20,
    defense: 10,
    speed: 15,
}

const unitWithoutTeam = {
    id: 1,
    name: 'Test Warrior',
    maxHealth: 100,
    attackPower: 20,
    defense: 10,
    speed: 15,
}

test('Combatant is created with valid unit object', () => {
    const combatant = new Combatant(validUnit)

    expect(combatant.id).toBe(1)
    expect(combatant.name).toBe('Test Warrior')
    expect(combatant.team).toBe('TeamA')
    expect(combatant.maxHealth).toBe(100)
    expect(combatant.currentHealth).toBe(100)
    expect(combatant.attackPower).toBe(20)
    expect(combatant.defense).toBe(10)
    expect(combatant.speed).toBe(15)
    expect(combatant.isAlive).toBe(true)
    expect(combatant.isDefending).toBe(false)
})

test('Combatant defaults currentHealth to maxHealth if not provided', () => {
    const combatant = new Combatant(validUnit)

    expect(combatant.currentHealth).toBe(combatant.maxHealth)
})

test('Combatant throws error if unit is not provided', () => {
    expect(() => new Combatant()).toThrow(
        'Unit object is required to create a combatant',
    )
    expect(() => new Combatant(null)).toThrow(
        'Unit object is required to create a combatant',
    )
})

test('Combatant throws error if id is missing', () => {
    expect(() => new Combatant(unitWithoutId)).toThrow(
        'Combatant must have an id',
    )
})

test('Combatant throws error if name is invalid', () => {
    expect(() => new Combatant(unitWithoutName)).toThrow(
        'Combatant name must be a non-empty string',
    )

    expect(() => new Combatant({ ...validUnit, name: 123 })).toThrow(
        'Combatant name must be a non-empty string',
    )

    expect(() => new Combatant({ ...validUnit, name: '' })).toThrow(
        'Combatant name must be a non-empty string',
    )

    expect(() => new Combatant({ ...validUnit, name: '   ' })).toThrow(
        'Combatant name must be a non-empty string',
    )
})

test('Combatant throws error if team is missing', () => {
    expect(() => new Combatant(unitWithoutTeam)).toThrow(
        'Combatants must belong to a team',
    )
})

test('Combatant throws error if maxHealth is invalid', () => {
    expect(() => new Combatant({ ...validUnit, maxHealth: '100' })).toThrow(
        'Combatant maxHealth must be a positive number',
    )

    expect(() => new Combatant({ ...validUnit, maxHealth: 0 })).toThrow(
        'Combatant maxHealth must be a positive number',
    )

    expect(() => new Combatant({ ...validUnit, maxHealth: -10 })).toThrow(
        'Combatant maxHealth must be a positive number',
    )
})

test('Combatant throws error if attackPower is invalid', () => {
    expect(() => new Combatant({ ...validUnit, attackPower: '20' })).toThrow(
        'Combatant attackPower must be a positive number',
    )

    expect(() => new Combatant({ ...validUnit, attackPower: 0 })).toThrow(
        'Combatant attackPower must be a positive number',
    )

    expect(() => new Combatant({ ...validUnit, attackPower: -5 })).toThrow(
        'Combatant attackPower must be a positive number',
    )
})

test('Combatant throws error if defense is invalid', () => {
    expect(() => new Combatant({ ...validUnit, defense: '10' })).toThrow(
        'Combatant defense must be a non-negative number',
    )

    expect(() => new Combatant({ ...validUnit, defense: -5 })).toThrow(
        'Combatant defense must be a non-negative number',
    )
})

test('Combatant allows defense to be zero', () => {
    expect(() => new Combatant({ ...validUnit, defense: 0 })).not.toThrow()
})

test('Combatant throws error if speed is invalid', () => {
    expect(() => new Combatant({ ...validUnit, speed: '15' })).toThrow(
        'Combatant speed must be a positive number',
    )

    expect(() => new Combatant({ ...validUnit, speed: 0 })).toThrow(
        'Combatant speed must be a positive number',
    )

    expect(() => new Combatant({ ...validUnit, speed: -5 })).toThrow(
        'Combatant speed must be a positive number',
    )
})

test('takeDamage reduces currentHealth by damage amount', () => {
    const combatant = new Combatant(validUnit)
    const damageDealt = combatant.takeDamage(30)

    expect(combatant.currentHealth).toBe(70)
    expect(damageDealt).toBe(30)
})

test('takeDamage keeps combatant alive if health remains above zero', () => {
    const combatant = new Combatant(validUnit)
    combatant.takeDamage(50)

    expect(combatant.isAlive).toBe(true)
    expect(combatant.currentHealth).toBe(50)
})

test('takeDamage handles multiple damage instances', () => {
    const combatant = new Combatant(validUnit)
    combatant.takeDamage(20)
    combatant.takeDamage(30)
    combatant.takeDamage(10)

    expect(combatant.currentHealth).toBe(40)
    expect(combatant.isAlive).toBe(true)
})

test('takeDamage reduces damage by 50% when defending', () => {
    const combatant = new Combatant(validUnit)
    combatant.isDefending = true
    const damageDealt = combatant.takeDamage(40)

    expect(damageDealt).toBe(20)
    expect(combatant.currentHealth).toBe(80)
})

test('takeDamage floors the damage reduction when defending', () => {
    const combatant = new Combatant(validUnit)
    combatant.isDefending = true
    const damageDealt = combatant.takeDamage(35)

    expect(damageDealt).toBe(17)
    expect(combatant.currentHealth).toBe(83)
})

test('takeDamage does not reduce damage when not defending', () => {
    const combatant = new Combatant(validUnit)
    combatant.isDefending = false
    const damageDealt = combatant.takeDamage(40)

    expect(damageDealt).toBe(40)
    expect(combatant.currentHealth).toBe(60)
})

test('takeDamage enforces minimum 1 damage when defending', () => {
    const combatant = new Combatant(validUnit)
    combatant.isDefending = true
    const damageDealt = combatant.takeDamage(1)

    expect(damageDealt).toBe(1)
    expect(combatant.currentHealth).toBe(99)
})

test('takeDamage sets isAlive to false when health reaches zero', () => {
    const combatant = new Combatant(validUnit)
    combatant.takeDamage(100)

    expect(combatant.currentHealth).toBe(0)
    expect(combatant.isAlive).toBe(false)
})

test('takeDamage sets isAlive to false when health goes below zero', () => {
    const combatant = new Combatant(validUnit)
    combatant.takeDamage(150)

    expect(combatant.currentHealth).toBe(-50)
    expect(combatant.isAlive).toBe(false)
})

test('takeDamage allows combatant to remain dead after multiple calls', () => {
    const combatant = new Combatant(validUnit)
    combatant.takeDamage(100)
    expect(combatant.isAlive).toBe(false)

    combatant.takeDamage(10)
    expect(combatant.isAlive).toBe(false)
    expect(combatant.currentHealth).toBe(-10)
})

test('takeDamage throws error for invalid amount types', () => {
    const combatant = new Combatant(validUnit)

    expect(() => combatant.takeDamage('30')).toThrow('amount must be a number')
    expect(() => combatant.takeDamage(null)).toThrow('amount must be a number')
    expect(() => combatant.takeDamage(undefined)).toThrow(
        'amount must be a number',
    )
    expect(() => combatant.takeDamage({})).toThrow('amount must be a number')
    expect(() => combatant.takeDamage([10])).toThrow('amount must be a number')
    expect(() => combatant.takeDamage(NaN)).toThrow('amount must be a number')
})

test('takeDamage throws error for zero or negative amounts', () => {
    const combatant = new Combatant(validUnit)

    expect(() => combatant.takeDamage(0)).toThrow(
        'amount must be greater than 0',
    )
    expect(() => combatant.takeDamage(-10)).toThrow(
        'amount must be greater than 0',
    )
})
