<template>
  <component :is="currentView" v-bind:user-info="userInfo"></component>
  <section>
    <router-view></router-view>
  </section>
</template>
<script>
  export default  {
    components: {
      home: require("./header_portal.vue"),
      admin: require("./header_admin.vue")
    },
    data () {
      let currentView = 'home';
      if (this.$module.moduleName == 'admin') {
        currentView = 'admin';
      }
      return {
        userInfo: this.userInfo,
        currentView: currentView
      }
    },
    route: {
      data (transition) {
        this.userInfo = this.$tools.getUserInfo();
      }
    }
  }
</script>
