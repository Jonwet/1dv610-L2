export default class combatSystem {
    #combatants
    #turnOrder
    #currentTurnIndex
    #isActive
    #winner

    constructor() {
        this.#combatants = []
        this.#turnOrder = []
        this.#currentTurnIndex = 0
        this.#isActive = false
        this.#winner = null
    }

    startCombat(participants) {
        if (!Array.isArray(participants) || participants.length === 0) {
            throw new Error('participants must be a non-empty array')
        }

        this.#combatants = participants
        this.#calculateTurnOrder()
        this.#isActive = true
    }

    executeAttack(targetId, action) {
        const attacker = this.#getCurrentCombatant()
        const target = this.#findCombatantById(targetId)

        if (!attacker) {
            throw new Error('No combatant found for current turn')
        }

        if (!target) {
            throw new Error(`Target ${targetId} not found`)
        }

        if (!attacker.isAlive) {
            throw new Error(`${attacker.name} is dead`)
        }

        if (!target.isAlive) {
            throw new Error(`${target.name} is already dead`)
        }

        if (!this.#checkHit(action)) {
            return 0 // 0 Damage in case of a miss
        }

        const damage = this.#calculateDamage(attacker, target)
        target.takeDamage(damage)

        return damage
    }

    executeDefend(unitId) {
        const combatant = this.#findCombatantById(unitId)

        if (!combatant) {
            throw new Error(`Combatant ${unitId} not found`)
        }

        if (!combatant.isAlive) {
            throw new Error(`${combatant.name} is dead`)
        }

        combatant.isDefending = true

        return true
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

            this.#winner =
                aliveTeams.size === 1 ? Array.from(aliveTeams)[0] : 'none'
            return true
        }
        return false
    }

    getWinner() {
        return this.#winner
    }

    getState() {
        return {
            combatants: this.#combatants,
            currentCombatant: this.#getCurrentCombatant(),
            isActive: this.#isActive,
        }
    }

    #calculateTurnOrder() {
        const randomTiebreaker = 0.5
        this.#turnOrder = [...this.#combatants].sort((a, b) => {
            if (a.speed === b.speed) {
                return Math.random() - randomTiebreaker
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
        const defenseDamageReduction = 2
        const damage =
            attacker.attackPower -
            Math.floor(target.defense / defenseDamageReduction)
        return Math.max(1, damage)
    }
}
