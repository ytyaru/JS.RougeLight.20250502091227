(function(){
class Random {
    get R() { // Real number 実数 0.0〜1.0
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        const value = array[0] / (0xFFFFFFFF + 1); // 0.0〜1.0
        return value;
    }
    N(v=6){return this.I(1,v)}// Natural 自然数 1〜v
    D(v=6){return this.I(1,v)}// TRPGで使うダイスDice（1〜vの出目をもつ賽を3回振る。4,6,8,12,20,100等）
    I(v=100, w=undefined) {// Integer 整数（引数1個:0〜v-1の整数値、引数2個:v〜w迄の整数値）
        if (undefined===w) {
            if (this.#isN(v)) {return Math.floor(this.R * v)}
            this.#notN(v)
        } else {
            if (this.#isN(v) && this.#isN(w)) {
                if (w <= v) {this.#notMinMax(v,w)}
                return Math.floor(this.R * (w-v+1)) + v;
            }
            this.#notMinMax(v,w);
        }
    }
    P(v=50, w=undefined) {// probability 確率 v%の確率で成功する。その結果を真偽値で返す。引数1個:百分率、引数2個:分数
        if (undefined===w) {
                 if (  0===v) {return false}
            else if (100===v) {return true}
            else if (this.#isP(v)) {return (this.R <= (v / 100))}
            this.#notP(v)
        } else {
            if (this.#isN(v) && this.#isN(w)) {
                if (w<=v) {return true}
                else {return (this.R <= (v / w))}
            } else {throw new Error(`引数が二つある時は(分子,分母)であるべきです。各値は自然数のみ有効です(1〜Number.MAX_SAFE_INTEGER):(${v}, ${w})`)}
        }
    }
    // 自然数 Natural number
    #isN(v) {return Number.isInteger(v) && 0 < v && v <= Number.MAX_SAFE_INTEGER}
    #notN(v) {throw new Error(`引数vは0より大きくNumber.MAX_SAFE_INTEGER以下の整数値であるべきです。:v=${v}`)}
    #notMinMax(v,w) {throw new Error(`引数が二つある時は(最小値,最大値)の順であるべきです。各値は自然数のみ許容します。:(${v}, ${w})`)}
    // 百分率 percentage
    #isP(v) {return 'number'===typeof v && 0<=v && v<=100}
    #notP(v) {throw new Error(`引数vは0〜100迄の実数値であるべきです。:v=${v}`)}
    #hasZero(v,w) {if (0===v || 0===w) {throw new Error(`引数v,wは非0であるべきです。:v=${v},w=${w}`)}}

    // 複数回試行した結果を配列として返す s 複数形 s Summary 要約
    Rs(N=3) {return [...new Array(parseInt(N))].map((_,i)=>this.R)} // Real
    Is(v=100, N=3) {return [...new Array(parseInt(N))].map((_,i)=>this.I(v))} // Integer
    Ns(v=1, w=100, N=3) {return [...new Array(parseInt(N))].map((_,i)=>this.I(v,w))} // Natural
    Ds(v=6, N=3) {return this.Ns(1,v,N)} // TRPGで使う3D6等（1〜6の出目をもつ賽を3回振る）
    Ps(v=50, N=3) {return [...new Array(parseInt(N))].map((_,i)=>this.P(v))} // Parcentage     x Rate Realと重複する
    Fs(v=1, w=2, N=3) {return [...new Array(parseInt(N))].map((_,i)=>this.P(v,w))} // Fraction
    // 複数回試行した結果の真偽数と比率を返す n num d detail
    Pn(v=50, N=3) { // Parcentage num    x Rate Realと重複する
        const Ps=this.Ps(v,N);
        const T = Ps.filter(v=>v).length;
        const F = Ps.filter(v=>!v).length;
        const R = 0===T ? 0 : 0===F ? 1 : T/N;
        return ({t:T, f:F, n:N, r:R, a:Ps})
    }
    Fn(v=1, w=2, N=3) { // Fraction num
        const Fs = this.Fs(v,w,N);
        const T = Fs.filter(v=>v).length;
        const F = Fs.filter(v=>!v).length;
        const R = 0===T ? 0 : 0===F ? 1 : T/N;
        return ({t:T, f:F, n:N, r:R, a:Fs})
    }
    // 抽選する lottery
    L(weights) {// [6,3,1] 0:6/10, 1:3/10, 2:1/10   [1,1,1] 0:1/3, 1:1/3, 2:1/3
        if (!weights.every(v=>Number.isInteger(v))) {throw new TypeError(`Random.lottery()の引数は整数値の配列のみ有効です。`)}
        const S = weights.reduce((s,v,i)=>s+v, 0);
        const V = this.I(S); // 0〜S-1
        for (let i=0; i<weights.length; i++) {
            const W = weights.slice(0,i+1).reduce((s,v,i)=>s+v, 0);
            if (V < W) {return i}
        }
        throw new Error(`このコードは実行されないはず。`)
    }
}
window.Random = new Random();
})();

