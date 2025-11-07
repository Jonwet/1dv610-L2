import battleHelper from './battleHelper.js'

export default class AIController {
    #combatSystem
    #actions
    #battleHelper

    constructor(combatSystem, actions) {
        this.#combatSystem = combatSystem
        this.#actions = actions
        this.#battleHelper = new battleHelper()
    }

    chooseAction(combatant) {
        const state = this.#combatSystem.getState()

        const enemies = this.#battleHelper.getOpponents(
            state.combatants,
            combatant,
        )

        return this.#defaultAttack(enemies)
    }

    #defaultAttack(enemies) {
        if (enemies.length === 0) {
            return null
        }

        const target = enemies[0]
        const action = this.#actions[0]
        return { action: action, target: target }
    }
}
