<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="am-panel am-panel-default">
    <div class="am-panel-hd">
      <h3 class="am-panel-title">
        系统信息
      </h3>
    </div>
    <div class="am-panel-bd">
      <div class="am-g">
        <div class="am-u-md-10 am-u-end">
          用户数:{{userCount}} <a class="am-btn am-btn-link" v-on:click="link('user-add')">新增</a><br>
          应用数:{{appCount}} <a class="am-btn am-btn-link" v-on:click="link('app-add')">新增</a><br>
        </div>
      </div>
    </div>
  </div>
  <div class="am-panel am-panel-default" v-for="authApp in authApps">
    <div class="am-panel-hd">
      <h3 class="am-panel-title">
        应用:{{authApp.appName}}
        <span class="am-badge am-badge-success" v-if="authApp.allowAll">开放访问</span>
        <span class="am-badge am-badge-success" v-if="authApp.allowSign">开放注册</span>
      </h3>
    </div>
    <div class="am-panel-bd">
      用户数:{{authApp.appUser.length}}
      <a class="am-btn am-btn-link"
         v-on:click="link('app-user',{appId:authApp.id})">用户管理</a>
      <br>
      用户分组:
      <a class="am-btn am-btn-link" v-on:click="link('app-group',{appId:authApp.id})">分组管理</a>
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
