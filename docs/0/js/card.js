class CardData {
    static TSV = `0	不動	ふどう	何もしない。
1	攻撃	こうげき	相手にダメージを与える。
2	追撃	ついげき	相手にダメージを与える。但し今番既に1回以上攻撃済みの場合のみ発動可。
3	邀撃	ようげき	相手にダメージを与える。但し次番に防御成功した直後に発動する。
4	迎撃	げいげき	相手にダメージを与える。但し前番に回避していたら発動可。
5	反撃	はんげき	相手にダメージを与える。但し今番相手が何撃した場合のみ発動可（両者反撃時は前番で判定）。
6	強撃	きょうげき	相手にダメージを与える。但し次番何撃できない。当札は今戦中組から破棄される。
7	防御	ぼうぎょ	被ダメージを軽減する。被ダメ率50%。
8	回避	かいひ	被ダメージを回避する。成功率50%。
9	受流	うけながし	被ダメージを回避する。但し次番の火力が半減する。
10	吸収	きゅうしゅう	被ダメージで回復する。当札は今戦中組から破棄される。
11	回復	かいふく	ダメージを5回復する。当札は今戦中組から破棄される。
12	喝	かつ	次に選んだ何撃／回復の力を2倍にする。
13	封印	ふういん	相手の手札から一枚選んで封じる。当札と指定札は今戦中組から破棄される。`;
    static get() {
        const cards = [];
        for (let line of this.TSV.split('\n')) {
            const [id, name, yomi, desc] = line.split('\t');
            cards.push({id:id, name:name, yomi:yomi, desc:desc})
        }
        return cards;
    }
}
Cards = CardData.get();
console.log(Cards)
class Card {
    constructor(k=1,p=1,c=1) {
        this._kind = k; // 種別
        this._power = 0===k ? 0 : p; // 主要効果値
        this._cost = 0===k ? 0 : c; // 実行消費値
    }
    get kind() {return this._kind}
    get power() {return this._power}
    get cost() {return this._cost}
    //static generate() {return new Card(this.random(Cards.length+1), 1, 1);}
    static generate() {return new Card(this.randomRange(1, Cards.length), 1, 1);}
    static #random() {
        const array = new Uint32Array(1)
        crypto.getRandomValues(array)
        const value = array[0] / (0xFFFFFFFF + 1); // 0.0〜1.0
        return value;
    }
    static random(N=0) {// 0.0〜1.0(実数) / 0〜N-1(整数)
        const v = this.#random();
        return 0<N ? Math.floor(v * N) : v;
    }
    static randomRange(min=1, max=6) {// MIN〜MAX(整数)
        const v = this.#random();
        return Math.floor(v * (max-min)) + min;
    }
    get button() {
        const button = document.createElement('button')
        const ruby = document.createElement('ruby')
        const rt = document.createElement('rt')
        console.log(this._kind)
        ruby.textContent = Cards[this._kind].name;
        ruby.style.rubyPosition='under';
        rt.textContent = Cards[this._kind].yomi;
        ruby.append(rt);
        button.append(ruby, `${this._power}-${this._cost}`);
        button.dataset.id = `${this._kind}`;
        button.addEventListener('focus', (e)=>{
            document.querySelector('#description').value = Cards[parseInt(e.target.dataset.id)].desc;
        })
        button.addEventListener('mouseenter', (e)=>{
            document.querySelector('#description').value = Cards[parseInt(e.target.dataset.id)].desc;
        })
        return button;
    }
    get description() {return Cards[this._kind].desc}
}

