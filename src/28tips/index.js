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
 * 循环实现数组 map 方法
 * @param {Function} fn 函数
 * @param {} context 
 */
const selfMap = function (fn, context) {
    let arr = Array.prototype.slice.call(this)
    let mappedArr = Array(arr.length - 1)
    for (let i = 0, leng = arr.length; i < leng; i++) {
        const item = arr[i]
        // 判断稀疏数组的情况
        if (!arr.hasOwnProperty(i)) continue
        mappedArr[i] = fn.call(context, item)
    }
    return mappedArr
}
Array.prototype.selfMap = selfMap

let newArr = [1, 2, 3].selfMap(num => num * 2)
// console.log(newArr)

/**
 * 使用 reduce 实现数组 map
 * @param {Function} fn 传递的函数
 * @param {*} context 
 */
const reduceMap = function (fn, context) {
    let arr = Array.prototype.slice.call(this)

    return arr.reduce((pre, cur, index) => {
        return [...pre, fn.call(context, cur)]
    }, [])
}
Array.prototype.reduceMap = reduceMap

let reduceArr = [2, 4, 3].reduceMap(num => num * 3)


/**
 * 使用 for 实现 filter 方法
 * @param {Function} fn 传递的函数
 * @param {*} context 
 */
const forFilter = function (fn, context) {
    let arr = Array.prototype.slice.call(this)
    let filteredArr = []
    
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        
        if (!arr.hasOwnProperty(i)) continue
        fn.call(context, item) && filteredArr.push(item)
    }
    return filteredArr
}
Array.prototype.forFilter = forFilter

let forFilterArr = [1, 2, 3].forFilter(num => num > 2)

/**
 * 用 reduce 实现数组 filter
 * @param {Function} fn 传递的函数
 * @param {String} context 指向的对象
 */
const reduceFilter = function (fn, context) {
    return this.reduce((pre, cur, index) => {
        return fn.call(context, cur) ? [...pre, cur] : [...pre]
    }, [])
}
Array.prototype.reduceFilter = reduceFilter

let reduceFilterArr = [2,3,4,5,3,2].reduceFilter(num => num > 3, 'this')
// console.log(reduceFilterArr)

/**
 * 用 for 实现 some 方法
 * @param {Function} fn 传递的方法
 * @param {String} context 指向的对象
 */
const forSome = function (fn, context) {
    let arr = Array.prototype.slice.call(this)

    if (!arr.length) return false
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        
        if (!arr.hasOwnProperty(i)) continue
        let res = fn.call(context, item)
        
        if (res) return true
    }
    return false
}
Array.prototype.forSome = forSome

let forSomeArr = [2,3,5,6,3,33].forSome(num => num === 33)
// console.log(forSomeArr)

/**
 * 使用 reduce 4 flat
 * @param {Number} depth 扁平化深度
 */
const reduceFlat = function (depth = 1) {
    let arr = Array.prototype.slice.call(this)

    if (depth === 0) return arr

    return arr.reduce((pre, cur) => {
        if (Array.isArray(cur)) {
            return [...pre, ...reduceFlat.call(cur, depth - 1)]
        } else {
            return [...pre, cur]
        }
    }, [])
}

Array.prototype.reduceFlat = reduceFlat

let reduceFlatArr = [1,2,3, [2,3,4, [5,6,7]]].reduceFlat()
// console.log(reduceFlatArr)

// 扁平化
let flat = function(arr) {
    return Array.from(new Set(arr.flat(Infinity))).sort((a,b)=>{ return a-b})
}
// console.log(flat([1,2,3, [3,4,5,6,[2,3,4,5]]]))

// 扁平化方案2
let flat2 = function(arr) {
    return [...new Set([].concat(...arr.map(item => (Array.isArray(item) ? flat2(item) : [item]))))].sort((a, b) => a - b)
}
// console.log(flat2([1,2,3, [3,4,5,6,[2,3,4,5,9, 87]]]))