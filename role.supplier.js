const utils = require("utils");

const roleSupplier = {
    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.supplying && creep.carry.energy == 0) {
            creep.memory.supplying = false;
            creep.say("get energy");
        }
        if(!creep.memory.supplying && creep.carry.energy == creep.carryCapacity) {
            creep.memory.supplying = true;
            creep.say("supplying");
        }
        
        if(creep.memory.supplying) {
            creep.moveTo(Game.spawns["Spawn1"]);
            creep.transfer(Game.spawns["Spawn1"], RESOURCE_ENERGY);
        }
        else {
            const containers = utils.getContainers(creep.room);
            if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containers[0]);
            }
        }
    }
}

module.exports = roleSupplier;