<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="am-panel am-panel-default">
    <div class="am-panel-hd">
      <h3 class="am-panel-title">
        用户:{{userInfo.loginName}} 您好!
        <a v-link="{name:'me'}" style="float: right">修改个人信息</a>
      </h3>
    </div>
    <div class="am-panel-bd">
      <div class="am-g">
        <template v-for="appInfo in appInfoList">
          <div class="am-u-md-10 am-u-end">
            应用名称:{{appInfo.appName}}<br>
          </div>
          <div class="am-u-md-10 am-u-end">
            应用访问地址:{{appInfo.siteUrl}} <a href="{{appInfo.siteUrl}}">进入</a> <br>
          </div>
          <div class="am-u-md-10 am-u-end" style="margin-bottom: 15px; ">
            <template v-if="appInfo.groupList.length>0">
              角色权限:
              <template v-for="group in appInfo.groupList">
                <span style="margin-left:10px ">{{group.groupName}}</span>
              </template>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<style>
  .portal-keep {

  }
</style>
<script type="text/javascript">
  export default {
    data() {
      return {
        sexList: [{
          sid: '0',
          name: '男'
        }, {
          sid: '1',
          name: '女'
        }],
        appInfoList: {},
        userInfo: this.$tools.getUserInfo()
      }
    },
    methods: {},
    attached () {
      var $this = this;
      this.$http.get(this.$tools.resolveUrl("/AuthApps/me"), function (res, ste, req) {
        $this.appInfoList = res.authApp || [];
      })
    }
  }

</script>
