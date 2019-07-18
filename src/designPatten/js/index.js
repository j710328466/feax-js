// 工厂模式
import getUserTypeFactory from './lib/factory'
import Singleton from './lib/singleton'
import Builder from './lib/build'
import Adapter from './lib/adapter'
import './lib/proxy'

// -------------------- 实例化工厂模式
let UserAuthorClass = getUserTypeFactory('admin')
let whatAuthorICan = new UserAuthorClass('小李')
// console.log(whatAuthorICan)

// -------------------- 实例化单例模式
let appleCompany = Singleton.getInstance('苹果公司', '乔布斯', ['iphone', 'imac', 'ipad'])
let copyAppleCompany = Singleton.getInstance('苹果公司', '大熊', ['iphone', 'imac', 'ipad'])

// console.log(appleCompany, copyAppleCompany)

// -------------------- 实例化建造者模式
const book = new Builder()
    .withName('你不知道的JavaScript')
    .withAuthor('图灵')
    .withPrice(39.9)
    .withCategory('啥啊')
    .build()
// console.log(book)

// -------------------- 实例化建造者模式
let adapter = new Adapter()
// console.log(adapter)
