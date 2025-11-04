export default class Combatant {
    constructor(unit) {
        this.id = unit.id
        this.name = unit.name
        this.team = unit.team

        // Unit stats
        this.maxHealth = unit.maxHealth
        this.currentHealth = unit.currentHealth
        this.attackPower = unit.attackPower
        this.defense = unit.defense
        this.speed = unit.speed

        // Unit status
        this.isAlive = true
    }

    takeDamage(amount) {
        this.currentHealth = this.currentHealth - amount

        if (this.currentHealth <= 0) {
            this.die()
        }

        return amount
    }

    heal(amount) {
        const oldHealth = this.currentHealth
        this.currentHealth = Math.min(this.maxHealth, this.currentHealth + amount)
        return this.currentHealth - oldHealth
    }

    die() {
        this.isAlive = false
    }
}
