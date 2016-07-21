<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="i-panel">
    <div class="i-panel-header">
      用户:{{userInfo.realm}} 您好!
      <a v-link="{name:'me'}" style="float: right">修改个人信息</a>
    </div>
    <div class="i-panel-body">
      <div class="i-row">
        <template v-for="appInfo in appInfoList">
          <div class="i-col-12">
            应用名称:{{appInfo.app.realm}}<br>
          </div>
          <div class="i-col-12">
            应用访问地址:{{appInfo.app.url}} <a class="i-link" href="{{appInfo.app.url}}">进入</a> <br>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<style>
 a.i-link{
   color: #0e90d2;
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
        appInfoList: [],
        userInfo: this.$auth.getUserInfo(),
        userId: this.$auth.getUserInfo().id
      }
    },
    methods: {},
    attached () {
      var $this = this;
      this.$http.get(this.$tools.resolveUrl("/AuthAppUsers"), {
        filter: {
          where: {
            userId: $this.userId
          },
          include: "app"
        }
      }, function (res, ste, req) {
        $this.appInfoList = res;
      })
    }
  }

</script>
