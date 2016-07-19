<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="i-panel">
    <div class="i-panel-header">
      应用列表
    </div>
    <div class="i-panel-tools">
      <div class="i-btn-g i-in-flex">
        <button v-on:click="link('app-add')">
          新增
        </button>
        <button
          v-bind:class="[$refs.table.checkbox.length==1?'':'i-disabled']"
          v-on:click="groupCtl()">
          分组管理
        </button>
        <button
          v-bind:class="[$refs.table.checkbox.length==1?'':'i-disabled']"
          v-on:click="userCtl()">
          用户管理
        </button>
      </div>
    </div>
    <div class="i-panel-body">
      <i_table
        v-on:table-click="optionInfo"
        v-ref:table
      ></i_table>
    </div>
  </div>
</template>
<style lang='less'>

</style>
<script type="text/javascript">
  module.exports = {
    data: function () {
      return {}
    },
    methods: {
      link (pathName, params) {
        var $this = this;
        $this.$dispatch('link', pathName, params)
      },
      optionInfo (pid, oid, data) {
        var $this = this;
        if (oid == 'state') {
          let appId = data.id;
          let state = data.state;
          if (state == 1) {
            $this.$http.put($this.$tools.resolveUrl("/AuthApps/" + appId), {
              state: 0
            }, function (res, ste, req) {
              $this.$dispatch('refresh')
            })
          } else if (state == 0) {
            $this.$http.put($this.$tools.resolveUrl("/AuthApps/" + appId), {
              state: 1
            }, function (res, ste, req) {
              $this.$dispatch('refresh')
            })
          }
        }
      },
      groupCtl(){
        var $index = this.$refs.table.checkbox[0];
        var data = JSON.parse(JSON.stringify(this.$refs.table.dataList[$index]));
        this.$dispatch('link', 'app-group', {
          appId: data.id
        })
      },
      userCtl(){
        var $index = this.$refs.table.checkbox[0];
        var data = JSON.parse(JSON.stringify(this.$refs.table.dataList[$index]));
        this.$dispatch('link', 'app-user', {
          appId: data.id
        })
      }
    },
    events: {
      refresh: function () {
        var $this = this;
        $this.$http.get($this.$tools.resolveUrl("/AuthApps"), {
          filter: {
            order: 'state DESC'
          }
        }, function (res, ste, req) {
          $this.$refs.table.dataList = res;
        })
      }
    },
    ready () {
      var $this = this;
      $this.$refs.table.dataList = [];
    },
    created (argument) {

    },
    attached () {
      this.$dispatch('refresh')
    },
    compiled () {
      var $this = this;
      $this.$refs.table.pk = 'id';
      $this.$refs.table.checkbox = [];
      $this.$refs.table.titleList = [{
        id: "appName",
        text: "应用名称"
      }, {
        id: "siteUrl",
        text: "站点地址"
      }
//        , {
//        id: "appToken",
//        text: "token",
//        render: function (el, attr, i) {
//          return attr;
//        }
//      }
      ];
      $this.$refs.table.optionList = [{
        className: 'i-btn-sm',
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
