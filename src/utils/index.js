/**
 * Created by PanJiaChen on 16/11/18.
 */


/**
 * 删除对象空属性值为空的属性
 * @param {(Object)} obj 传入的对象
 * @param {(string|number)} chart 自定义过滤值
 * @returns {Object}
 */
export function objectEmpty(obj,chart = ""){
  let cloneObj = {};
  // 深度拷贝 obj
  Object.keys(obj).forEach((item,key)=>{
    cloneObj[item] = obj[item];
  })
  Object.keys(cloneObj).forEach((item,key)=>{
    if(cloneObj[item] == null || cloneObj[item] == "" || cloneObj[item]==chart){
      delete cloneObj[item];
    }
  })
  return cloneObj;
}

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
 * @param {number || string} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time,option) {
  if ((String(time)).length > 12) {
		//“2020-08-10 18:29:24”的字符长度是19，超过了，所以直接进入时间戳的处理里面
		//判断时间戳是否为毫秒单位（不少于13位）或者字符串2020-08-10 18:29:24长度
		time = Date.parse(new Date(time));
	} else {
		// 时间戳单位是秒，所以需要*1000变成毫秒的单位
		time = parseInt(time) * 1000;
	}

  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
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
 * 使用 localStorage 保存数据，代替cookie
 */
 export const Storages = {
  //本地存数据，days 有效时间（天）
  set: function(key, value, days) {
    let Days = days || 7 //有效时间默认7天
    let exp = new Date()
    let expires = exp.getTime() + Days * 24 * 60 * 60 * 1000
 
    localStorage.setItem(
      key,
      JSON.stringify({
        value,
        expires
      })
    )
  },
  get: function(key) {
    let o = JSON.parse(localStorage.getItem(key))
 
    if (o !== null && Date.now() < o.expires) {
      return o.value
    } else {
      return null
    }
  },
  remove: function(key) {
    localStorage.removeItem(key)
  },
  clearAll: function () {
    localStorage.clear()
  }
 }