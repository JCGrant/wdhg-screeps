const utils = require("utils");

function getHarvestContainer(creep) {
    return creep.pos.findClosestByPath(_.filter(
        utils.getContainers(creep.room),
        (container) => !utils.creepAt(creep.room, container.pos)
    ));
}

function moveToContainer(creep) {
    const nearestHarvestContainer = getHarvestContainer(creep);
    creep.moveTo(nearestHarvestContainer, {visualizePathStyle: {stroke: '#ffaa00'}});
}

function onContainer(creep) {
   return  _.some(creep.pos.look(), {
        type: 'structure',
        structure: {structureType: STRUCTURE_CONTAINER}
    });
}

function run(creep) {
    if(onContainer(creep)) {
        creep.harvest(creep.pos.findClosestByRange(FIND_SOURCES));
    }
    else {
        moveToContainer(creep);
    }
}

module.exports = {
    run
};