const utils = require('utils');

module.exports = {
    getEnergy: function (creep) {
        // Get a non empty container with the least number of creeps near it
        const containers = utils.getStructuresNotEmpty(utils.findContainers(creep.room));
        let container = containers[0];
        for(const i in containers) {
            const other = containers[i];
            if(utils.countCreepsInArea(creep.room, other.pos.x, other.pos.y) < 
                utils.countCreepsInArea(creep.room, container.pos.x, container.pos.y)) {
                container = other;
            }
        }
        if(container && creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(container);
        }
    },
    updateGettingEnergyState: function (creep) {
        if(creep.memory.role == 'harvester') {
            return
        }
        if(creep.carry.energy == creep.carryCapacity) {
            creep.memory.gettingEnergy = false;
        } else if(creep.carry.energy <= 1) {
            creep.memory.gettingEnergy = true;
        }
    }
}