window.addEventListener('DOMContentLoaded', async(event) => {
    /*
    console.log('DOMContentLoaded!!');
    const author = 'ytyaru';
    van.add(document.querySelector('main'), 
        van.tags.h1(van.tags.a({href:`https://github.com/${author}/JS.RougeLight.20250502091227/`}, 'RougeLight')),
        van.tags.p('ローグライト。'),
//        van.tags.p('Roguelite.'),
    );
    van.add(document.querySelector('footer'),  new Footer('ytyaru', '../').make());

    const a = new Assertion();
    a.t(true);
    a.f(false);
    a.e(TypeError, `msg`, ()=>{throw new TypeError(`msg`)});
    a.fin();
    */
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
    */
    console.log(hero.hand, enemy.hand)
    
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

