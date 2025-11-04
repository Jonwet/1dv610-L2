export default class combatSystem {
    constructor() {
        this.combatants = []
        this.turnOrder = []
    }

    startCombat(participants) {
        this.combatants = participants
        this.calculateTurnOrder()
    }

    calculateTurnOrder() {
        this.turnOrder = [...this.combatants].sort((a, b) => {
            if (a.speed === b.speed) {
                return Math.random() - 0.5
            }
            return b.speed - a.speed
        })
    }

    calculateDamage(attacker, target) {
        const damage = attacker.attackPower - Math.floor(target.defense / 2)
        return Math.max(1, damage)
    }
}

