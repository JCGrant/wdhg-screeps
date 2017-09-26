const utils = {
    countRole: function(room, role) {
        return _.filter(room.find(FIND_CREEPS),
            (creep) => creep.memory.role == role).length;
    },
    isNotFull: function(structure) {
        if(structure.structureType == STRUCTURE_CONTAINER) {
            return structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
        }
        return structure.energy < structure.energyCapacity;
    },
    getStructures: function(room, structureFilter) {
        return _.filter(room.find(FIND_STRUCTURES), (structure) =>
            structure.structureType == structureFilter);
    },
    getNonFullStructures: function(room, structureFilter) {
        return _.filter(this.getStructures(room, structureFilter), (structure) =>
            this.isNotFull(structure));
    },
}

module.exports = utils;