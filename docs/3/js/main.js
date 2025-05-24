window.addEventListener('DOMContentLoaded', async(event) => {
    const [hero, enemy] = [new Man(true, '自'), new Man(false, '敵')];
    const mans = [hero, enemy];
    mans.map(m=>m.draw());
    hero.hands.map(h=>h.button)
    document.querySelector('#hl').textContent = hero.life;
    document.querySelector('#ha').textContent = hero.act;
    document.querySelector('#el').textContent = enemy.life;
    document.querySelector('#ea').textContent = enemy.act;

    /*
    document.querySelector('#h4 button').addEventListener('click', async(e)=>{
        Promise.resolve(K);
    });
    for (let btn of hero.hands.map(h=>h.button)) {
        btn.addEventListener('click', (e)=>{
            console.log(e.target);
            const K = parseInt(e.target.dataset.id);
            if (this.act <= Cards[K].cost) {this._hand = K; Promise.resolve(K);}
        });
    }
    this.hands[i].button
    [...Array(3)].map((_,i)=>document.querySelector(`#h${i+1} button`).replaceWith(this.hands[i].button))
    */
    document.querySelector('#h1 button').replaceWith(hero.hands[0].button);
    document.querySelector('#h2 button').replaceWith(hero.hands[1].button);
    document.querySelector('#h3 button').replaceWith(hero.hands[2].button);
    document.querySelector('#e1 button').replaceWith(enemy.hands[0].button);
    document.querySelector('#e2 button').replaceWith(enemy.hands[1].button);
    document.querySelector('#e3 button').replaceWith(enemy.hands[2].button);
    /*
    [...Array(3)].map((_,i)=>{
        document.querySelector(`#h${i+1} button`).dataset.pos=i+1;
        document.querySelector(`#e${i+1} button`).dataset.pos=i+1;
    });
    const evs = [...Array(3)].map((_,i)=>new AsyncEventListener(document.querySelector(`#h${i+1} button`),'click'));
    */
    const evs = [...Array(3)].map((_,i)=>{
        document.querySelector(`#h${i+1} button`).dataset.pos=i+1;
        document.querySelector(`#e${i+1} button`).dataset.pos=i+1;
        return new AsyncEventListener(document.querySelector(`#h${i+1} button`),'click')
    });
    evs.map(e=>e.init());
    const heroHand = await Promise.any(evs.map(e=>e.promise));
    const enemyHand = await enemy.select();
    console.log(heroHand, enemyHand);
    hero._hand = heroHand;
    enemy._hand = enemyHand;
    console.log(hero.hands)
    console.log(hero.hands[hero._hand], enemy.hands[enemy._hand])

    /*
    console.log('*********')
    console.log(await hero.select());
    console.log('*********')
    const hands = await Promise.all([hero.select(), enemy.select()]);
    console.log(hands)
//    const evs = [...Array(3)].map((_,i)=>new AsyncEventListener(document.querySelector(`#h${i+1} button`),'click'));
//    evs.map(e=>e.init())
//    Promise.all([Promise.any(evs.map(e=>e.promise)), enemy.select()])
    */
    /*
//    console.log(hero.hands.map(h=>AsyncEvent.make(h.button, 'click')()))
//    console.log(await Promise.any(hero.hands.map(h=>AsyncEvent.make(h.button, 'click')())))
//    await Promise.any(hero.hands.map(h=>AsyncEvent.make(h.button, 'click')()));
//    await Promise.any(hero.hands.map(h=>AsyncEvent.make(h.button, 'click')()));
    const ps = hero.hands.map(h=>AsyncEvent.make(h.button, 'click'));
    console.log(ps)
    await ps[0]();
    console.log('AAAAAAAAAAA')
    await ps[1]();
    console.log('AAAAAAAAAAA')
    await ps[2]();
    console.log('AAAAAAAAAAA')
//    await Promise.all(mans.map(m=>m.select()));
//    await Promise.all([enemy.select(), Promise.any(hero.hands.map(h=>AsyncEvent.make(h.button, 'click')))]);
//    await Promise.all([enemy.select(), Promise.any(hero.hands.map(h=>AsyncEvent.make(h.button, 'click')()))]);
    console.log(hero.hand, enemy.hand)
    */
    
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

