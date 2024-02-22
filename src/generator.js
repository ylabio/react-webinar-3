export class Generator {
    constructor(initCode = 0) {
        this.code = initCode;
    }

    generateNextCode() {
        return this.code++;
    }
}