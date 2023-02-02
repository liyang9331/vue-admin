import dayjs from 'dayjs'
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  const curTime = time
  if ((String(time)).length > 12) {
    // “2020-08-10 18:29:24”的字符长度是19，超过了，所以直接进入时间戳的处理里面
    // 判断时间戳是否为毫秒单位（不少于13位）或者字符串2020-08-10 18:29:24长度
    time = Date.parse(new Date(time))
  } else {
    // 时间戳单位是秒，所以需要*1000变成毫秒的单位
    time = parseInt(time) * 1000
  }

  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return dayjs(curTime).format('MM-DD HH:mm:ss')
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * 删除对象空属性值为空的属性
 * @param {Object} obj 传入的对象
 * @param {string|number} chart 自定义过滤值
 * @returns {Object}
 */
export function objectEmpty(obj, chart = '') {
  const cloneObj = {}
  // 深度拷贝 obj
  Object.keys(obj).forEach((item, key) => {
    cloneObj[item] = obj[item]
  })
  Object.keys(cloneObj).forEach((item, key) => {
    if (cloneObj[item] == null || cloneObj[item] == '' || cloneObj[item] == chart) {
      delete cloneObj[item]
    }
  })
  return cloneObj
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * underscore 节流函数，返回函数连续调用时，func 执行频率限定为 次 / wait
 *
 * @param  {function}   func      回调函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @return {function}             返回客户调用函数
 */
export function throttle(fn, delay = 500) {
  let flag = true
  return (...args) => {
    if (!flag) return
    flag = false
    setTimeout(() => {
      fn.apply(this, args)
      flag = true
    }, delay)
  }
}

// 时间戳 =>  yyyy-mm-dd hh:mm:ss
export function dateTimeFormat(time) {
  if (!time) return ''
  const t = parseDate(time)
  if (!t) return
  const month = (t.getMonth() + 1 + '').padStart(2, '0')
  const date = (t.getDate() + '').padStart(2, '0')
  const hour = (t.getHours() + '').padStart(2, '0')
  const minute = (t.getMinutes() + '').padStart(2, '0')
  const second = (t.getSeconds() + '').padStart(2, '0')
  return `${t.getFullYear()}-${month}-${date} ${hour}:${minute}:${second}`
}
function parseDate(date) {
  if (!date && date !== 0) return
  if (date instanceof Date) return new Date(date)
  if (typeof date === 'string' && !/Z$/i.test(date)) {
    const d = date.match(REGEX_PARSE)
    if (d) {
      const m = d[2] - 1 || 0
      const ms = (d[7] || '0').substring(0, 3)
      return new Date(d[1], m, d[3] ||
        1, d[4] || 0, d[5] || 0, d[6] || 0, ms)
    }
  }
  const t = new Date(date)

  if (isNaN(t)) return

  return t // everything else
}

// 获取刻度
export function timeSlot(step) { //  step = 间隔的分钟
  var date = new Date()
  date.setHours(0) // 时分秒设置从零点开始
  date.setSeconds(0)
  date.setUTCMinutes(0)
  // console.log(date.getHours())
  // console.log(date.getSeconds())
  // console.log(new Date(date.getTime()))

  var arr = []; var timeArr = []
  var slotNum = 24 * 60 / step // 算出多少个间隔
  for (var f = 0; f < slotNum; f++) { //  stepM * f = 24H*60M
    // arr.push(new Date(Number(date.getTime()) + Number(step*60*1000*f)))   //  标准时间数组
    var time = new Date(Number(date.getTime()) + Number(step * 60 * 1000 * f)) // 获取：零点的时间 + 每次递增的时间
    var hour = ''; var sec = ''
    time.getHours() < 10 ? hour = '0' + time.getHours() : hour = time.getHours() // 获取小时
    time.getMinutes() < 10 ? sec = '0' + time.getMinutes() : sec = time.getMinutes() // 获取分钟
    timeArr.push(hour + ':' + sec)
  }
  timeArr.push('24:00')
  return timeArr
}
