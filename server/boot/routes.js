'use strict';
let path = require('path');
let fileUpload = require("../app/fileupload");
module.exports = (app) => {

  app.use('/fileUpload', fileUpload);

  app.get('/state', app.loopback.status());

};
