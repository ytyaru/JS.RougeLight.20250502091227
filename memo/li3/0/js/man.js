class RangeA {// 抽象型
    validType(v){throw new Error('未実装')}
    isNatural(v){throw new Error('未実装')}
    min(v){throw new Error('未実装')}
    max(v){throw new Error('未実装')}
    abs(v){throw new Error('未実装')}
}
class RangeR extends RangeA {// Number型の実数
    validType(v){return Number.isFinite(v)}
    isNatural(v){return Number.isInteger(v) && 1 <= v}
    min(...v){return Math.min(v)}
    max(...v){return Math.max(v)}
    abs(v){return Math.abs(v)}
}
class RangeI extends RangeR {// Number型の整数
    validType(v){return Number.isInteger(v)}
}
class RangeB extends RangeA {// BigInt型
    validType(v){return v instanceof BigInt} // 'bigint'===typeof v
    isNatural(v){return this.validType(v) && 0n < v}
    abs(x) {return (x < 0n) ? -1n * x : x;}
    min(base, ...values) {
        for (const value of values) {if (value < base) {base = value}}
        return base;
    }
    max(base, ...values) {
        for (const value of values) {if (value > base) {base = value}}
        return base;
    }
}
/*
function getCls(classname){return Function('return (' + classname + ')')();}
function getIns(classname){return Function('return (new ' + classname + '())')();}
const cls = Function('return (' + classname + ')')();
const className = `Range${this._t}`
const cls = Function(`return (${className})`)();
const cls = Function(`return (Range${this._t})`)();
const ins = cls();
const ins = Function(`return (new Range${this._t}())`)();
*/
class Range {// 範囲
    static I(m,M) {return new Range(m,M,'I')}
    static R(m,M) {return new Range(m,M,'R')}
    static B(m,M) {return new Range(m,M,'B')}
    constructor(m,M,t) {
        //if ('I R B'.split(' ').some(v=>v===t)) {this._t = t;}
        if ('I R B'.split(' ').some(v=>v===t)) {this._t = Function(`return (new Range${this._t}())`)();}
        else {throw new TypeError(`new Range()の第三引数には'I','F','B'のいずれかを指定してください。それぞれInteger(整数),Real(実数),BigInt(長整数)の略であり範囲対象とする値の型を示します。Integer,Realは両者共Number型ですが、IntegerはNumber.isInteger()で真を返す値のみ対象とします。`)}

        
        if (![m,M].every(v=>)){throw new TypeError(``)}
//        const isFm = Number.isFinite(m);
//        const isFM = Number.isFinite(M);
//        const isTm = this.validType(m);
//        const isTM = this.validType(M);
        const isTm = this._t.validType(m);
        const isTM = this._t.validType(M);
             if (!isTm && !isTM) {throw new TypeError(`new Range()の引数は一〜二つ必要です。一つなら0〜m-1、二つならm〜Mの範囲`)}
        else if (!isTm &&  isTM) {throw new TypeError(`new Range()の引数が二つあるなら第一引数は指定型であるべきです。:${m}`)}
        else if ( isTm && !isTM) {
            if (!this._t.isNatural(m)) {throw new TypeError(`new Range()の引数が一つなら自然数(1以上の整数)であるべきです。:${m}`)}
//            if (!Number.isInteger(m) || m < 1) {throw new TypeError(`new Range()の引数が一つなら自然数(1以上の整数)であるべきです。:${m}`)}
            this._m = 0;
            this._M = m-1;
        }
        else { // if ( isTm &&  isTM) 
            if (0===Math.abs(m,M)) {throw new TypeError(`new Range()の引数が二つあるならその差は1以上あるべきです。`)}
            this._m = this._t.min(m,M);
            this._M = this._t.max(m,M);
//            this._m = Math.min(m,M);
//            this._M = Math.max(m,M);
        }
    }
    get m(){return this._m}
    get M(){return this._M}
    get w(){return this._M - this._m + 1}
    /*
    validType(v) {
        switch(this._t) {
            case 'I': return Number.isInteger(v);
            case 'R': return Number.isFinite(v);
            case 'B': return 'bigint'===typeof v;
            default: throw new Error(`論理エラー。タイプが不正値です。:t=${this._t}`);
        }
    }
    */
    //within(v){return this._m<=v && v<=this._M}
    //within(v){return Number.isFinite(v) && this._m<=v && v<=this._M}
    //within(v){return this.validType(v) && this._m<=v && v<=this._M}
    within(v){return this._t.validType(v) && this._m<=v && v<=this._M}
}
class Man {
    constructor(user=false, name='名') {
        this._user = user;   // user/auto
        //this._range = [0,9]; // 0〜9
        //this._range = {min:0, max:9}; // 0〜9
        this._range = new Range(10); // 0〜9
        this._fake = 0; // 仮面　mask
        this._real = 0; // 素顔　real　正体（しょうたい）identity 
//        this._name = name; // 名前
//        this._life = 10; // 命（生命点）
//        this._act = 3; // 活（活動点）
//        this._cap = 3; // 容（容量点）
        this._hand = -1; // 次に使う手札
        this._hands = []; // 手札
        this._deck = []; // 組、冊
        this._buttons = [];
        this._history = []; // 前回選択した札
    }
    get fake() {return this._fake}
    set fake(v) {
        if (this._range.within(v)) {this._fake = v}
        else {throw new TypeError()}
        v <= this._range.min && this._range.max
        
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
    get history() {return this._history}
    set history(v) {
        if (!(v instanceof Card)) {throw new TypeError(`historyにはCardのみセット可能です。`)}
        return this._history = v;
    }
    draw() {this._hands = [...Array(3)].map(()=>Card.generate());}
    async select() {return this._user ? this.#userSelect() : this.#autoSelect()}
    async #userSelect() {
        console.log('#userSelect()');
//        this._buttons = this.hands.map(c=>c.button);
//        return Promise.any([...Array(3)].map((_,i)=>Async.event(this._buttons[i], 'click')))
        this._buttons = this.hands.map(c=>c.button);
        [...Array(3)].map((_,i)=>document.querySelector(`#h${i+1} button`).replaceWith(this.hands[i].button))
        const evs = [...Array(3)].map((_,i)=>new AsyncEventListener(document.querySelector(`#h${i+1} button`),'click'));
        evs.map(e=>e.init());
        return Promise.any(evs.map(e=>e.promise))
    }
    async #autoSelect() {
        console.log('#autoSelect()');
        /*
        for (let hand of this._hands) {
            //if (hand.cost <= this._cap) {console.log(hand,hand.kind); this._hand = hand.kind; Promise.resolve(this._hand);}
            if (hand.cost <= this._cap) {this._hand = hand.kind; return Promise.resolve(this._hand);}
        }
        */
        for (let i=0; i<this._hands.length; i++) {
            //if (hand.cost <= this._cap) {console.log(hand,hand.kind); this._hand = hand.kind; Promise.resolve(this._hand);}
            //if (this.hands[i].cost <= this._cap) {this._hand = this.hands[i].kind; return Promise.resolve(this._hand);}
            if (this.hands[i].cost <= this._cap) {this._hand = i+1; return Promise.resolve(this._hand);}
        }
        return Promise.resolve(0);
    }
}
/*
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
*/
