let {Vue} = require("./common");
let VueRouter = require('vue-router');
let {auth}=require('./config');
let {inArray} = require('./tools');
let {valid} = require('./auth');


Vue.use(function (vue) {
  vue.prototype.$module = {
    moduleName: 'admin'
  };
});

//main
let App = Vue.extend({
  events: {
    link: function (pathName, params) {
      router.go({
        name: pathName,
        params: params || {}
      })
    }
  }
});

let router = new VueRouter();
router.map({
  '/': {
    name: "root",
    component: require("./layout/root.vue"),
    admin: true,
    subRoutes: {
      "/": {
        component: require("./layout/app.vue"),
        subRoutes: {
          "home": {
            name: "home",
            component: require("./admin/index.vue")
          },
          "user": {
            name: "user",
            component: require("./admin/user.vue")
          },
          "user/insert": {
            name: "user-add",
            component: require("./admin/user-insert.vue")
          },
          "app": {
            name: "app",
            component: require("./admin/app.vue")
          },
          "app/insert": {
            name: "app-add",
            component: require("./admin/app-insert.vue")
          },
          "app/:appId/user": {
            name: "app-user",
            component: require("./admin/app-user.vue")
          },
          "app/:appId/group": {
            name: "app-group",
            component: require("./admin/app-group.vue")
          },
          "app/:appId/group/insert": {
            name: "app-group-add",
            component: require("./admin/app-group-insert.vue")
          },
          "app/:appId/group/:groupId/user": {
            name: "app-group-user",
            component: require("./admin/app-group-user.vue")
          },
        }
      }
    },
    "*": {
      "name": "40x",
      component: require("./sys/40x.vue")
    }
  }
});

router.redirect({
  "/": "/home"
});

router.beforeEach(function (transition) {
  if (auth.ignoreAll) {
    transition.next()
  } else if (inArray(auth.ignore, transition.to.path)) {
    transition.next()
  } else {
    valid(transition.to.router.app, function () {
      transition.next();
    }, function () {
      window.location.href = "/";
    });
  }
});

router.start(App, 'body');



