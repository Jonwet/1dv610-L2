export default class Combatant {
    constructor(unit) {
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
        if (this.isDefending) {
            amount = Math.floor(amount * 0.5)
        }

        this.currentHealth = this.currentHealth - amount

        if (this.currentHealth <= 0) {
            this.die()
        }

        return amount
    }

    heal(amount) {
        const oldHealth = this.currentHealth
        this.currentHealth = Math.min(
            this.maxHealth,
            this.currentHealth + amount,
        )
        return this.currentHealth - oldHealth
    }

    die() {
        this.isAlive = false
    }
}
