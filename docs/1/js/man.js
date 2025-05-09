class Man {
    constructor(user=false, name='名') {
        this._user = user; // user/auto
        this._name = name; // 名前
        this._life = 10; // 命（生命点）
        this._act = 3; // 活（活動点）
        this._cap = 3; // 容（容量点）
        this._hand = -1; // 次に使う手札
        this._hands = []; // 手札
        this._deck = []; // 組、冊
        this._buttons = [];
    }
    get life() {return this._life}
    set life(v) {this._life = v; if(this._life<0){this._life=0};}
    get act() {return this._act}
    set act(v) {return this._act}
    get cap() {return this._cap}
    set cap(v) {this._cap = v; if(this._cap<1){this._cap=1};}
    get live() {return 0 < this._life }
    get hand() {return this._hand}
    get hands() {return this._hands}
    draw() {this._hands = [...Array(3)].map(()=>Card.generate());}
    async select() {return this._user ? this.#userSelect() : this.#autoSelect()}
    async #userSelect() {
        console.log('#userSelect()');
        this._buttons = this.hands.map(c=>c.button);
        return Promise.any([...Array(3)].map((_,i)=>Async.event(this._buttons[i], 'click')))
    }
    async #autoSelect() {
        console.log('#autoSelect()');
        for (let hand of this._hands) {
            if (hand.cost <= this._cap) {this._hand = hand.kind; Promise.resolve(this._hand);}
        }
        Promise.resolve(0);
    }
}
class AsyncEvent {
    static make(el, eventName) {
        const handler = {
            listener: null,
            emit(e) {if (this.listener) {this.listener(e)}},
            listen(fn) {this.listener = fn}
        }
        el.addEventListener(eventName, e => handler.emit(e));
        return () => new Promise((res, rej) => {
            handler.listen(e => {
                const P = parseInt(e.currentTarget.dataset.pos);
                res(P);
            })
        });
    }
}
