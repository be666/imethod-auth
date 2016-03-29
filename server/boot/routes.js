'use strict';
let proxy = require("../app/proxy");
let path = require('path');
let fileUpload = require("../app/fileupload");
module.exports =  (app) =>{

  app.use('/fileUpload',fileUpload);

  app.get("/auth", function (req, res) {
    res.sendFile(path.resolve(__dirname, '../../client/auth.html'))
  });

  app.get("/login", function (req, res) {
    res.sendFile(path.resolve(__dirname, '../../client/login.html'))
  });

  app.get("/sign", function (req, res) {
    res.sendFile(path.resolve(__dirname, '../../client/sign.html'))
  });

  app.get('/state', app.loopback.status());


  app.use(proxy);

};
