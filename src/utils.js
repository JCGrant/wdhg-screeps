const filtersStructures = require('filters.structures');

const utils = {
    // Basic utilities
    countCreepsWithRole: function(role) {
        return _.filter(
            Game.creeps,
            (creep) => creep.memory.role == role
        ).length;
    },
    countCreepsInArea: function(target_room, x, y) {
        return target_room.lookForAtArea(LOOK_CREEPS, y - 1, x - 1, y + 1, x + 1, true).length;
    },
    containsObject: function(pos, object) {
        return _.some(pos.look(), object);
    },
    isWithdrawable(structure) {
        return structure.structureType == STRUCTURE_CONTAINER &&
            structure.store[RESOURCE_ENERGY] > 0;
    },
    // Get functions
    StructuresEmpty: function(structures) {
        let energy = (structure) => structure.energy == 0;
        if(structures[0].structureType == STRUCTURE_CONTAINER) {
            check = (structure) => structure.store[RESOURCE_ENERGY] == 0
        }
        return _.filter(structures, check);
    },
    getStructuresNotEmpty: function(structures) {
        let check = (structure) => structure.energy > 0;
        if(structures[0].structureType == STRUCTURE_CONTAINER) {
            check = (structure) => structure.store[RESOURCE_ENERGY] > 0
        }
        return _.filter(structures, check);
    },
    getStructuresNotFull: function(structures) {
        let check = (structure) => structure.energy < structure.energyCapacity;
        if(structures[0].structureType == STRUCTURE_CONTAINER) {
            check = (structure) => structure.store[RESOURCE_ENERGY] > structure.energyCapacity
        }
        return _.filter(structures, check);
    },
    getStructureWithFullness: function(structures, mostFull) {
        // Get the structure that is most full or least full
        let best = structures[0];
        for(const structure in structures) {
            if((mostFull && structure.energy > best.energy) ||
                structure.energy < best.energy) {
                best = structure
            }
        }
        return best;
    },
    getStructuresDamaged: function(structures) {
        return _.filter(
            structures,
            (structure) => structure.hits < structure.hitsMax
        );
    },
    // Find functions
    findStructures: function(target_room) {
        return target_room.find(FIND_STRUCTURES);
    },
    findExtensions: function(target_room) {
        return target_room.find(FIND_STRUCTURES, { filter: filtersStructures.EXTENSION });
    },
    findTowers: function(target_room) {
        return target_room.find(FIND_STRUCTURES, { filter: filtersStructures.TOWER });
    },
    findSpawn: function(target_room) {
        return target_room.find(FIND_STRUCTURES, { filter: filtersStructures.SPAWN });
    },
    findContainers: function(target_room) {
        return target_room.find(FIND_STRUCTURES, { filter: filtersStructures.CONTAINER });
    },
}

module.exports = utils;