'use strict';
var tools = require("../../tools");
var uuid = require("uuid");
var async = require("async");
module.exports = function (app) {


  let init = function () {
    var AuthUser = tools.getModelByName("AuthUser");
    var AuthApp = tools.getModelByName("AuthApp");
    var AuthAppUser = tools.getModelByName("AuthAppUser");
    var AuthGroup = tools.getModelByName("AuthGroup");
    var AuthGroupUser = tools.getModelByName("AuthGroupUser");

    async.parallel([
      function (cb) {
        AuthUser.findOrCreate({
            where: {
              id: 1001
            }
          }, {
            id: 1001,
            loginName: "admin",
            userName: "管理员",
            realName: "管理员",
            pwd: tools.ldap_ssha("123456"),
            passWord: tools.md5("123456"),
            sex: 0,
            birthday: "1991-11-06",
            address: "五道口",
            email: "account@imethod.com"
          }, function (err, user) {
            if (err) {
              tools.logger.debug(err);
            }
            cb();
          }
        );

      }, function (cb) {
        AuthApp.findOrCreate({
            where: {
              id: 1001
            }
          }, {
            id: 1001,
            appName: "认证",
            appCode: "auth",
            siteUrl: "/auth",
            siteIp: "",
            appToken: "75df793c7c2545cd9720028c8ef54eee",
            allowAll: 0,
            allowSign: 0
          }, function (err, user) {
            if (err) {
              tools.logger.debug(err);
            }
            cb();
          }
        );
      }, function (cb) {
        AuthApp.findOrCreate({
            where: {
              id: 1002
            }
          }, {
            id: 1002,
            appName: "微信公众号",
            appCode: "auth",
            siteUrl: "/weixin",
            siteIp: "",
            appToken: "50b1960802ab4fddacda9a564e4cac8a",
            allowAll: 0,
            allowSign: 0
          }, function (err, user) {
            if (err) {
              tools.logger.debug(err);
            }
            cb();
          }
        );
      }, function (cb) {
        AuthAppUser.findOrCreate({
            where: {
              id: 1001
            }
          }, {
            id: 1001,
            userId: 1001,
            appId: 1001
          }, function (err, user) {
            if (err) {
              tools.logger.debug(err);
            }
            cb();
          }
        );
      }, function (cb) {
        AuthGroup.findOrCreate({
            where: {
              id: 1001
            }
          }, {
            id: 1001,
            groupName: '管理员',
            groupCode: 'admin',
            appId: 1001
          }, function (err, user) {
            if (err) {
              tools.logger.debug(err);
            }
            cb();
          }
        );
      }, function (cb) {
        AuthGroupUser.findOrCreate({
            where: {
              id: 1001
            }
          }, {
            id: 1001,
            userId: 1001,
            appId: 1001,
            groupId: 1001
          }, function (err, user) {
            if (err) {
              tools.logger.debug(err);
            }
            cb();
          }
        );
      }, function (cb) {

      }, function (cb) {

      }], function () {

    })
  };


  async.mapSeries(app.models(), function (Model, cbx) {
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

};
