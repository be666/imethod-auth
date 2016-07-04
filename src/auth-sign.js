let {Vue} = require("./common");

var App = Vue.extend({
  components: {
    'router-view': require("./auth/sign.vue")
  }
});

new App({
  el: 'body'
});
