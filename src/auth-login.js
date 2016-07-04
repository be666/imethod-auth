let {Vue} = require("./common");

var App = Vue.extend({
  components: {
    'router-view': require("./auth/login.vue")
  }
});

new App({
  el: 'body'
});



