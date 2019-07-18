// ------------------- 策略模式 -------------------

var performanceA = function () { }

performanceA.prototype.calculate = function (salary) {
    return salary * 4
}
var performanceB = function () { }

performanceB.prototype.calculate = function (salary) {
    return salary * 3
}

var performanceC = function () { }

performanceC.prototype.calculate = function (salary) {
    return salary * 2
}

class Bouns {
    constructor() {
        this.salary = null
        this.levelObj = null
    }

    setSalary(salary) {
        this.salary = salary
    }

    setlevelObj(levelObj) {
        this.levelObj = levelObj
    }

    getBouns() {
        return this.levelObj.calculate(this.salary)
    }
}

var bouns = new Bouns()
bouns.setSalary(10000)
bouns.setlevelObj(new performanceA())
console.log(bouns.getBouns())