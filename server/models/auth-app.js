module.exports = function (AuthApp) {

  AuthApp.insert = function (appName, authUrl, url, callbackUrls, res, next) {
    AuthApp.register(appName, {
      realm: appName,
      authenticationEnabled: true,
      anonymousAllowed: false,
      authUrl: authUrl,
      url: url,
      callbackUrls: callbackUrls
    }, function (err, authApp) {
      if (err) {
        return next(err);
      }
      next(null, authApp)
    })
  };

  AuthApp.remoteMethod("insert", {
    accepts: [
      {arg: 'appName', type: 'string'},
      {arg: 'authUrl', type: 'string'},
      {arg: 'url', type: 'string'},
      {arg: 'callbackUrls', type: 'string'},
      {arg: 'res', type: 'object', 'http': {source: 'res'}}
    ],
    returns: {type: 'Object', root: true},
    http: {path: "/insert", verb: "post"}
  });

  AuthApp.oauthCallback = function (tokenInfo, res) {
    res.cookie('access_token', tokenInfo, {signed: true});
    res.redirect("/");
  };

  AuthApp.remoteMethod("oauthCallback", {
    accepts: [
      {arg: 'tokenInfo', type: 'string'},
      {arg: 'res', type: 'object', 'http': {source: 'res'}}
    ],
    http: {path: "/oauthCallback", verb: "get"}
  });
};
