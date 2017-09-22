module.exports = {
    'harvester': {
        title: 'harvester',
        run: require('role.harvester').run,
        body: [ WORK, WORK, WORK, WORK, MOVE ],
        count: 1,
    },
    'upgrader': {
        title: 'upgrader',
        run: require('role.upgrader').run,
        body: [ WORK, CARRY, CARRY, CARRY, MOVE ],
        count: 1,
    },
    'supplier': {
        title: 'supplier',
        run: require('role.supplier').run,
        body: [ WORK, CARRY, CARRY, CARRY, MOVE, MOVE ],
        count: 1,
    },
    'builder': {
        title: 'builder',
        run: require('role.builder').run,
        body: [ WORK, WORK, CARRY, CARRY, MOVE ],
        count: 0,
    },
    'cleaner': {
        title: 'cleaner',
        run: require('role.cleaner').run,
        body: [ WORK, CARRY, CARRY, MOVE ],
        count: 0,
    },
}