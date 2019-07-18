// -------------------- 适配器模式
export default class SDK {
    constructor(config) {
        if (!config || typeof config === 'object') {
            config = Object.assign({},
                {
                    brand: null,
                    os: null,
                    carrier: 'china-mobile',
                    language: 'zh',
                    network: 'wifi'
                },
                config
            )
            return config 
        } else {
            throw new Error('传递的参数必须为一个对象！')
        }
    }
}