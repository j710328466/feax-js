// ------------------- 单例模式 -------------------
export default class Singleton {
    constructor(name, creator, products) {
        this.name = name
        this.creator = creator
        this.products = products
    }

    static getInstance(name, creator, products) {
        if (!this.instance) {
            this.instance = new Singleton(name, creator, products)
        }
        return this.instance
    }
}

