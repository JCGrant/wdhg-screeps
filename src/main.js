const roleHarvester = require('role.harvester');
const roleUpgrader = require("role.upgrader");
const roleBuilder = require("role.builder");
const roleSupplier = require("role.supplier");

function deleteDeadCreeps() {
    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
}

function autoSpawn(role, count, body=[ WORK, CARRY, MOVE ]) {
    // Get count of creeps with role
    const creeps = _.filter(Game.creeps,
        (creep) => creep.memory.role == role);
    if (creeps.length < count) {
        Game.spawns['Spawn1'].createCreep(
            body,
            undefined,
            { role: role}
    )};
}

function populate() {
    autoSpawn('harvester', 3, body=[ WORK, WORK, WORK, WORK, MOVE ]);
    autoSpawn('supplier', 2, body=[WORK, CARRY, CARRY, MOVE, MOVE]);
    autoSpawn('upgrader', 4, body=[WORK, WORK, CARRY, CARRY, MOVE, MOVE]);
    autoSpawn('builder', 4, body=[WORK, WORK, CARRY, CARRY, MOVE]);
}

function runCreeps() {
    for(const name in Game.creeps) {
        const creep = Game.creeps[name];
        
        if(creep.memory.role == "harvester") {
            roleHarvester.run(creep);
        }
        else if(creep.memory.role == "upgrader") {
            roleUpgrader.run(creep);
        }
        else if(creep.memory.role == "builder") {
            roleBuilder.run(creep);
        }
        else if(creep.memory.role == "supplier") {
            roleSupplier.run(creep);
        }
    }
}

module.exports.loop = function () {
    deleteDeadCreeps();
    populate();
    runCreeps();
}