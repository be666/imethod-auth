'use strict';
let Vue = require('vue');
let VueRouter = require('vue-router');
let VueResource = require('vue-resource');
let x = require('./plugin/dialog.less');
Vue.config.debug = true;

Vue.use(function (vue) {
  vue.prototype.$tools = require('./tools');
  vue.prototype.$auth = require('./auth');
  vue.prototype.$dialog = require('./plugin/dialog.js');
  vue.prototype.$config = require('./config');
  vue.prototype.$module = {
    moduleName: ''
  };
});


//layout
Vue.use(VueRouter);
Vue.use(VueResource);
//component

Vue.component('i_file', require("./component/file.vue"));
Vue.component('i_nav', require("./component/nav.vue"));
Vue.component('i_pagination', require("./component/pagination.vue"));
Vue.component('i_search', require("./component/search.vue"));
Vue.component('i_select_multi', require("./component/select-multi.vue"));
Vue.component('i_select_single', require("./component/select-single.vue"));
Vue.component('i_table', require("./component/table.vue"));
Vue.component('i_radio', require("./component/radio.vue"));
//directive


//filter

Vue.filter('equal', function (v1, v2) {
  return v1 == v2;
});

Vue.filter('gt0', function (arr) {
  let a = arr || 0;
  return a > 0;
});

export {Vue};

