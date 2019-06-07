# 解读Vuex
## 为何使用 Vuex

使用 Vue 我们就不可避免的会遇到组件间共享的数据或状态。应用的业务代码逐渐复杂，props、事件、事件总线等通信的方式的弊端就会愈发明显。这个时候我们就需要 Vuex 。Vuex 是一个专门为 Vue 设计的状态管理工具。
状态管理是 Vue 组件解耦的重要手段。

它借鉴了 Flux、redux 的基本思想，将状态抽离到全局，形成一个 Store。

![Image text](https://github.com/Javison666/jj-learning/blob/master/image/reademe/16ab1f2b61cf0df7.jpg?raw=true)

Vuex 不限制你的代码结构，但需要遵守一些规则：

应用层级的状态应该集中到单个 store 对象中
提交 mutation 是更改状态的唯一方法，并且这个过程是同步的

异步逻辑都应该封装到 action 里面

## Vuex 注入 Vue 生命周期的过程

我们在安装插件的时候，总会像下面一样用 Vue.use() 来载入插件，可是 Vue.use() 做了什么呢？
```js
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
```
Vue.use() 做了什么

安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。

以上是 官方文档 的解释。

接下来我们从源码部分来看看 Vue.use() 都做了什么。

Vue 源码在 initGlobalAPI 入口方法中调用了 initUse (Vue) 方法，这个方法定义了 Vue.use() 需要做的内容。

```js
function initGlobalAPI (Vue) {
  ......
  initUse(Vue);
  initMixin$1(Vue); // 下面讲 Vue.mixin 会提到
  ......
}

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    /* 判断过这个插件是否已经安装 */
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }
    var args = toArray(arguments, 1);
    args.unshift(this);
    /* 判断插件是否有 install 方法 */
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

```
这段代码主要做了两件事情：

一件是防止重复安装相同的 plugin
另一件是初始化 plugin

插件的 install 方法

看完以上源码，我们知道插件（Vuex）需要提供一个 install 方法。那么我们看看 Vuex 源码中是否有这个方法。结果当然是有的：

```js
/* 暴露给外部的 install 方法 */
function install (_Vue) {
  /* 避免重复安装（Vue.use 内部也会检测一次是否重复安装同一个插件）*/
  if (Vue && _Vue === Vue) {
    {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  /* 将 vuexInit 混淆进 Vue 的 beforeCreate(Vue2.0) 或 _init 方法(Vue1.0) */
  applyMixin(Vue);
}
```

这段代码主要做了两件事情：

一件是防止 Vuex 被重复安装
另一件是执行 applyMixin，目的是执行 vuexInit 方法初始化 Vuex
接下来 我们看看 applyMixin(Vue) 源码：

```js
/* 将 vuexInit 混淆进 Vue 的 beforeCreate */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);
  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    /* Vue1.0 的处理逻辑，此处省略 */
    ......
  }
  function vuexInit () {
    ......
  }
}
```

从上面的源码，可以看出 Vue.mixin 方法将 vuexInit 方法混淆进 beforeCreate 钩子中，也是因为这个操作，所以每一个 vm 实例都会调用 vuexInit 方法。那么 vuexInit 又做了什么呢？

vuexInit()

我们在使用 Vuex 的时候，需要将 store 传入到 Vue 实例中去。

```js
new Vue({
  el: '#app',
  store
});
```
但是我们却在每一个 vm 中都可以访问该 store，这个就需要靠 vuexInit 了。

```js
  function vuexInit () {
    const options = this.$options
    if (options.store) {
      /* 根节点存在 stroe 时 */
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    } else if (options.parent && options.parent.$store) {
      /* 子组件直接从父组件中获取 $store，这样就保证了所有组件都公用了全局的同一份 store*/
      this.$store = options.parent.$store
    }
  }
```

根节点存在 stroe 时，则直接将 options.store 赋值给 this.$store。否则则说明不是根节点，从父节点的 $store 中获取。

通过这步的操作，我们就以在任意一个 vm 中通过 this.$store 来访问 Store 的实例。接下来我们反过来说说 Vue.mixin()。

Vue.mixin()

全局注册一个混入，影响注册之后所有创建的每个 Vue 实例。插件作者可以使用混入，向组件注入自定义的行为。不推荐在应用代码中使用。

在 vue 的 initGlobalAPI 入口方法中调用了 initMixin$1(Vue) 方法:

```js
function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

```
Vuex 注入 Vue 生命周期的过程大概就是这样，如果你感兴趣的话，你可以直接看看 Vuex 的源码，接下来我们说说 Store。

Store

上面我们讲到了 vuexInit 会从 options 中获取 Store。所以接下来会讲到 Store 是怎么来的呢？

我们使用 Vuex 的时候都会定义一个和下面类似的 Store 实例。
```js
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
    showState: 0,                             
}

export default new Vuex.Store({
    strict: true,
	state,
	getters,
})
```
不要在发布环境下启用严格模式。严格模式会深度监测状态树来检测不合规的状态变更 —— 请确保在发布环境下关闭严格模式，以避免性能损失。

你是否关心 state 是如何能够响应式呢？这个主要是通过 Store 的构造函数中调用的 resetStoreVM(this, state) 方法来实现的。
这个方法主要是重置一个私有的 _vm（一个 Vue 的实例） 对象。这个 _vm 对象会保留我们的 state 树，以及用计算属性的方式存储了 store 的 getters。现在具体看看它的实现过程。

```js
/* 使用 Vue 内部的响应式注册 state */
function resetStoreVM (store, state, hot) {
  /* 存放之前的vm对象 */
  const oldVm = store._vm 

  store.getters = {}
  const wrappedGetters = store._wrappedGetters
  const computed = {}

  /* 通过 Object.defineProperty 方法为 store.getters 定义了 get 方法。当在组件中调用 this.$store.getters.xxx 这个方法的时候，会访问 store._vm[xxx]*/
  forEachValue(wrappedGetters, (fn, key) => {
    computed[key] = partial(fn, store)
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
      enumerable: true // for local getters
    })
  })

  const silent = Vue.config.silent
  /* 设置 silent 为 true 的目的是为了取消 _vm 的所有日志和警告 */
  Vue.config.silent = true
  /*  这里new了一个Vue对象，运用Vue内部的响应式实现注册state以及computed*/
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })
  Vue.config.silent = silent

  /* 使能严格模式，Vuex 中对 state 的修改只能在 mutation 的回调函数里 */
  if (store.strict) {
    enableStrictMode(store)
  }

  if (oldVm) {
    /* 解除旧 vm 的 state 的引用，并销毁这个旧的 _vm 对象 */
    if (hot) {
      store._withCommit(() => {
        oldVm._data.$$state = null
      })
    }
    Vue.nextTick(() => oldVm.$destroy())
  }
}
```

state 的响应式大概就是这样实现的，也就是初始化 resetStoreVM 方法的过程。

看看 Store 的 commit 方法

我们知道 commit 方法是用来触发 mutation 的。

```js
commit (_type, _payload, _options) {
  /* unifyObjectStyle 方法校参 */
  const {
    type,
    payload,
    options
  } = unifyObjectStyle(_type, _payload, _options)

  const mutation = { type, payload }
  /* 找到相应的 mutation 方法 */
  const entry = this._mutations[type]
  if (!entry) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[vuex] unknown mutation type: ${type}`)
    }
    return
  }
  /* 执行 mutation 中的方法 */
  this._withCommit(() => {
    entry.forEach(function commitIterator (handler) {
      handler(payload)
    })
  })
  /* 通知所有订阅者，传入当前的 mutation 对象和当前的 state */
  this._subscribers.forEach(sub => sub(mutation, this.state))

  if (
    process.env.NODE_ENV !== 'production' &&
    options && options.silent
  ) {
    console.warn(
      `[vuex] mutation type: ${type}. Silent option has been removed. ` +
      'Use the filter functionality in the vue-devtools'
    )
  }
}

```
复制代码该方法先进行参数风格校验，然后利用 _withCommit 方法执行本次批量触发 mutation 处理函数。执行完成后，通知所有 _subscribers（订阅函数）本次操作的 mutation 对象以及当前的 state 状态。
