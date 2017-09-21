const utils = require("utils");

const roleHarvester = {
    run: function(creep) {
        
        if(creep.memory.targetContainer) {
            console.log(creep.memory.targetContainer);
            const sources = creep.room.find(FIND_SOURCES);
            creep.moveTo(creep.memory.targetContainer);
            creep.harvest(sources[0]);
        }
	}
};

module.exports = roleHarvester;