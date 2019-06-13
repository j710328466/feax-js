let numDom = document.querySelector('#numIn')
let toCnDom = document.querySelector('#toCn')
let cnShowDom = document.querySelector('#cnShow')
let isTrue = false
let timeoutFn

// --------------------- 事件

numDom.addEventListener('input', () => getNum(numDom.value))

toCnDom.addEventListener('click', () => getNum(numDom.value))

// --------------------- 函数

let getNum = (value) => {
    isTrue = true
    cnShowDom.innerHTML = ''
    if (value.length > 8) {
        cnShowDom.innerHTML = '长度过长啊~'
        return 
    }
    if (isNaN(value)) {
        cnShowDom.innerHTML = '请输入数字~'
        return
    }
    clearTimeout(timeoutFn)
    if (isTrue) {
        timeoutFn = setTimeout(() => {
            isTrue = false
            cnShowDom.innerHTML = _numToCn(value)
        }, 600);
    }
}

let _numToCn = (value) => {
    let valList = value.split('')
    let cnList = ['零','壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '镹', '拾']
    let wdList = ['千', '百', '拾', '']
    let newValList = []

    for (let i = 0, leng = valList.length; i < leng; i++) {
        newValList.push(cnList[valList[i]] + wdList[i])
    }
    console.log(newValList)
    return newValList.join('').replace(/零+/, '零')
}