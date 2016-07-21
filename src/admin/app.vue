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
          v-bind:class="[$refs.table.checkbox&&$refs.table.checkbox.length==1?'':'i-disabled']"
          v-on:click="userCtl()">
          用户管理
        </button>
      </div>
    </div>
    <div class="i-panel-body">
      <i_table_server
        v-on:table-click="optionInfo"
        v-bind:query="query"
        v-bind:where="where"
        page-size="10"
        page-index="1"
        v-bind:data-url="dataUrl"
        v-bind:count-url="countUrl"
        v-ref:table
      >
      </i_table_server>
    </div>
  </div>
</template>
<style lang='less'>

</style>
<script type="text/javascript">
  module.exports = {
    data: function () {
      var $this = this;
      return {
        dataUrl: $this.$tools.resolveUrl(`/AuthApps?filter[limit]={pageSize}&filter[skip]={pageSkip}`),
        countUrl: $this.$tools.resolveUrl(`/AuthApps/count`),
        query: {
          filter: {
            order: 'state DESC'
          }
        },
        where: {}
      }
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
      userCtl(){
        if (this.$refs.table.checkbox.length != 1) {
          return
        }
        var $index = this.$refs.table.checkbox[0];
        let data = this.$refs.table.dataList.find(function (x) {
          return x.id = $index;
        });
        this.$dispatch('link', 'app-user', {
          appId: data.id
        })
      }
    },
    events: {

    },
    ready () {
      var $this = this;
    },
    created (argument) {

    },
    attached () {
      this.$dispatch('refresh')
    },
    compiled () {
      var $this = this;
      $this.$refs.table.checkbox = [];
      $this.$refs.table.titleList = [{
        id: "realm",
        text: "应用名称"
      }, {
        id: "url",
        text: "站点地址"
      }];
    }
  }

</script>
