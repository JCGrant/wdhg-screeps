function getContainers(target_room) {
    return target_room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});
};

function getNonEmptyContainers(target_room) {
    return _.filter(
        getContainers(target_room),
        (container) => container.store[RESOURCE_ENERGY] > 0
    );
};

function getBestContainer(target_room) {
    const containers = getNonEmptyContainers(target_room);
    let best = containers[0];
    for(let i = 0; i < containers.length; i++) {
        if(containers[i].energy > best.energy) {
            best = containers[i];
        }
    }
    return best;
}

function creepAt(target_room, pos) {
    return _.some(pos.look(), { type: 'creep'});
}

module.exports = {
    getContainers,
    getNonEmptyContainers,
    getBestContainer,
    creepAt
};