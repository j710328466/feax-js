
document.addEventListener('scroll', throttle(500, 1000, function() {
    console.log('what?')
}))

function throttle(delay, interval, fn) {
    var startTime = new Date().getTime()
    var timer = null

    return function () {
        var nowTime = new Date().getTime()
        clearTimeout(timer)
        console.log(nowTime - startTime, interval)
        if (nowTime - startTime >= interval) {
            // fn.applay(this, arguments)
            startTime = nowTime
        } else {
            timer = setTimeout(fn, delay);
        }
    }
}