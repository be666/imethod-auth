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
    <div class="i-panel-body">
      <div class="i-row">
        <div class="i-col-12">
          应用:{{authApp.appName}}
          <span class="" v-if="authApp.allowAll">开放访问</span>
          <span class="" v-if="authApp.allowSign">开放注册</span>
        </div>
      </div>
    </div>
    <div class="i-panel-body">
      用户数:{{authApp.appUser.length}}
      <a class=""
         v-on:click="link('app-user',{appId:authApp.id})">用户管理</a>
      <br>
      用户分组:
      <a class="" v-on:click="link('app-group',{appId:authApp.id})">分组管理</a>
      <br>
      <template v-for="aGroup in authApp.appGroup">
        {{aGroup.groupName}}:({{aGroup.groupUser.length}}人)
        <br>
      </template>
    </div>
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
          include: [{
            relation: 'appUser'
          }, {
            'appGroup': 'groupUser'
          }]
        }
      }, function (res, ste, req) {
        $this.authApps = res;
      });
    }
  }
</script>
