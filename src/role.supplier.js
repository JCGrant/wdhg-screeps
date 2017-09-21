const utils = require("utils");

var harvest = true;

const roleSupplier = {
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
            const sources = creep.room.find(FIND_SOURCES);

            if(harvest && PathFinder.search(creep.pos, sources[0])) {
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {
                const containers = utils.getContainers(creep.room);
                if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0]);
                }
            }
        }
    }
}

module.exports = roleSupplier;