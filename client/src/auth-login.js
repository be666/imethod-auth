let {Vue} = require("./common");

var App = Vue.extend({
  components: {
    'i_content': require("./auth/login.vue")
  }
});

new App({
  el: 'body'
});



