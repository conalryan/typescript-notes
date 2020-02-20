var s = {
    _observers: [],
    attach: function (observer) {
        this._observers.push(observer);
    },
    detach: function (observer) {
        var idx = this._observers.indexOf(observer);
        if (idx > -1) {
            this._observers.splice(idx, 1);
        }
    },
    notify: function (value) {
        this._observers.forEach(function (observer) {
            observer.notify(value);
        });
    }
};
var o = {
    notify: function (value) {
        console.log(value);
    }
};
s.attach(o);
s.notify('Hello world');
s.detach(o);
s.notify("This won't print");
