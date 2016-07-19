<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="i-panel">
    <div class="i-panel-header">
      添加应用
    </div>
    <div class="i-panel-body">
      <form
        v-on:submit.prevent="submitForm"
        v-on:reset.prevent="reset">
        <fieldset>
          <legend>应用信息</legend>
          <div class="i-row">
            <label class="i-col-3">应用名称</label>
            <div class="i-col-9">
              <input type="text" v-model="appInfo.appName" required placeholder="">
            </div>
          </div>
          <div class="i-row">
            <label class="i-col-3">站点地址</label>
            <div class="i-col-9">
              <input type="text" v-model="appInfo.siteUrl" required placeholder="">
            </div>
          </div>
          <div class="i-row">
            <label class="i-col-3">IP地址</label>
            <div class="i-col-9">
              <input type="text" v-model="appInfo.siteIp" required placeholder="">
            </div>
          </div>
          <div class="i-row">
            <button type="submit">提交</button>
            <button type="reset">取消&返回</button>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>
<style lang='less'>

</style>
<script type="text/javascript">
  export default {
    data () {
      return {
        appInfo: {}
      }
    },
    ready () {

    },
    methods: {
      submitForm: function () {
        this.$http.post(this.$tools.resolveUrl("/AuthApps/insert"), {
          appName: this.appInfo.appName,
          siteUrl: this.appInfo.siteUrl,
          siteIp: this.appInfo.siteIp
        }, function (res, ste, req) {
          this.$dispatch('link', 'app')
        }).error(function () {
        })
      },
      reset: function () {
        this.$dispatch('link', 'app')
      }
    },
    attached () {

    }
  }
</script>
