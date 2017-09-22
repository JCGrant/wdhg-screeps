const utils = require('utils');
const filtersStructures = require('filters.structures');

function onContainer(creep) {
    return _.some(
        creep.pos.look(),
        { type: 'structure', structure: { structureType: STRUCTURE_CONTAINER }}
    );
}

function containerAvailable(container) {
    return container.structureType == STRUCTURE_CONTAINER &&
        !utils.containsObject(container.pos, { type: 'creep' });
}

function moveToContainer(creep) {
    const container = creep.pos.findClosestByPath(
        FIND_STRUCTURES,
        { filter: containerAvailable }
    );
    creep.moveTo(container);
}

function containerNotFull(creep) {
    return creep.pos.findClosestByRange(
        creep.room.find(FIND_STRUCTURES, { filter: filtersStructures.CONTAINER })
    ).store[RESOURCE_ENERGY] < CONTAINER_CAPACITY;
}

function run(creep) {
    if(onContainer(creep) && containerNotFull(creep)) {
        creep.harvest(creep.pos.findClosestByRange(FIND_SOURCES));
    } else {
        moveToContainer(creep);
    }
}

module.exports = {
    run,
}