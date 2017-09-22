const utils = require('utils');

module.exports = {
    getEnergy: function (creep) {
        const container = creep.pos.findClosestByRange(
            utils.findContainers(creep.room),
            { filter: utils.isWithdrawable }
        );
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