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
//    get enough(v) {return v <= this._act }
    //get live(v) {return v <= this._life }
    get live() {return 0 < this._life }
    get hand() {return this._hand}
    get hands() {return this._hands}
    draw() {this._hands = [...Array(3)].map(()=>Card.generate());}
//    await select() {return this._user ? await this.#userSelect() : await this.#autoSelect()}
    async select() {return this._user ? await this.#userSelect() : await this.#autoSelect()}
    async #userSelect() {
        if (this._hands.every(h=>this._cap<h.cost)){this._hand = 0; Promise.resolve(0);}
        this._buttons = this.hands.map(c=>c.button);
        for (let btn of this._buttons) {
            btn.addEventListener('click', (e)=>{
                const K = parseInt(e.target.dataset.id);
                if (this.act <= Cards[K].cost) {this._hand = K; Promise.resolve(K);}
            });
        }
    }
    async #autoSelect() {
        for (let hand of this._hands) {
            if (hand.cost <= this._cap) {this._hand = K; Promise.resolve(K);}
        }
        Promise.resolve(0);
    }
}

