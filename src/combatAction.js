export default class CombatAction {
    constructor(action) {
        if (!action || typeof action !== 'object') {
            throw new Error('action must be an object')
        }
        if (
            !action.name ||
            typeof action.name !== 'string' ||
            action.name.trim() === ''
        ) {
            throw new Error('action name must be a non-empty string')
        }
        if (typeof action.accuracy !== 'number') {
            throw new Error('action accuracy must be a number')
        }
        if (!(action.accuracy >= 0 && action.accuracy <= 1)) {
            throw new Error('action accuracy must be between 0 and 1')
        }

        this.name = action.name
        this.accuracy = action.accuracy
    }
}
