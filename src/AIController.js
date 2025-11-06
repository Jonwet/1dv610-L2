import battleHelper from './battleHelper.js'

export default class AIController {
    constructor(combatSystem, actions) {
        this.combatSystem = combatSystem
        this.actions = actions
        this.battleHelper = new battleHelper()
    }

    chooseAction(combatant) {
        const state = this.combatSystem.getState()

        const enemies = this.battleHelper.getOpponents(
            state.combatants,
            combatant,
        )

        return this.defaultAttack(enemies)
    }

    defaultAttack(enemies) {
        const aliveEnemies = enemies.filter((enemy) => enemy.isAlive)

        if (aliveEnemies.length === 0) {
            return null // null return for testing purposes
        }

        const target = aliveEnemies[0]
        const action = this.actions[0]
        return { action: action, target: target }
    }
}
