import CombatAction from '../src/CombatAction.js'

const validAction = {
    name: 'Basic Attack',
    accuracy: 0.95,
}

test('CombatAction is created with valid action object', () => {
    const action = new CombatAction(validAction)

    expect(action.name).toBe('Basic Attack')
    expect(action.accuracy).toBe(0.95)
})

test('CombatAction accepts accuracy of 0', () => {
    const action = new CombatAction({ name: 'Miss', accuracy: 0 })

    expect(action.accuracy).toBe(0)
})

test('CombatAction accepts accuracy of 1', () => {
    const action = new CombatAction({ name: 'Perfect Attack', accuracy: 1 })

    expect(action.accuracy).toBe(1)
})

test('CombatAction accepts accuracy between 0 and 1', () => {
    const action = new CombatAction({ name: 'Medium Attack', accuracy: 0.5 })

    expect(action.accuracy).toBe(0.5)
})

test('CombatAction throws error if action is not provided', () => {
    expect(() => new CombatAction()).toThrow('action must be an object')
    expect(() => new CombatAction(null)).toThrow('action must be an object')
    expect(() => new CombatAction(undefined)).toThrow(
        'action must be an object',
    )
})

test('CombatAction throws error if action is not an object', () => {
    expect(() => new CombatAction('attack')).toThrow('action must be an object')
    expect(() => new CombatAction(123)).toThrow('action must be an object')
    expect(() => new CombatAction(true)).toThrow('action must be an object')
})

test('CombatAction throws error if name is missing', () => {
    const actionWithoutName = { accuracy: 0.95 }

    expect(() => new CombatAction(actionWithoutName)).toThrow(
        'action name must be a non-empty string',
    )
})

test('CombatAction throws error if name is not a string', () => {
    expect(() => new CombatAction({ name: 123, accuracy: 0.95 })).toThrow(
        'action name must be a non-empty string',
    )
    expect(() => new CombatAction({ name: true, accuracy: 0.95 })).toThrow(
        'action name must be a non-empty string',
    )
    expect(() => new CombatAction({ name: {}, accuracy: 0.95 })).toThrow(
        'action name must be a non-empty string',
    )
})

test('CombatAction throws error if name is empty string', () => {
    expect(() => new CombatAction({ name: '', accuracy: 0.95 })).toThrow(
        'action name must be a non-empty string',
    )
})

test('CombatAction throws error if accuracy is missing', () => {
    const actionWithoutAccuracy = { name: 'Attack' }

    expect(() => new CombatAction(actionWithoutAccuracy)).toThrow(
        'action accuracy must be a number',
    )
})

test('CombatAction throws error if accuracy is not a number', () => {
    expect(
        () => new CombatAction({ name: 'Attack', accuracy: '0.95' }),
    ).toThrow('action accuracy must be a number')
    expect(() => new CombatAction({ name: 'Attack', accuracy: true })).toThrow(
        'action accuracy must be a number',
    )
    expect(() => new CombatAction({ name: 'Attack', accuracy: null })).toThrow(
        'action accuracy must be a number',
    )
    expect(
        () => new CombatAction({ name: 'Attack', accuracy: undefined }),
    ).toThrow('action accuracy must be a number')
    expect(() => new CombatAction({ name: 'Attack', accuracy: {} })).toThrow(
        'action accuracy must be a number',
    )
})

test('CombatAction throws error if accuracy is NaN', () => {
    expect(() => new CombatAction({ name: 'Attack', accuracy: NaN })).toThrow(
        'action accuracy must be a number',
    )
})

test('CombatAction throws error if accuracy is less than 0', () => {
    expect(() => new CombatAction({ name: 'Attack', accuracy: -1 })).toThrow(
        'action accuracy must be between 0 and 1',
    )
})

test('CombatAction throws error if accuracy is greater than 1', () => {
    expect(() => new CombatAction({ name: 'Attack', accuracy: 2 })).toThrow(
        'action accuracy must be between 0 and 1',
    )
})
