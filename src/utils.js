const filtersStructures = require('filters.structures');

const utils = {
    // Basic utilities
    countCreepsWithRole: function(role) {
        return _.filter(
            Game.creeps,
            (creep) => creep.memory.role == role
        ).length;
    },
    containsObject: function(pos, object) {
        return _.some(pos.look(), object);
    },
    isWithdrawable(structure) {
        return structure.structureType == STRUCTURE_CONTAINER &&
            structure.store[RESOURCE_ENERGY] > 0;
    },
    // Get functions
    getStructuresEmpty: function(structures) {
        return _.filter(
            structures,
            (structure) => structure.energy == 0
        );
    },
    getStructuresNotEmpty: function(structures) {
        return _.filter(
            structures,
            (structure) => structure.energy > 0
        );
    },
    getStructuresNotFull: function(structures) {
        return _.filter(
            structures,
            (structure) => structure.energy < structure.energyCapacity
        );
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
    // Find functions
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