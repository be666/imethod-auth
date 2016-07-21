let {Vue} = require("./common");
let root = require('./layout/root.vue');
root.components['router-view'] = require("./auth/sign.vue");
var App = Vue.extend({
  components: {
    'router-view': root
  }
});

new App({
  el: 'body'
});



