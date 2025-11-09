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
