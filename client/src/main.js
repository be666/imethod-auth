let {Vue} = require("./common");
let VueRouter = require('vue-router');
let {auth}=require('./config');
let {inArray} = require('./tools');
let {valid} = require('./auth');
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
    subRoutes: {
      "/": {
        component: require("./layout/app.vue"),
        subRoutes: {
          "me": {
            name: "me",
            component: require("./portal/me.vue")
          }
          ,
          "home": {
            name: "home",
            component: require("./portal/home.vue")
          }
        }
      },
      "login": {
        name: "login",
        component: require("./sys/login.vue")
      },
      "sign": {
        name: "sign",
        component: require("./sys/sign.vue")
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
      transition.redirect("/login")
    });
  }
});

router.start(App, 'body');
