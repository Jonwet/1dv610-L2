export default class Combatant {
    constructor(unit) {
        if (!unit) {
            throw new Error('Unit object is required to create a combatant')
        }

        if (!unit.id) {
            throw new Error('Combatant must have an id')
        }

        if (
            !unit.name ||
            typeof unit.name !== 'string' ||
            unit.name.trim() === ''
        ) {
            throw new Error('Combatant name must be a non-empty string')
        }

        if (!unit.team) {
            throw new Error('Combatants must belong to a team')
        }

        this.id = unit.id
        this.name = unit.name
        this.team = unit.team

        this.maxHealth = unit.maxHealth || 100
        this.currentHealth = unit.currentHealth || this.maxHealth
        this.attackPower = unit.attackPower || 10
        this.defense = unit.defense || 5
        this.speed = unit.speed || 10

        this.isAlive = true
        this.isDefending = false
    }

    takeDamage(amount) {
        this.#validateAmountNumber(amount)

        if (amount <= 0) {
            throw new Error('amount must be greater than 0')
        }
        const adjustedAmount = this.#adjustDamage(amount)
        this.#applyDamage(adjustedAmount)

        if (this.currentHealth <= 0) {
            this.#die()
        }

        return adjustedAmount
    }

    #adjustDamage(amount) {
        this.#validateAmountNumber(amount)
        if (this.isDefending) {
            amount = Math.floor(amount * 0.5)
        }
        return amount
    }

    #applyDamage(amount) {
        this.#validateAmountNumber(amount)
        this.currentHealth = this.currentHealth - amount
    }

    #die() {
        this.isAlive = false
    }

    #validateAmountNumber(amount) {
        if (typeof amount !== 'number') {
            throw new Error('amount must be a number')
        }
    }
}
