import combatSystem from './src/combatSystem.js'
import combatant from './src/combatant.js'
import combatAction from './src/combatAction.js'

const fast = new combatant({
    id: 1,
    name: 'fast',
    team: 'player',
    maxHealth: 100,
    currentHealth: 100,
    attackPower: 15,
    defense: 5,
    speed: 20,
})

const medium = new combatant({
    id: 2,
    name: 'medium',
    team: 'player',
    maxHealth: 100,
    currentHealth: 100,
    attackPower: 15,
    defense: 5,
    speed: 10,
})

const slow = new combatant({
    id: 'slow',
    name: 'slow',
    team: 'enemy',
    maxHealth: 80,
    currentHealth: 80,
    attackPower: 20,
    defense: 8,
    speed: 5,
})

const basicAttack = new combatAction({
    id: 'basic',
    name: 'basic attack',
    type: 'attack',
    accuracy: 1.0,
    damageMultiplier: 1.0,
})

const combat = new combatSystem()

combat.startCombat([slow, medium, fast])

console.log('=== Test 1: Successful Attack ===')
const result1 = combat.executeAttack('slow', basicAttack)
console.log('Success:', result1.success ? '✅' : '❌')
console.log('Damage dealt:', result1.damage)
console.log('Slow HP:', slow.currentHealth)
console.log('')

console.log('=== TURN ORDER TEST ===')
console.log('Expected order: fast (20) -> medium (10) -> slow (5)')
console.log('Actual order:')
combat.turnOrder.forEach((combatant) => {
    console.log(`${combatant.name} (speed: ${combatant.speed})`)
})
