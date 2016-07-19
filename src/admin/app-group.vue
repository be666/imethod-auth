<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="i-panel">
    <div class="i-panel-header">
      应用分组列表
    </div>
    <div class="i-btn-g">
      <button
        v-on:click="groupAdd()">
        新增
      </button>
      <button
        v-bind:class="[$refs.table.checkbox.length==1?'':'am-disabled']"
        v-on:click="groupUserCtl()">
        用户管理
      </button>
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
  export default {
    data () {
      return {
        appId: this.$route.params.appId
      }
    },
    methods: {
      link(pathName, params) {
        this.$dispatch('link', pathName, params)
      },
      optionInfo (pid, oid, data) {
        var $this = this;
        if (oid == 'state') {
          let groupId = data.id;
          let state = data.state;
          if (state == 1) {
            $this.$http.put($this.$tools.resolveUrl("/AuthGroups/" + groupId), {
              state: 0
            }, function (res, ste, req) {
              $this.$dispatch('refresh')
            })
          } else if (state == 0) {
            $this.$http.put($this.$tools.resolveUrl("/AuthGroups/" + groupId), {
              state: 1
            }, function (res, ste, req) {
              $this.$dispatch('refresh')
            })
          }
        }
      },
      groupAdd(){
        this.$dispatch('link', 'app-group-add', {
          appId: this.appId
        })
      },
      groupUserCtl(){
        var $index = this.$refs.table.checkbox[0];
        var data = JSON.parse(JSON.stringify(this.$refs.table.dataList[$index]));
        this.$dispatch('link', 'app-group-user', {
          appId: this.appId,
          groupId: data.id
        })
      }
    },
    events: {
      refresh: function () {
        var $this = this;
        $this.$http.get($this.$tools.resolveUrl("/AuthGroups"), {
          filter: {
            where: {
              appId: $this.appId
            },
            include: 'groupUser'
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
      this.$dispatch('refresh');
    },
    compiled: function () {
      var $this = this;
      $this.$refs.table.pk = 'id';
      $this.$refs.table.checkbox = [];
      $this.$refs.table.titleList = [{
        id: "gid",
        text: "分组id"
      }, {
        id: "groupName",
        text: "分组名称"
      }, {
        id: "groupUser",
        text: "分组人数",
        render: function (el, attr, index) {
          return attr.length;
        }
      }];
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
