// -------------------- 适配器模式
export default class Adapter {
    constructor(config) {
        if (!config || typeof config === 'object') {
            return this.reLoad(config)
        } else {
            throw new Error('传递的参数必须为一个对象！')
        }
    }

    reLoad(obj) {
        let newObj = {}

        for (let i = 0; i < obj.length; i++) {
            const item = obj[i]
            newObj[item.name] = item.age
        }
        return newObj
    }
}