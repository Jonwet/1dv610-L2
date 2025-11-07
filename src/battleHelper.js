export default class battleHelper {
    // Currently unused
    getAliveInTeam(combatants, team) {
        return combatants.filter((unit) => unit.team === team && unit.isAlive)
    }

    getOpponents(combatants, combatant) {
        return combatants.filter(
            (unit) => unit.team !== combatant.team && unit.isAlive,
        )
    }

    // Currently unused
    getAllies(combatants, combatant) {
        return combatants.filter(
            (unit) =>
                unit.team === combatant.team &&
                unit.id !== combatant.id &&
                unit.isAlive,
        )
    }
}
