class Turn {
    constructor() {
        this._v = 0;
    }
    get v() {return this._v}
    run() {
        this._v++;
    }
}
