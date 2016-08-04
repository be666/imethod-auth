/**
 * Created by bqxu on 15/12/14.
 */
let {apiUrl} = require("./config.js");


String.prototype.startsWith = String.prototype.startsWith || function (str) {
    return !(str == null || str == "" || this.length == 0 || str.length > this.length) &&
      (this.substr(0, str.length) == str);
  };
String.prototype.endsWith = String.prototype.endsWith || function (str) {
    return !(str == null || str == "" || this.length == 0 || str.length > this.length) &&
      (this.substring(this.length - str.length) == str);
  };
Array.prototype.find = Array.prototype.find || function (fn, thisArg) {
    if (typeof  fn != "function") {
      throw new TypeError("fn不是一个有效的函数");
    }
    var arr = this;
    for (var i = 0, length = arr.length; i < length; i++) {
      if (fn.call(thisArg, arr[i], i, arr)) {
        return arr[i];
      }
    }
  };
Array.prototype.findIndex = Array.prototype.findIndex || function (fn, thisArg) {
    if (typeof  fn != "function") {
      throw new TypeError("fn不是一个有效的函数");
    }
    var arr = this;
    for (var i = 0, length = arr.length; i < length; i++) {
      if (fn.call(thisArg, arr[i], i, arr)) {
        return i;
      }
    }
    return -1;
  };
let isNotEmptyStr = function (str) {
  return (typeof str == 'string' && str.length > 0);
};


let isNotObj = function (obj) {
  return (typeof obj == "undefined" || obj == null);
};

let getDateTimeStr = function (currentDate) {
  currentDate = new Date(currentDate);
  let fmt = "yyyy-MM-dd hh:mm:ss";
  let o = {
    "M+": currentDate.getMonth() + 1, //月份
    "d+": currentDate.getDate(), //日
    "h+": currentDate.getHours(), //小时
    "m+": currentDate.getMinutes(), //分
    "s+": currentDate.getSeconds(), //秒
    "q+": Math.floor((currentDate.getMonth() + 3) / 3), //季度
    "S": currentDate.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (currentDate.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

let getCurrentDateTimeStr = function () {
  return getDateTimeStr(new Date());
};


let getDateStr = function (currentDate) {
  currentDate = new Date(currentDate);
  let fmt = "yyyy-MM-dd";
  let o = {
    "M+": currentDate.getMonth() + 1, //月份
    "d+": currentDate.getDate(), //日
    "h+": currentDate.getHours(), //小时
    "m+": currentDate.getMinutes(), //分
    "s+": currentDate.getSeconds(), //秒
    "q+": Math.floor((currentDate.getMonth() + 3) / 3), //季度
    "S": currentDate.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (currentDate.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

let inArray = function (arr, el, comp) {
  arr = arr || [];
  for (var i = 0, k = arr.length; i < k; i++) {
    if (typeof comp == "function") {
      if (comp(arr[i], el)) {
        return true;
      }
    }
    else if (el == arr[i]) {
      return true;
    }
  }
};


let resolveUrl = function (url) {
  while (url.indexOf("/") == 0) {
    url = url.substring(1, url.length);
  }
  return apiUrl + "/" + url
};

let loadCode = function ($http, codeType, cb) {
  $http.get(this.resolveUrl("/Codes"), {
    filter: {
      where: {
        codeType: codeType
      }
    }
  }, function (data, status, request) {
    cb(data)
  }).error(function (data, status, request) {

  })
};


let buildMap = function (list, code, codeName) {
  var map = {};
  list = list || [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    map[item[code]] = item[codeName];
  }
  return map;
};

let resolveHost = function (host) {
  if (!host || host == '') {
    host = window.location.host;
  }
  if (host.indexOf("://") == -1) {
    host = "http://" + host;
  }
  while (host.endsWith("/")) {
    host = host.substring(0, host.length - 1);
  }
  return host;
};

export {
  isNotEmptyStr, isNotObj,
  getDateTimeStr, getCurrentDateTimeStr, getDateStr,
  inArray,
  resolveUrl, loadCode, buildMap,
  resolveHost
}
