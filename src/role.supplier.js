const utils = require('utils');

function getTower(creep) {
    const towers = utils.getStructuresNotFull(utils.findTowers(creep.room));
    return creep.pos.findClosestByPath(towers);
}

function getExtension(creep) {
    const extensions = utils.getStructuresNotFull(utils.findExtensions(creep.room));
    return creep.pos.findClosestByPath(extensions);
}

function getSpawn(creep) {
    return utils.findSpawn(creep.room)[0];
}

function getTarget(creep) {
    return getExtension(creep) || getTower(creep) || getSpawn(creep);
}

function run(creep) {
    const target = getTarget(creep);
    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    }
}

module.exports = {
    run,
}