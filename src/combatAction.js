export default class combatAction {
    constructor(action) {
        this.id = action.id
        this.name = action.name
        this.type = action.type
        this.accuracy = action.accuracy || 0.95
    }
}
