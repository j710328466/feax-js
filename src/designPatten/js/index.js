// 工厂模式
import getUserTypeFactory from './lib/factory'
// 单例模式
import Singleton from './lib/singleton'
// 建造者模式
import Builder from './lib/build'
// 适配器模式
import Adapter from './lib/adapter'
// 代理模式
import ProxyPro from './lib/proxy'
// 发布订阅者模式
import EventEmitter from './lib/emit'

import './lib/strategy'

// -------------------- 实例化工厂模式
let UserAuthorClass = getUserTypeFactory('admin')
let whatAuthorICan = new UserAuthorClass('小李')
// console.log(whatAuthorICan)

// -------------------- 实例化单例模式
let appleCompany = Singleton.getInstance('苹果公司', '乔布斯', ['iphone', 'imac', 'ipad'])
let copyAppleCompany = Singleton.getInstance('苹果公司', '傻逼', ['iphone', 'imac', 'ipad'])

// console.log(appleCompany, copyAppleCompany)

// -------------------- 实例化建造者模式
const book = new Builder()
    .withName('你不知道的JavaScript')
    .withAuthor('图灵')
    .withPrice(39.9)
    .withCategory('啥啊')
    .build()
// console.log(book)

// -------------------- 代理模式
let oldobj = {
    a: 1,
    b: 2
}

let newobj = new ProxyPro(oldobj)

console.log(newobj.a = 100)
console.log(newobj);

// -------------------- 实例化适配器模式
let oldObj = [
    {
        age: 11,
        name: 'jzx'
    },
    {
        age: 12,
        name: 'qq'
    }
]

let adapter = new Adapter(oldObj)
console.log(adapter)

// 发布订阅者模式
let observer = new EventEmitter()

observer.on("say", val => console.log(val))
observer.trigger("say", 'fuck')