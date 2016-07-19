<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="i-panel">
    <div class="i-panel-header">
      添加应用分组
    </div>
    <div class="i-panel-body">
      <form
        v-on:submit.prevent="submitForm"
        v-on:reset.prevent="reset">
        <fieldset>
          <legend>应用分组信息</legend>
          <div class="i-row">
            <label class="i-col-3">gid</label>
            <div class="i-col-9">
              <input type="text" v-model="groupInfo.gid" required placeholder="">
            </div>
          </div>
          <div class="i-row">
            <label class="i-col-3">分组名称</label>
            <div class="i-col-9">
              <input type="text" v-model="groupInfo.groupName" required placeholder="">
            </div>
          </div>
          <div class="i-row">
            <label class="i-col-3">权限代码</label>
            <div class="i-col-9">
              <input type="text" v-model="groupInfo.groupCode" required placeholder="">
            </div>
          </div>
          <div class="i-row">
            <button type="submit" class="">提交</button>
            <button type="reset" class="">取消&返回</button>
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
        groupInfo: {},
        appId: this.$route.params.appId
      }
    },
    ready () {

    },
    methods: {
      submitForm: function () {
        var $this = this;
        $this.$http.post(this.$tools.resolveUrl("/AuthGroups"), {
          appId: $this.appId,
          gid: $this.groupInfo.gid,
          groupName: $this.groupInfo.groupName,
          groupCode: $this.groupInfo.groupCode
        }, function (res, ste, req) {
          $this.$dispatch('link', 'app-group', {
            appId: $this.appId
          })
        }).error(function () {

        })
      },
      reset: function () {
        this.$dispatch('link', 'app-group', {
          appId: this.appId
        })
      }
    },
    attached () {

    }
  }
</script>
