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

    checkHit(action) {
        return Math.random() < action.accuracy
    }

    executeAttack(targetId, action) {
        const attacker = this.getCurrentCombatant()
        const target = this.combatants.find(
            (combatant) => combatant.id === targetId,
        )

        if (!this.checkHit(action)) {
            return { success: true, missed: true }
        }

        const damage = this.calculateDamage(attacker, target)
        target.takeDamage(damage)

        if (!target.isAlive) {
            // Target defeated message or something
        }

        //Placeholder name
        const result = {
            success: true,
            damage: damage,
            targetDefeated: !target.isAlive,
        }

        return result
    }

    executeDefend(unitId) {
        const combatant = this.combatants.find(
            (combatant) => combatant.id === unitId,
        )

        combatant.isDefending = true

        return { success: true }
    }

    nextUnitTurn() {
        for (let attempts = 0; attempts < this.turnOrder.length; attempts++) {
            this.currentTurnIndex++

            if (this.currentTurnIndex >= this.turnOrder.length) {
                this.currentTurnIndex = 0
            }

            const nextCombatant = this.getCurrentCombatant()
            if (nextCombatant && nextCombatant.isAlive) {
                nextCombatant.isDefending = false
                return nextCombatant
            }
        }
        return null
    }

    getState() {
        return {
            combatants: this.combatants,
            currentCombatant: this.getCurrentCombatant(),
        }
    }
}
