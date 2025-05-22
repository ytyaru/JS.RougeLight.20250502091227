class Judger {
    judge(hero, enemy) {
        this.#run(hero, enemy);
        this.#judge()
        this.#run(enemy, hero);
        this.#judge()
    }
    #run(attacker, defender) {
        if (1===attacker.hands[attacker.hand].kind) {defender.life -= attacker.hands[attacker.hand].power}
    }

}
