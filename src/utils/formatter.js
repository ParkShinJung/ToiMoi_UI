/**
 * Created by jiachenpan on 18/12/05.
 */

export function maskingCustomerName(str) {
  if (str) {
    // const regExp = new RegExp('/(?<=.{1})./')
    // return str.replace(regExp, '*')
    return str
  } else {
    return ''
  }
}

export function maskingCustomerTelNo(str) {
  if (str) {
    // const regExp = new RegExp('/(?<=.{5})./')
    // return str.replace(new RegExp('/(?<=.{5})./'), '*').replace(new RegExp('/(?<=.{6})./'), '*').replace(new RegExp('/(?<=.{9})./'), '*').replace(new RegExp('/(?<=.{10})./'), '*')
    return str
  } else {
    return ''
  }
}

export function formatTelNo(str) {
  if (str) {
    if (str.length === 10) {
      return str.substr(0, 3) + '-' + str.substr(3, 3) + '-' + str.substr(6, 4)
    } else {
      return str.substr(0, 3) + '-' + str.substr(3, 4) + '-' + str.substr(7, 4)
    }
  } else {
    return ''
  }
}

export function addComma(str) {
  const reg = /^[+-]?[\d,]*(\.?\d*)$/
  // const reg = /^[0-9]+$/
  if (reg.test(str)) {
    const regexp = /\B(?=(\d{3})+(?!\d))/g
    return str.toString().replace(regexp, ',')
  } else {
    return str
  }
}

export function removeComma(str) {
  return str.replace(/,/gi, '')
}

export function addHyphen(str) {
  if (str !== undefined && str.length === 9) {
    if (str.substr(0, 2) === '02') {
      return str.substr(0, 2) + '-' + str.substr(2, 3) + '-' + str.substr(5, 3)
    } else {
      return str
    }
  } else if (str !== undefined && str.length === 10) {
    if (str.substr(0, 2) === '02') {
      return str.substr(0, 2) + '-' + str.substr(2, 4) + '-' + str.substr(6, 4)
    } else {
      return str.substr(0, 3) + '-' + str.substr(3, 3) + '-' + str.substr(6, 4)
    }
  } else if (str !== undefined && str.length === 11) {
    return str.substr(0, 3) + '-' + str.substr(3, 4) + '-' + str.substr(7, 4)
  } else {
    return str
  }
}

export function removeHyphen(str) {
  return str.replace(/-/gi, '')
}

// 사용법 : dateFormatter(new Date(), 'yyyy-MM-dd hh:mm:ss')
export function dateFormatter(d, f) {
  if (typeof d === 'string' && f === undefined) {
    f = d
    d = new Date()
  } else if (typeof d !== 'object' || typeof f !== 'string') {
    return ''
  }

  const weekName = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']

  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
    let h
    switch ($1) {
      case 'yyyy': return d.getFullYear()
      case 'yy': return (d.getFullYear() % 1000).zf(2)
      case 'MM': return (d.getMonth() + 1).zf(2)
      case 'dd': return d.getDate().zf(2)
      case 'E': return weekName[d.getDay()]
      case 'HH': return d.getHours().zf(2)
      case 'hh': return ((h = d.getHours() % 12) ? h : 12).zf(2)
      case 'mm': return d.getMinutes().zf(2)
      case 'ss': return d.getSeconds().zf(2)
      case 'a/p': return d.getHours() < 12 ? '오전' : '오후'
      default: return $1
    }
  })
}

String.prototype.string = function(len) { // eslint-disable-line
  var s = ''
  var i = 0
  while (i++ < len) {
    s += this
  }
  return s
}
String.prototype.zf = function(len) { // eslint-disable-line
  return '0'.string(len - this.length) + this
}
Number.prototype.zf = function(len) { // eslint-disable-line
  return this.toString().zf(len)
}
