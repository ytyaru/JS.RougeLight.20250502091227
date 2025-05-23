class AsyncEventListener {
    constructor(el, eventName, fn) {
        this._el = el;
        this._eventName = eventName;
        this._handler = null;
        this._listener = null;
        //this._fn = ('function'===typeof fn) ? fn : (e => res(parseInt(e.currentTarget.dataset.pos)));
        //this._fn = ('function'===typeof fn) ? fn : ((e,res,rej) => res(parseInt(e.currentTarget.dataset.pos)));
        //this._fn = ('function'===typeof fn) ? fn : ((e,res,rej) => res(parseInt(e.currentTarget.dataset.id)));
        this._fn = ('function'===typeof fn) ? fn : ((e,res,rej) => res(parseInt(e.currentTarget.dataset.pos)));
//        this._fn = ('function'===typeof fn) ? fn : ((e,res,rej) => res(parseInt(e.currentTarget.dataset.pos)-1));
    }
    init() {
        if (this._listener){return}
        if (null===this._handler) {
            this._handler = {
                listener:null, res:null, rej:null,
                emit(e) {if(this.listener){this.listener(e,this.res,this.rej)}},
                listen(fn,res,rej) {this.listener=fn; this.res=res; this.rej=rej;}
            }
        }
        this._listener = (e => this._handler.emit(e));
        this._el.addEventListener(this._eventName, this._listener);
    }
    get promise() {return new Promise((res, rej) => this._handler.listen(this._fn, res, rej))}
    get promiseFn() {return () => this.promise}
    async run() {return await this.promiseFn()}
    fin() {
        if (null===this._listener) {return}
        this._el.removeEventListener(this._eventName, this._listener);
        this._listener = null;
    }
    get el() {return this._el}
    get eventName() {return this._eventName}
    get fn() {return this._fn}
}

