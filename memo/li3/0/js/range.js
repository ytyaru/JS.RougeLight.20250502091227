// Range 範囲 JSは型やジェネリクスがなく多態性を実現するのが面倒。
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

