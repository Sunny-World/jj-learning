// 定义Promise的三种状态常量
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";
// 判断变量是否为function
const isFunction = variable => typeof variable === "function";
class MyPromise {
    constructor(handle) {
        if (!isFunction) {
            throw new Error("MyPromise must accept a function as parameter");
        }
        // 添加状态
        this._status = PENDING;
        this._value = undefined;
        // 添加成功回调队列
        this._fulfilledQueues = [];
        // 添加失败回调函数队列
        this._rejectQueues = [];
        // 执行handle
        try {
            handle(this._resolve.bind(this), this._reject.bind(this));
        } catch (err) {
            this._reject(err);
        }
    }
    // 添加resovle时执行的函数
    _resolve(val) {
        if (this._status !== PENDING) return;
        this._status = FULFILLED;
        this._value = val;
    }
    // 添加resovle时执行的函数
    _reject(arr) {
        if (this._status !== PENDING) return;
        this._status = REJECTED;
        this._value = arr;
    }
    // 添加then方法
    then(onFulfilled, onRejected) {
        const { _value, _status } = this;
        return new MyPromise((onFulfilledNext, onRejectedNext) => {
            let fulfill = value => {
                try {
                    if (!isFunction(onFulfilled)) {
                        onFulfilledNext(value);
                    } else {
                        let res = onFulfilled(value);
                        if (res instanceof MyPromise) {
                            res.then(onFulfilledNext, onRejectedNext);
                        }
                    }
                } catch (err) {
                    onRejectedNext(res);
                }
            };
            let rejected = error => {
                try {
                    if (!isFunction(onRejected)) {
                        onRejectedNext(error);
                    } else {
                        let res = onRejected(error);
                        if (res instanceof MyPromise) {
                            res.then(onFulfilledNext, onRejectedNext);
                        } else {
                            onFulfilledNext(res)
                        }
                    }
                } catch (err) {
                    onRejectedNext(err);
                }
            };
            switch (_status) {
                // 当状态为pending时，将then方法回调函数加入执行队列等待执行
                case PENDING:
                    this._fulfilledQueues.push(onFulfilled);
                    this._rejectQueues.push(onRejected);
                    break;
                case FULFILLED:
                    fulfill(_value);
                    break;
                case REJECTED:
                    rejected(_value);
                    break;
            }
        });
    }
}
