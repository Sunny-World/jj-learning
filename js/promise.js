// https://juejin.im/entry/57fbb0f48ac2470058c49ac0
/*!
 * Promise JavaScript Library v2.0.0
 */
;
(function(window) {
    var _promise = function(thens) {
        this.thens = thens || [];
        this.state = "";

        this._CONSTANT = {
            any: "any",
            number: "number",
            resolved: "resolved",
            rejected: "rejected",
            pending: "pending"
        };
    };

    _promise.prototype = {
        resolve: function() {
            if(this.state == this._CONSTANT.pending) {
                this.state = this._CONSTANT.resolved;
                return;
            }
            if(this.state !== "") return;
            if(this.promiseArr) {
                for(var i = 0, j = this.promiseArr.length; i < j; i++) {
                    this.promiseArr[i].resolveCount++;
                }
                if(this.promiseArr[0].action !== this._CONSTANT.any) {
                    if(this.resolveCount !== this.promiseArr.length) {
                        return;
                    }
                } else {
                    if(this.resolveCount > 1) {
                        return;
                    }
                }
            }
            this.state = this._CONSTANT.resolved;
            if(!this.thens) return;
            if(this.thens[0] && this.thens[0].finallyCB) this.thens[0].finallyCB.apply(null, arguments);
            var t, n;
            while(t = this.thens.shift()) {
                if(typeof t === this._CONSTANT.number) {
                    var self = this;
                    setTimeout(function() {
                        var prms = new _promise(self.thens);
                        prms.resolve();
                    }, t);
                    break;
                }
                var doneFn = t.done,
                    action = t.action;
                if(!doneFn) continue;
                if(doneFn instanceof Array) {
                    var arr = [];
                    for(var i = 0, j = doneFn.length; i < j; i++) {
                        var df = doneFn[i];
                        if(df instanceof _promise) {
                            df.thens = this.thens;
                            arr.push(df);
                        } else {
                            var m = df.apply(null, arguments);
                            if(m instanceof _promise) {
                                m.thens = this.thens;
                                arr.push(m);
                            }
                        }
                    }
                    var l = arr.length;
                    if(l === 0) {
                        continue;
                    } else {
                        for(var i = 0; i < l; i++) {
                            arr[i].promiseArr = arr;
                            arr[i].action = action;
                            arr[i].resolveCount = 0;
                        }
                        break;
                    }
                } else {
                    if(doneFn instanceof _promise) {
                        doneFn.thens = this.thens;
                        break;
                    } else {
                        n = doneFn.apply(null, arguments);
                        if(n instanceof _promise) {
                            n.thens = this.thens;
                            break;
                        }
                    }
                    continue;
                }

            }
        },

        reject: function() {
            if(this.state !== "") return;
            if(this.promiseArr && this.promiseArr[0].action === this._CONSTANT.any) {
                if(this.promiseArr[this.promiseArr.length - 1] !== this) {
                    return;
                }
            }
            this.state = this._CONSTANT.rejected;
            if(!this.thens) return;
            if(this.thens[0] && this.thens[0].finallyCB) this.thens[0].finallyCB.apply(null, arguments);
            var t, n;
            while(t = this.thens.shift()) {
                if(typeof t === this._CONSTANT.number) {
                    var self = this;
                    setTimeout(function() {
                        var prms = new _promise(self.thens);
                        prms.resolve();
                    }, t);
                    break;
                }
                if(t.fail) {
                    n = t.fail.apply(null, arguments);
                    if(n instanceof _promise) {
                        n.thens = this.thens;
                        break;
                    }
                    continue;
                }
                break;
            }
        },

        notify: function() {
            var t = this.thens[0];
            t.progress.apply(null, arguments);
        },

        then: function(done, fail, progress) {
            this.thens.push({
                done: done,
                fail: fail,
                progress: progress
            });
            return this;
        },

        any: function(done, fail, progress) {
            this.thens.push({
                done: done,
                fail: fail,
                progress: progress,
                action: this._CONSTANT.any
            });
            return this;
        },

        done: function(done) {
            if(this.thens.length === 0 || this.thens[this.thens.length - 1].done) {
                this.thens.push({
                    done: done
                });
            } else {
                this.thens[this.thens.length - 1].done = done;
            }
            return this;
        },

        fail: function(fail) {
            if(this.thens.length === 0 || this.thens[this.thens.length - 1].fail) {
                this.thens.push({
                    fail: fail
                });
            } else {
                this.thens[this.thens.length - 1].fail = fail;
            }
            return this;
        },

        progress: function(progress) {
            if(this.thens.length === 0 || this.thens[this.thens.length - 1].progress) {
                this.thens.push({
                    progress: progress
                });
            } else {
                this.thens[this.thens.length - 1].progress = progress;
            }
            return this;
        },

        ensure: function(finallyCB) {
            if(this.thens.length === 0 || this.thens[this.thens.length - 1].finallyCB) {

                this.thens.push({
                    finallyCB: finallyCB
                });
            } else {
                this.thens[this.thens.length - 1].finallyCB = finallyCB;
            }
            return this;
        },

        always: function(alwaysCB, progress) {
            this.thens.push({
                done: alwaysCB,
                fail: alwaysCB,
                progress: progress
            });
            return this;
        },

        wait: function(ms) {
            this.thens.push(~~ms);
            return this;
        }
    }

    var Promise = function(parameter) {
        var prms = new _promise();
        if(parameter) {
            if(arguments.length > 1) {
                prms.thens[0] = {};
                prms.thens[0].done = [];
                prms.thens[0].done.push.apply(prms.thens[0].done, arguments);
                setTimeout(function() {
                    prms.resolve();
                }, 1)
            } else {
                prms = parameter();
                if(prms instanceof _promise) return prms;
            }
        }
        return prms;
    };

    Promise.when = function() {
        var prms = new _promise();
        prms.thens[0] = {};
        prms.thens[0].done = [];
        prms.thens[0].done.push.apply(prms.thens[0].done, arguments);
        setTimeout(function() {
            prms.resolve();
        }, 1)
        return prms;
    };

    Promise.any = function() {
        var prms = new _promise();
        prms.thens[0] = {};
        prms.thens[0].action = prms._CONSTANT.any;
        prms.thens[0].done = [];
        prms.thens[0].done.push.apply(prms.thens[0].done, arguments);
        setTimeout(function() {
            prms.resolve();
        }, 1)
        return prms;
    };

    Promise.timeout = function(promise, ms) {
        setTimeout(function() {
            promise.reject();
        }, ms);
        return promise;
    }

    Promise.gtTime = function(promise, ms) {
        promise.state = promise._CONSTANT.pending;
        setTimeout(function() {
            if(promise.state == promise._CONSTANT.resolved) {
                promise.state = "";
                promise.resolve();
            }
            promise.state = "";
        }, ms);
        return promise;
    }

    if(typeof module === "object" && module && typeof module.exports === "object") {
        module.exports = Promise;
    } else {
        window.Promise = Promise;

        if(typeof define === "function" && define.amd) {
            define("promise", [], function() {
                return Promise;
            });
        }
    }
}(window));