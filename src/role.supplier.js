const utils = require("utils");

var harvest = false;

function getEnergy(creep) {
    if(creep.carry.energy == creep.carryCapacity) {
        creep.memory.supplying = true;
        creep.say("supplying");
    }
    else {
        const container = utils.getBestContainer(creep.room);
        if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(container);
        }
    }
}

function isExtension(structure) {
    return structure.structureType == STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity;
}

function getTarget(creep) {
    return creep.pos.findClosestByPath(
        FIND_STRUCTURES,
        { filter: isExtension }
    ) || Game.spawns["Spawn1"];
}

function supply(creep, target) {
    if(creep.carry.energy <= 1) {
        creep.memory.supplying = false;
        creep.say("get energy");
    }
    else if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    }
}

function run(creep) {
    if(creep.memory.supplying) {
        supply(creep, getTarget(creep));
    } else {
        getEnergy(creep);
    }
}

module.exports = {
    run
};