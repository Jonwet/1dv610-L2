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

        if (typeof unit.maxHealth !== 'number' || unit.maxHealth <= 0) {
            throw new Error('Combatant maxHealth must be a positive number')
        }

        if (typeof unit.attackPower !== 'number' || unit.attackPower <= 0) {
            throw new Error('Combatant attackPower must be a positive number')
        }

        if (typeof unit.defense !== 'number' || unit.defense < 0) {
            throw new Error('Combatant defense must be a non-negative number')
        }

        if (typeof unit.speed !== 'number' || unit.speed <= 0) {
            throw new Error('Combatant speed must be a positive number')
        }

        this.id = unit.id
        this.name = unit.name
        this.team = unit.team

        this.maxHealth = unit.maxHealth
        this.currentHealth = unit.currentHealth || unit.maxHealth
        this.attackPower = unit.attackPower
        this.defense = unit.defense
        this.speed = unit.speed

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
        const defenseDamageReduction = 0.5
        if (this.isDefending) {
            amount = Math.floor(amount * defenseDamageReduction)
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
