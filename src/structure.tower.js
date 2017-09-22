const utils = require('utils');

function repair(tower) {
    const structures = utils.getStructuresDamaged(utils.findStructures(tower.room));
    tower.repair(structures[0]);
}

function run(tower) {
    repair(tower);
}

module.exports = {
    run,
}