
// document.addEventListener('scroll', throttle(500, 1000, function() {
//     console.log('what?')
// }))

// function throttle(delay, interval, fn) {
//     var startTime = new Date().getTime()
//     var timer = null

//     return function () {
//         var nowTime = new Date().getTime()
//         clearTimeout(timer)
//         console.log(nowTime - startTime, interval)
//         if (nowTime - startTime >= interval) {
//             // fn.applay(this, arguments)
//             startTime = nowTime
//         } else {
//             timer = setTimeout(fn, delay);
//         }
//     }
// }

/**
 * 节流
 * @param {Function} fn 调用方法
 * @param {Number} time 时间间隔
 * @param {Object} opt 配置参数
 */
let throttle = (
    fn,
    time = 18,
    opt = {
        leading: true,
        trailing: false,
        context: null
    }
) => {
    let pre = new Date(0).getTime()
    let timer
    let _throttle = (...args) => {
        let now = new Date().getTime()

        if (!opt.leading) {
            if (timer) return

            timer = setTimeout(() => {
                timer = null
                fn.apply(opt.context, args)
            }, time)
        } else if (now - pre > time) {
            fn.apply(opt.context, args)
            pre = now
        } else if (opt.trailing) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn.apply(opt.context, args)
            }, time)
        }
    }

    _throttle.cancel = () => {
        pre = 0
        clearTimeout(timer)
    }
}