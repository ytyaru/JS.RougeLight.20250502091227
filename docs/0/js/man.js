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
//    async select() {return this._user ? await this.#userSelect() : await this.#autoSelect()}
    async select() {return this._user ? this.#userSelect() : this.#autoSelect()}
    async #userSelect() {
        console.log('#userSelect()');
        this._buttons = this.hands.map(c=>c.button);
        return Promise.any([...Array(3)].map((_,i)=>Async.event(this._buttons[i], 'click')))
        /*
        [...Array(3)].map((_,i)=>{
            Async.event(this._buttons[i], 'click');
            document.querySelector(`#h${i+1} button`).replaceWith(this._buttons[i]);
        });
        */
        /*
        if (this._hands.every(h=>this._cap<h.cost)){this._hand = 0; Promise.resolve(0);}
        this._buttons = this.hands.map(c=>c.button);
        //for (let btn of this._buttons) {
        for (let i=0; i<this._buttons.length; i++) {
            const btn = this._buttons[i];
            console.log(btn)
            btn.dataset.pos = i;
//            btn.dataset.kind = this.hands[i].kind;
            btn.addEventListener('click', (e)=>{
                console.log(e.currentTarget);
                //const K = parseInt(e.target.dataset.id);
                const P = parseInt(e.currentTarget.dataset.pos);
                //if (this.act <= Cards[K].cost) {this._hand = K; Promise.resolve(K);}
                console.log(e.currentTarget.dataset)
                console.log(e.currentTarget.dataset.pos)
                //if (this.hands[parseInt(e.currentTarget.dataset.pos)].cost <= this.act) {this._hand = K; Promise.resolve(K);}
                //if (this.hands[parseInt(e.currentTarget.dataset.pos)].cost <= this.act) {this._hand = K; Promise.resolve(K);}
                if (this.hands[P].cost <= this.act) {this._hand = this.hands[P].kind; Promise.resolve(this._hand);}
            });
        }
        [...Array(3)].map((_,i)=>document.querySelector(`#h${i+1} button`).replaceWith(this._buttons[i]))
//        [...Array(3)].map((_,i)=>document.querySelector(`#h${i+1} button`).replaceWith(this.hands[i].button))
//        document.querySelector('#h1 button').replaceWith(hero.hands[0].button);
//        document.querySelector('#h2 button').replaceWith(hero.hands[1].button);
//        document.querySelector('#h3 button').replaceWith(hero.hands[2].button);
        */
    }
    /*
    async #userSelect() {
        console.log('#userSelect()');
        if (this._hands.every(h=>this._cap<h.cost)){this._hand = 0; Promise.resolve(0);}
        this._buttons = this.hands.map(c=>c.button);
        //for (let btn of this._buttons) {
        for (let i=0; i<this._buttons.length; i++) {
            const btn = this._buttons[i];
            console.log(btn)
            btn.dataset.pos = i;
//            btn.dataset.kind = this.hands[i].kind;
            btn.addEventListener('click', (e)=>{
                console.log(e.currentTarget);
                //const K = parseInt(e.target.dataset.id);
                const P = parseInt(e.currentTarget.dataset.pos);
                //if (this.act <= Cards[K].cost) {this._hand = K; Promise.resolve(K);}
                console.log(e.currentTarget.dataset)
                console.log(e.currentTarget.dataset.pos)
                //if (this.hands[parseInt(e.currentTarget.dataset.pos)].cost <= this.act) {this._hand = K; Promise.resolve(K);}
                //if (this.hands[parseInt(e.currentTarget.dataset.pos)].cost <= this.act) {this._hand = K; Promise.resolve(K);}
                if (this.hands[P].cost <= this.act) {this._hand = this.hands[P].kind; Promise.resolve(this._hand);}
            });
        }
        [...Array(3)].map((_,i)=>document.querySelector(`#h${i+1} button`).replaceWith(this._buttons[i]))
//        [...Array(3)].map((_,i)=>document.querySelector(`#h${i+1} button`).replaceWith(this.hands[i].button))
//        document.querySelector('#h1 button').replaceWith(hero.hands[0].button);
//        document.querySelector('#h2 button').replaceWith(hero.hands[1].button);
//        document.querySelector('#h3 button').replaceWith(hero.hands[2].button);
    }
    */
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
        //return () => new Promise((res, rej) => {handler.listen(e => res(e))});
        return () => new Promise((res, rej) => {
            handler.listen(e => {
                const P = parseInt(e.currentTarget.dataset.pos);
                res(P);
//                if (this.hands[P].cost <= this.act) {this._hand = this.hands[P].kind; res(this._hand);}
                //if (this.hands[P].cost <= this.act) {this._hand = this.hands[P].kind; Promise.resolve(this._hand);}
            })
        });
    }
    /*
    const event = (el, eventName) => {
        const handler = {
            listener: null,
            emit(e) {if (this.listener) {this.listener(e)}},
            listen(fn) {this.listener = fn}
        }
        el.addEventListener(eventName, e => handler.emit(e));
        return () => new Promise((res, rej) => {handler.listen(e => res(e))});
    }
    */
}
