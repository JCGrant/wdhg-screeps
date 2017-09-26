const utils = require('utils');

module.exports = {
    updateState: (creep) => {
        if(creep.memory.gettingEnergy && creep.carry.energy == creep.carryCapacity) {
            creep.memory.gettingEnergy = false;
        } else if(!creep.memory.gettingEnergy && creep.carry.energy <= 1) {
            creep.memory.gettingEnergy = true;
        }
    },
    getEnergy: (creep) => {
        //const source = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES));
        const source = creep.room.find(FIND_SOURCES)[0];
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, { visualizePathStyle: { stroke: '#ffff00' } });
        }
    },
    upgrade: (creep) => {
        if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ff0000' } });
        }
    },
    build: (creep) => {
        const target = creep.room.find(FIND_MY_CONSTRUCTION_SITES)[0];
        if(creep.build(target) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: { stroke: '#0000ff' } });
        }
    },
    supply: (creep) => {
        const target = utils.getNonFullStructures(creep.room, STRUCTURE_SPAWN)[0] ||
            utils.getNonFullStructures(creep.room, STRUCTURE_EXTENSION)[0];
        creep.moveTo(target, { visualizePathStyle: { stroke: '#00ff00' } });
        creep.transfer(target, RESOURCE_ENERGY);
    },
    attack: (creep) => {
        creep.moveTo(Game.flags['Enemy']);
    },
}