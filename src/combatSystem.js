export default class combatSystem {
    #combatants
    #turnOrder
    #currentTurnIndex
    #isActive

    constructor() {
        this.#combatants = []
        this.#turnOrder = []
        this.#currentTurnIndex = 0
        this.#isActive = false
    }

    startCombat(participants) {
        this.#combatants = participants
        this.#calculateTurnOrder()
        this.#isActive = true
    }

    executeAttack(targetId, action) {
        const attacker = this.#getCurrentCombatant()
        const target = this.#findCombatantById(targetId)

        if (!this.#checkHit(action)) {
            return { success: true, missed: true }
        }

        const damage = this.#calculateDamage(attacker, target)
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
        const combatant = this.#findCombatantById(unitId)

        combatant.isDefending = true

        return { success: true }
    }

    nextUnitTurn() {
        for (let attempts = 0; attempts < this.#turnOrder.length; attempts++) {
            this.#currentTurnIndex++

            if (this.#currentTurnIndex >= this.#turnOrder.length) {
                this.#currentTurnIndex = 0
            }

            const nextCombatant = this.#getCurrentCombatant()
            if (nextCombatant && nextCombatant.isAlive) {
                nextCombatant.isDefending = false
                return nextCombatant
            }
        }
        return null
    }

    checkBattleEnd() {
        const aliveTeams = new Set()
        for (const combatant of this.#combatants) {
            if (combatant.isAlive) {
                aliveTeams.add(combatant.team)
            }
        }
        if (aliveTeams.size <= 1) {
            this.#isActive = false

            const winner =
                aliveTeams.size === 1 ? Array.from(aliveTeams)[0] : 'none'
            return {
                isOver: true,
                winner: winner,
            }
        }
        return { isOver: false }
    }

    getState() {
        return {
            combatants: this.#combatants,
            currentCombatant: this.#getCurrentCombatant(),
            isActive: this.#isActive,
        }
    }

    #calculateTurnOrder() {
        this.#turnOrder = [...this.#combatants].sort((a, b) => {
            if (a.speed === b.speed) {
                return Math.random() - 0.5
            }
            return b.speed - a.speed
        })
    }

    #getCurrentCombatant() {
        return this.#turnOrder[this.#currentTurnIndex]
    }

    #findCombatantById(id) {
        return this.#combatants.find((combatant) => combatant.id === id)
    }

    #checkHit(action) {
        return Math.random() < action.accuracy
    }

    #calculateDamage(attacker, target) {
        const damage = attacker.attackPower - Math.floor(target.defense / 2)
        return Math.max(1, damage)
    }
}
