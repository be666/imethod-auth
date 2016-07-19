/**
 * Created by bcaring on 16/7/17.
 */
var async = require("async");
var tools = require("../../tools");

module.exports = function (app) {

  let init = function () {
    var AuthUser = tools.getModelByName("AuthUser");
    var AuthApp = tools.getModelByName("AuthApp");
    var AuthAppUser = tools.getModelByName("AuthAppUser");
    let loginName = '001';
    AuthUser.findOrCreate({
      where: {
        id: 1001
      }
    }, {
      id: 1001,
      username: `${loginName}`,
      email: `${loginName}@bcaring.com`,
      mobile: `${loginName}`,
      password: '123456',
      realm: '管理员',
      emailVerified: true,
      userType: 1000
    }, function (err, user) {
      if (err) {
        return
      }
      AuthApp.findOne({
        where: {
          name: "auth"
        }
      }, function (err, auth) {
        if (!auth) {
          AuthApp.register(user.id, 'auth', {
            realm: '身份认证',
            authenticationEnabled: true,
            anonymousAllowed: false,
            authUrl: 'http://auth.dev.bcaring.cn/login',
            url: 'http://auth.dev.bcaring.cn',
            callbackUrls: ['http://auth.dev.bcaring.cn/api/AuthApps/oauthCallback']
          }, function (err, authApp) {
            if (err) {
              return
            }
            AuthAppUser.create({
              userId: user.id,
              appId: authApp.id
            }, function (err) {

            })
          })
        }
      });

      AuthApp.findOne({
        where: {
          name: "hook"
        }
      }, function (err, auth) {
        if (!auth) {
          AuthApp.register(user.id, 'hook', {
            realm: 'webhook',
            authenticationEnabled: true,
            anonymousAllowed: false,
            authUrl: 'http://auth.dev.bcaring.cn/login',
            url: 'http://auth.dev.bcaring.cn',
            callbackUrls: ['http://auth.dev.bcaring.cn/api/AuthApps/oauthCallback']
          }, function (err, authApp) {
            if (err) {
              return
            }
            AuthAppUser.create({
              userId: user.id,
              appId: authApp.id
            }, function (err) {

            })
          })
        }
      })

    });
  };


  if (process.env.NODE_ENV != 'bcaring') {
    async.mapSeries(app.models(), function (Model, cbx) {
      // console.log(Model)
      let dataSource = Model.dataSource;
      if (dataSource.name == 'Memory') {
        return cbx();
      }
      dataSource.autoupdate(Model.modelName)
        .then(function (result) {
          cbx(null);
        }).catch(function (err) {
        cbx(err);
      })
    }, function (err, res) {
      if (!err) {
        console.log('init data')
        return init();
      }
    });
  }
};
