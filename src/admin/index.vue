<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="i-panel">
    <div class="i-panel-header">
      系统信息
    </div>
    <div class="i-panel-body">
      <div class="i-row">
        <div class="i-col-12">
          用户数:{{userCount}} <a class="" v-on:click="link('user-add')">新增</a><br>
          应用数:{{appCount}} <a class="" v-on:click="link('app-add')">新增</a><br>
        </div>
      </div>
    </div>
    <template v-for="authApp in authApps">
      <div class="i-panel-body">
        <div class="i-row">
          <div class="i-col-12">
            应用:{{authApp.realm}}
            <span class="" v-if="authApp.anonymousAllowed">开放访问</span>
          </div>
        </div>
        <div class="i-col">
          <div class="i-col-12">
            用户数:{{authApp.appUser.length}}
            <a class=""
               v-on:click="link('app-user',{appId:authApp.id})">用户管理</a>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<style lang='less'>
  .admin-keep {

  }
</style>
<script type="text/javascript">
  export default {
    data () {
      return {
        userCount: 0,
        appCount: 0,
        authApps: []
      }
    },
    ready () {

    },
    methods: {
      link: function (pathName, params) {
        var $this = this;
        $this.$dispatch('link', pathName, params)
      }
    },

    attached () {
      var $this = this;
      $this.$http.get(this.$tools.resolveUrl("/AuthUsers/count"), function (res, ste, req) {
        $this.userCount = res.count;
      });
      $this.$http.get(this.$tools.resolveUrl("/AuthApps/count"), function (res, ste, req) {
        $this.appCount = res.count;
      });
      $this.$http.get(this.$tools.resolveUrl("/AuthApps"), {
        filter: {
          where: {
            state: 1
          },
          include: "appUser"
        }
      }, function (res, ste, req) {
        $this.authApps = res;
      });
    }
  }
</script>
