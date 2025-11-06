export default class combatSystem {
    constructor() {
        this.combatants = []
        this.turnOrder = []
        this.currentTurnIndex = 0
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

    getCurrentCombatant() {
        return this.turnOrder[this.currentTurnIndex]
    }

    calculateDamage(attacker, target) {
        const damage = attacker.attackPower - Math.floor(target.defense / 2)
        return Math.max(1, damage)
    }

    checkHit(target, action) {
        const hitChance = action.accuracy

        if (target.isDefending) {
            hitChance = hitChance * 0.7
        }

        return Math.random() < hitChance
    }

    executeAttack(targetId, action) {
        const attacker = this.getCurrentCombatant()
        const target = this.combatants.find(combatant => combatant.id === targetId)

        if (!this.checkHit(target, action)) {
            return {success: true, missed: true}
        }

        const damage = this.calculateDamage(attacker, target)
        target.takeDamage(damage)


        if (!target.isAlive) {
            // Target defeated message or something
        }

        //Placeholder name
        const result = {success: true, damage: damage, targetDefeated: !target.isAlive}

        return result
    }
}
