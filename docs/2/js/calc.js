class Judger {// 審判。4通り（プレイヤの勝ち／敗け／引き分け／未決着）
    constructor(hero, enemy) {
        this._hero = hero;
        this._enemy = enemy;
    }
    judge() {
        this.#run(this._hero, this._enemy);
        let r = this.#judge()
        if (0!==r) {return r}
        this.#run(this._enemy, this._hero);
        return this.#judge()
    }
    #run(attacker, defender) {
        if (1===attacker.hands[attacker.hand].kind) {defender.life -= attacker.hands[attacker.hand].power}
    }
    #judge() {
        if (this._hero.hp <= 0 && this._enemy.hp <= 0) {return -1} // 引分
        else if (this._hero.hp <= 0) {return -2}  // 敗北
        else if (this._enemy.hp <= 0) {return  1} // 勝利
        return 0; // 継続
    }
    /*
    judge(hero, enemy) {
        this.#run(hero, enemy);
        this.#judge(hero, enemy)
        this.#run(enemy, hero);
        this.#judge(hero, enemy)
    }
    */
}
