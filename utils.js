const utils = {
    getContainers: function(target_room) {
        return target_room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});
    },
    
    getNonEmptyContainers: function(target_room) {
        return _.filter(
            this.getContainers(target_room),
            (container) => container.store[RESOURCE_ENERGY] > 0
        );
    },
    
    getHarvestingContainers: function(target_room) {
        /*
        const containers = this.getContainers(target_room);
        let valid_containers = [];

        for(int i = 0; i < containers.length; i++) {
            let x = containers[i].pos.x;
            let y = containers[i].pos.y;
            if(target_room.lookForAtArea(LOOK_SOURCES, y + 1, x - 1, y - 1, x + 1).length > 0 && 
                
            ) {
                
            }
        }
        */
        
    }
}

module.exports = utils
