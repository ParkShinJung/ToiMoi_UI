/**
 * Created by jiachenpan on 16/11/18.
 */

export function validateURL(str) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(str)
}

export function validateTel(str) {
  const reg1 = /^([0-9]{3})-([0-9]{3,4})-([0-9]{4})$/
  const reg2 = /^([0-9]{10,11})$/
  if (reg1.test(str)) {
    return true
  } else {
    return reg2.test(str)
  }
}

export function validateEmail(str) {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(String(str).toLowerCase())
}

export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

export function validateNumbers(str) {
  const reg = /^[0-9]+$/
  return reg.test(str)
}
