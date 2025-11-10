# Simple Combat Engine
A turn-based combat module for Javascript.

School project for the course 1dv610

## Installation
- Clone the repo
- Navigate to where you cloned the module
- Run npm install

## Example use
``` javascript
import Combatant from './Combatant.js'
import CombatSystem from './CombatSystem.js'
import CombatAction from './CombatAction.js'
import AIController from './AIController.js'

// Define combat actions
const basicAttack = new CombatAction({
    name: 'Basic Attack',
    accuracy: 0.9
})

// Create combatants
const hero = new Combatant({
    id: 1,
    name: 'Hero',
    team: 'player',
    maxHealth: 100,
    attackPower: 25,
    defense: 10,
    speed: 15
})

const enemy = new Combatant({
    id: 2,
    name: 'Goblin',
    team: 'enemy',
    maxHealth: 50,
    attackPower: 15,
    defense: 5,
    speed: 10
})

// Initialize combat
const combat = new CombatSystem()
combat.startCombat([hero, enemy])
```

## License
This project is licensed under the MIT License
