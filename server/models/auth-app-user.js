'use strict';
let async = require('async');
let tools = require('../../tools');

module.exports = function (AuthAppUser) {

  AuthAppUser.resolveRelatedModels = function () {
    if (!this.AuthApp) {
      var reg = this.registry;
      this.AuthApp = reg.getModel('AuthApp');
      this.AuthUser = reg.getModel('AuthUser');
    }
  };

  AuthAppUser.bindUser = function (appId, userIds, cb) {
    AuthAppUser.resolveRelatedModels();
    let AuthApp = AuthAppUser.AuthApp;
    let AuthUser = AuthAppUser.AuthUser;
    AuthApp.findOne({
      where: {
        id: appId
      }
    }).then(function (app) {
      if (!app) {
        return cb(tools.getError('无效的应用信息'));
      }
      async.eachSeries(userIds, function (userId, cbx) {
        AuthUser.findOne({
          where: {
            id: userId
          }
        }).then(function (user) {
          if (!user) {
            return cbx(tools.getError('无效的用户信息'));
          }
          AuthAppUser.findOrCreate({
            userId: userId,
            appId: appId
          }).then(function () {
            cbx(null)
          }).catch(function (err) {
            cbx(err)
          })
        }).catch(function (err) {
          cbx(err)
        })
      }, function (err, res) {
        if (err) {
          return cb(err);
        } else {
          return cb(null, 'success');
        }
      });
    }).catch(function (err) {
      return cb(err);
    })

  };

  AuthAppUser.remoteMethod("bindUser", {
    accepts: [
      {arg: 'appId', type: 'number'},
      {arg: 'userIds', type: 'array'}
    ],
    returns: {arg: 'state', type: 'string'},
    http: {path: "/bind", verb: "post"}
  });

  AuthAppUser.authLogin = function (appId, loginName, password, req, res, next) {
    AuthAppUser.resolveRelatedModels();
    let AuthApp = AuthAppUser.AuthApp;
    let AuthUser = AuthAppUser.AuthUser;
    if (!appId) {
      appId = tools.getArg('auth').appId;
    }
    console.log(tools.getArg('auth'));
    AuthApp.findById(appId, function (err, authApp) {
      if (err || !authApp) {
        return next(err ||tools.getError('无效的应用信息'));
      }
      AuthUser.login({username: loginName, password: password}, 'user', function (err, token) {
        if (err) {
          return next(err || tools.getError('用户名密码错误'))
        }
        token = JSON.parse(JSON.stringify(token))
        let user = token.user;
        if (authApp.anonymousAllowed) {
          return next(null, token.id, authApp.callbackUrls[0])
        }
        AuthAppUser.findOne({
          where: {
            appId: appId,
            userId: user.id
          }
        }, function (err, authAppUser) {
          if (err || !authAppUser) {
            return next(err || tools.getError('无效的用户应用信息'));
          }
          return next(null, token.id, authApp.callbackUrls[0])
        })
      });
    });
  };

  AuthAppUser.remoteMethod("authLogin", {
    accepts: [
      {arg: 'appId', type: 'string'},
      {arg: 'loginName', type: 'string', required: true},
      {arg: 'password', type: 'string', required: true},
      {arg: 'req', type: 'object', 'http': {source: 'req'}},
      {arg: 'res', type: 'object', 'http': {source: 'res'}}
    ],
    returns: [
      {arg: 'tokenInfo', type: 'string'},
      {arg: 'callbackUrls', type: 'string'}
    ],
    http: {path: "/authLogin", verb: "post"}
  });
}
;
