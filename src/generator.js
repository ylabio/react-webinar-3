export let generatorId = getId();

function* getId() {
    for (let id = 8; id < 1e6; id++) {
        yield id;
    }
}