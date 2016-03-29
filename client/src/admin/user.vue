<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="am-panel am-panel-default">
    <div class="am-panel-hd">
      <h3 class="am-panel-title">
        用户列表
      </h3>
    </div>
    <div class="am-panel-bd">
      <div class="am-btn-toolbar">
        <div class="am-btn-group">
          <div class="am-btn am-btn-default" v-on:click="link('user-add')">
            新增
          </div>
        </div>
      </div>
      <div class="am-panel-bd">
        <i_table
          v-on:table-click="optionInfo"
          v-ref:table
        ></i_table>
      </div>
    </div>
  </div>
</template>
<style lang='less'>

</style>
<script type="text/javascript">
  export default {
    methods: {
      link(pathName, params) {
        this.$dispatch('link', pathName, params)
      },
      optionInfo (pid, oid, data) {
        var $this = this;
        if (oid == 'state') {
          let userId = data.id;
          let state = data.state;
          if (state == 1) {
            $this.$http.put($this.$tools.resolveUrl("/AuthUsers/" + userId), {
              state: 0
            }, function (res, ste, req) {
              $this.$dispatch('refresh')
            })
          } else if (state == 0) {
            $this.$http.put($this.$tools.resolveUrl("/AuthUsers/" + userId), {
              state: 1
            }, function (res, ste, req) {
              $this.$dispatch('refresh')
            })
          }
        }
      }
    },
    events: {
      refresh: function () {
        var $this = this;
        $this.$http.get($this.$tools.resolveUrl("/AuthUsers"), {
          filter: {
            order: 'state DESC'
          }
        }, function (res, ste, req) {
          $this.$refs.table.dataList = res;
        })
      }
    },
    ready () {
      this.$refs.table.dataList = [];
    },
    created (argument) {

    },
    attached () {
      this.$dispatch('refresh')
    },
    compiled: function () {
      var $this = this;
      $this.$refs.table.pk = 'id';
      $this.$refs.table.checkbox = [];
      $this.$refs.table.titleList = [{
        id: "loginName",
        text: "登录名"
      }, {
        id: "realName",
        text: "真实姓名"
      }, {
        id: "sex",
        text: "性别",
        render: function (el, attr, index) {
          if (attr == 0) {
            return '男'
          } else {
            return '女'
          }
        }
      }, {
        id: "birthday",
        text: "出生日期"
      }, {
        id: "email",
        text: "邮箱"
      }, {
        id: "telephone",
        text: "电话"
      }];
      $this.$refs.table.optionList = [{
        className: 'am-btn-sm',
        id: "state",
        render: function (el, index) {
          if (el.state == 1) {
            return "启用";
          } else {
            return "禁用";
          }
        }
      }];
    }
  }

</script>
