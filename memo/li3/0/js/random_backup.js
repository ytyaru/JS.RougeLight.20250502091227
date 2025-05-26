(function(){
class Random {
    get R() { // Real number 実数 0.0〜1.0
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        const value = array[0] / (0xFFFFFFFF + 1); // 0.0〜1.0
        return value;
    }
    I(v=100, w=undefined) {// Integer 整数（引数1個:0〜v-1の整数値、引数2個:v〜w迄の整数値）
        if (this.#isN(w)) {
            if (this.#isN(v)) {
                if (w <= v) {throw new Error(`引数が二つある時は(最小値,最大値)の順であるべきです。:(${v}, ${w})`)}
                return Math.floor(this.R * (w-v)) + v;
            }
            this.#notN(v)
        } else {
            if (this.#isN(v)) {return Math.floor(this.R * v)}
            this.#notN(v)
        }
    }
    P(v=100, w=undefined) {// probability 確率 v%の確率で成功する。その結果を真偽値で返す。引数1個:百分率、引数2個:分数
        if (this.#isN(w)) { // 分数
            if (this.#isN(v)) {
                if (w<=v) {return true}
                else {return (this.R <= (v / w))}
                
            }
            this.#notN(v)
        } else { // 百分率
                 if (  0===v) {return false}
            else if (100===v) {return true}
            else if (this.#isP(v)) {return (this.R <= (v / 100))}
            this.#notP(v)
        }
    }
    // 自然数 Natural number
    #isN(v) {return Number.isInteger(v) && 0 < v && v <= Number.MAX_SAFE_INTEGER}
    #notN(v) {throw new Error(`引数vは0より大きくNumber.MAX_SAFE_INTEGER以下の整数値であるべきです。:v=${v}`)}
    // 百分率 percentage
    #isP(v) {Number.isNumber(v) && 0<=v && v<=100}
    #notP(v) {throw new Error(`引数vは0〜100迄の実数値であるべきです。:v=${v}`)}
}
window.Random = new Random();
})();

