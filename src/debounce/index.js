const debounce = (fn, time = 18, opt = {
    leading: true,
    context: null
}) => {
    let timer

    let _debounce = (...args) => {
        if (timer) {
            clearTimeout(timer)
        }

        if (opt.leading && !timer) {
            timer = setTimeout(null, time)
            fn.apply(opt.context, args)
        } else {
            timer = setTimeout(() => {
                fn.apply(opt.context, args)
            }, time)
        }
    }

    _debounce.cancel = () => {
        clearTimeout(timer)
        timer = null
    }
    return _debounce
}