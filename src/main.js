const utils = require('utils');
const roles = require('roles');
const controls = require('creepControls');
const structureTower = require('structure.tower');

function deleteDeadCreeps() {
    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
}

function populate() {
    for(const role in roles) {
        if(utils.countCreepsWithRole(role) < roles[role].count) {
            Game.spawns["Spawn1"].createCreep(
                roles[role].body,
                undefined,
                { role: roles[role].title }
            );
        }
    }
}

function runTowersInRoom(target_room) {
    const towers = utils.findTowers(target_room);
    for(const tower in towers) {
        structureTower.run(towers[tower]);
    }
}

function runCreep(creep) {
    if(creep.memory.gettingEnergy) {
        controls.getEnergy(creep);
    } else {
        roles[creep.memory.role].run(creep);
    }
    controls.updateGettingEnergyState(creep);
}

function runTowers() {
    for(const room in Game.rooms) {
        runTowersInRoom(Game.rooms[room]);
    }
}

function runCreeps() {
    for(const creep in Game.creeps) {
        runCreep(Game.creeps[creep])
    }
}

module.exports.loop = function() {
    deleteDeadCreeps();
    populate();
    runTowers();
    runCreeps();
}