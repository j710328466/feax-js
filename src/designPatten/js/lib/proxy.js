var newProxy = new Proxy({}, {
    get: function (target, key, receiver) {
        console.log(`getting ${key}`)
        return Reflect.get(target, key, receiver)
    },
    set: function (target, key, value, reciver) {
        console.log(`setting ${key}`)
        return Reflect.set(target, key, value, reciver)
    }
})

// newProxy.count = 1
// newProxy.count++

var proxy1 = new Proxy({}, {
    get: function (target, property) {
        return Math.ceil(35 * Math.random())
    }
})

var handler2 = {
    // 获取属性，名称为 name
    get: function (target, name) {
        if (name === 'prototype') {
            // 如果获取的属性为 原型链，则返回
            return Object.prototype
        }
        return 'Hello, ' + name
    },

    apply: function (target, thisBinding, arguments) {
        return arguments[0]
    },

    construct: function (target, args) {
        return {value: args[1]}
    }
}

var proxy2 = new Proxy(function (x, y) {
    return x + y
}, handler2)

// 触发 apply 方法
console.log(proxy2(1, 2))
// 触发 construct
new proxy2(1, 2)

proxy2.prototype === Object.prototype
// proxy2.foo = 'Hello, foo'
