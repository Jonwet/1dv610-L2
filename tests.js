import combatSystem from './src/combatSystem.js'
import combatant from './src/combatant.js'

const fast = new combatant({
    id: 1,
    name: 'fast',
    team: 'player',
    maxHealth: 100,
    currentHealth: 100,
    attackPower: 15,
    defense: 5,
    speed: 20 
})

const medium = new combatant({
    id: 2,
    name: 'medium',
    team: 'player',
    maxHealth: 100,
    currentHealth: 100,
    attackPower: 15,
    defense: 5,
    speed: 10
})

const slow = new combatant({
    id: 3,
    name: 'slow',
    team: 'enemy',
    maxHealth: 80,
    currentHealth: 80,
    attackPower: 20,
    defense: 8,
    speed: 5 
})

const combat = new combatSystem()

combat.startCombat([slow, medium, fast])

console.log('=== TURN ORDER TEST ===')
console.log('Expected order: fast (20) -> medium (10) -> slow (5)')
console.log('Actual order:')
combat.turnOrder.forEach((combatant) => {
    console.log(`${combatant.name} (speed: ${combatant.speed})`)
})