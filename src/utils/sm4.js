// const sm4 = require('sm-crypto').sm4
import {sm4} from 'sm-crypto'
 
//const key='7f5cd501e5548914edaed6824d3ff79d'//可以为16进制串或字节数组，要求为128比特
/**
 * 加密
 * @param txt
 * @returns {*}
 */
export function encrypt(txt,key) {

  return sm4.encrypt(txt,key);
}
 
export function decrypt(txt,key) {
  return sm4.decrypt(txt,key);
}