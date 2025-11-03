class Combatant {
    constructor(health, attackPower, defense, speed) {
        this.health = health
        this.attackPower = attackPower
        this.defense = defense
        this.speed = speed
    }

    takeDamage(amount) {
        this.health = this.health - amount
    }

    healUnit(amount) {
        this.health = this.health + amount
    }

    die() {
        this.health = 0
    }
}

const fighter = new Combatant(100, 20, 5, 10)
console.log(fighter.health)  // 100
fighter.takeDamage(30)
console.log(fighter.health)  // 70

fighter.healUnit(20)
console.log(fighter.health)  // 90

fighter.die()
console.log(fighter.health)  // 0