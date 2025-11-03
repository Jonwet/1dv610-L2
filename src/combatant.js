class Combatant {
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

// Tests
const fighter = new Combatant({
    id: 1,
    name: 'Warrior',
    team: 'A',
    maxHealth: 100,
    currentHealth: 100,
    attackPower: 20,
    defense: 5,
    speed: 10
})
console.log(fighter.isAlive)  // true
console.log(fighter.id)  // 1
console.log(fighter.name)  // 'Warrior'
console.log(fighter.team)  // 'A'
console.log(fighter.attackPower)  // 20
console.log(fighter.defense)  // 5
console.log(fighter.speed)  // 10
console.log(fighter.currentHealth)  // 100
fighter.takeDamage(30)
console.log(fighter.currentHealth)  // 70

fighter.healUnit(20)
console.log(fighter.currentHealth)  // 90

fighter.die()
console.log(fighter.isAlive)  // false