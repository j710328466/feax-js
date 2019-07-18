/**
 * 1. 判断对象数据类型
 * @param {String} type 数据类型
 */
let isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target)
// eg
let isArr = isType('Array')
// console.log(isArr([]))

/**
 * 2. 函数柯里化
 * @param {Function} fn 函数
 */
let curry = fn => {
    if (fn.length <= 1) return fn

    const generator = (...args) => {
        if (fn.length === args.length) {
            return fn(...args)
        } else {
            return (...args2) => {
                return generator(...args, ...args2)
            }
        }
    }

    return generator
}
let add = (a, b, c, d) => a + b + c + d
let curriedAdd = curry(add)
// console.log(curriedAdd(5)(6)(7)(8))

/**
 * 
 * @param {Function} fn 函数
 */
let proxy = fn => {
    let instance
    let handler = {
        construct(target, args) {
            if (!instance) {
                instance = Reflect.construct(fn, args)
            }
            return instance
        }
    }
    return new Proxy(fn, handler)
}

/**
 * 3. 如何让异步函数书写更优美
 * @param {Function} asyncfn 异步函数
 */
async function af(asyncfn) {
    try {
        let res = await asyncfn()
        return ([null, res])
    } catch (e) {
        return [e, null]
    }
}

let res = af(async function name(resolve) {
    return 'a'
})
// console.log(res)

/**
 * 
 * @param {Function} fn 函数
 * @param {} context 
 */

let demo = [1, 2, 3].map(e => e + 1)


class A  extends Array {
    constructor() {
        super()
    }

    selfMap (fn, context) {
        let arr = Array.prototype.slice.call(this)
        let mappedArr = Array(arr.length - 1)
        console.log(arr)
        // for (let i = 0; i < arr.length; i++) {
        //     if (!arr.hasPwnProperty(i)) continue
        //     mappedArr[i] = fn.call(contenxt, arr[i], i, this)
        // }
        // return mappedArr
    }
}
let tp = new A()
// console.log(tp.selfMap())