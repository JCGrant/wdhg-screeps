function run(creep) {
    const target = creep.room.find(FIND_CONSTRUCTION_SITES)[0];
    if(creep.build(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    }
}

module.exports = {
    run,
}