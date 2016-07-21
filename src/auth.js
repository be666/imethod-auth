let valid = (app, success, error) => {
  if (!getUserInfo()) {
    app.$http.post(app.$tools.resolveUrl("/AuthUsers/me"), function (data, status, request) {
      if (data) {
        setUserInfo(data);
        success()
      } else {
        setUserInfo(null);
        error();
      }
    }).error(function () {
      error();
    });
  } else {
    success();
  }
};

let login = (userInfo) => {
  setUserInfo(userInfo);
};
let loginOut = () => {
  setUserInfo(null);
};


let getEUID = function (len, radix) {
  var chars = 'abcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [], i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
};

let CurrentContext = {};
let checkCurrentContext = function () {
  if (!CurrentContext.id) {
    CurrentContext.id = getEUID();
  }
  return CurrentContext;
};


let putCurrentContext = function (name, obj) {
  var context = checkCurrentContext();
  context[name] = obj;
};


let getCurrentContext = function (name) {
  var context = checkCurrentContext();
  return context[name];
};


let getUserInfo = function () {
  return getCurrentContext("userInfo");
};


let setUserInfo = function (obj) {
  if (obj != null) {
    obj.userRule = obj.userRule || [];
  }
  putCurrentContext("userInfo", obj);
};

export {valid,
  login,loginOut,
  getUserInfo
};
