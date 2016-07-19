let {Vue} = require("./common");
let VueRouter = require('vue-router');
//main

Vue.use(VueRouter);

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
  let $this = transition.to.router.app;
  if ($this.$tools.inArray($this.$auth.ignore, transition.to.path)) {
    transition.next()
  } else {
    $this.$auth.valid($this, function () {
      transition.next();
    }, function () {
      window.location.href = "/";
    });
  }
});

router.start(App, 'body');
