export default class AIController {
    #combatSystem
    #actions

    constructor(combatSystem, actions) {
        this.#combatSystem = combatSystem
        this.#actions = actions
    }

    chooseAction(combatant) {
        const state = this.#combatSystem.getState()

        const enemies = this.#getOpponents(state.combatants, combatant)

        return this.#defaultAttack(enemies)
    }

    #getOpponents(combatants, combatant) {
        return combatants.filter(
            (unit) => unit.team !== combatant.team && unit.isAlive,
        )
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
