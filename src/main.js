const utils = require('utils');
const roles = require('roles');
const actions = require('actions');

const populate = (room) => {
    for(const i in roles) {
        const role = roles[i];
        if(utils.countRole(room, role.title) < role.count) {
            utils.getStructures(room, STRUCTURE_SPAWN)[0].createCreep(
                role.body,
                undefined,
                {role: role.title}
            );
        }
    }
}

const runCreep = (creep) => {
    if(creep.memory.role == 'attacker') {
        creep.memory.role = 'fighter';
    }

    if(creep.memory.gettingEnergy) {
        actions.getEnergy(creep);
    } else {
        roles[creep.memory.role].run(creep);
    }
    actions.updateState(creep);
}

const runRoom = (room) => {
    room.find(FIND_CREEPS).map((creep) => runCreep(creep));
}

module.exports.loop = () => {
    for(const i in Game.rooms) {
        const room = Game.rooms[i];
        populate(room);
        runRoom(room);
    }
}