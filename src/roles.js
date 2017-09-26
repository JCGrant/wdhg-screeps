const actions = require('actions');

module.exports = {
    'upgrader': {
        run: actions.upgrade,
        title: 'upgrader',
        body: [WORK, WORK, CARRY, MOVE],
        count: 2,
    },
    'builder': {
        run: actions.build,
        title: 'builder',
        body: [WORK, WORK, WORK, CARRY, CARRY, MOVE],
        count: 0,
    },
    'supplier': {
        run: actions.supply,
        title: 'supplier',
        body: [WORK, CARRY, MOVE],
        count: 1,
    },
    'fighter': {
        run: actions.attack,
        title: 'fighter',
        body: [ATTACK, ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE],
        count: 0,
    },
}