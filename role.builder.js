const utils = require("utils");

const harvest = true;

const roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // Is building and has run out of energy
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('get energy');
	    }
	    // Isn't building but has max energy
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('build');
	    }

	    if(creep.memory.building) {
	        const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            const sources = creep.room.find(FIND_SOURCES);

            if(harvest && PathFinder.search(creep.pos, sources[0])) {
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else {
                const containers = utils.getNonEmptyContainers(creep.room);
                if(storages.length > 0) {
                    if(creep.withdraw(storages[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storages[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
            }
	    }
	}
};

module.exports = roleBuilder;