// all
const all = (arr: any[], fn = Boolean) => arr.every(fn)
// console.log(all([1, 2, 3, 4], x => x > 1))

// allEqual
const allEqual = (arr: any[] | number[]) => arr.every(val => val === arr[0])
// console.log(allEqual([1,1,1,1]))

// any
/**
 * 判断数组是否有重复项
 * @param arr 数组
 * @param fn 条件函数
 */
const any = (arr: any[], fn = Boolean) => arr.some(fn)
// console.log(any([1,2,3,4,1]))

/**
 * 数组转换为逗号分隔值
 * @param arr 传入的数组
 * @param delimiter 传入需要嵌入的字符串
 */
const arrayToCSV = (arr: any[], delimiter = ',') => 
    arr
        .map(v => v.map((x: any) => (isNaN(x) ? `"${x.replace(/"/g, '""')}"` : x))
        .join(delimiter))
        .join('\n')
// console.log(arrayToCSV([['a"', 'b'], ['c', 'd']]))

/**
 * 二叉数组分组
 * @param arr 数组
 * @param filter 分组规则
 */
const bifurcate = (arr: any[], filter: any[]) =>
    arr.reduce((acc, val, i) => {
        acc[filter[i] ? 0 : 1].push(val) 
        return acc
    }, [[], []])
// console.log(bifurcate(['beep', 'boop', 'foo', 'bar'], [true, true, false, true]))

/**
 * 数组分组
 * @param arr 数组
 * @param fn 分组规则函数
 */
const bifurcateBy = (arr: any[], fn) => 
    arr.reduce((acc, val, i) => {
        acc[fn(val, i) ? 0 : 1].push(val)
        return acc
    }, [[], []])
// console.log(bifurcateBy(['beef', 'tomato', 'potato', 'photo'], x => x[0] === 'p'))

/**
 * 切割数组
 * @param arr 传入数组
 * @param size 设置分配数组长度
 */
const chunk = (arr, size) =>
    Array.from({length: Math.ceil(arr.length / size)} , (v, i) =>
        arr.slice(i * size, i * size + size) 
    )
// console.log(chunk([1, 2, 3, 4, 5, 6, 7], 2))

/**
 * 传入数组过滤布尔值
 * @param arr 传入数组
 */
const compact = arr => arr.filter(Boolean)
// console.log(compact([0, 1, false, 'true', NaN, 'fuck']))

/**
 * 统计数组相同规则出现的次数
 * @param arr 
 * @param fn 
 */
const countBy = (arr, fn) => 
    arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1
        return acc
    }, {})
// console.log(countBy([4.4, 3.3, 2.2], Math.floor))

const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0)
// console.log(countOccurrences([1,2,3,2,1,2,3,2], 2))

const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)))
// console.log(deepFlatten([1, [2], [[3], 4], 5]))

/**
 * 遍历筛选数组不同项
 * @param a 数组 a
 * @param b 数组 b
 */
const difference = (a, b) => {
    const s = new Set(b)
    return a.filter(x => !s.has(x))
}
// console.log(difference([1,2,3,4], [4,5,3,2]))

const differenceBy = (a, b, fn) => {
    const s = new Set(b.map(fn))
    return a.map(fn).filter(el => !s.has(el))
}
console.log(differenceBy([1,2,3,4], [2,3,4,2], Math.floor))