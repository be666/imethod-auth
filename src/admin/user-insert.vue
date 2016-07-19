<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="i-panel">
    <div class="i-panel-header">
      添加用户
    </div>
    <div class="i-panel-body">
      <form
        v-on:submit.prevent="submitForm"
        v-on:reset.prevent="reset">
        <fieldset>
          <legend>用户信息</legend>
          <div class="i-row">
            <label class="i-col-3">登陆名</label>
            <div class="i-col-9">
              <input type="text" v-model="userInfo.loginName" required placeholder="">
            </div>
          </div>
          <div class="i-row">
            <label class="i-col-3">用户名</label>
            <div class="i-col-9">
              <input type="text" v-model="userInfo.userName" required placeholder="">
            </div>
          </div>
          <div class="i-row">
            <label class="i-col-3">真实姓名</label>
            <div class="i-col-9">
              <input type="text" v-model="userInfo.realName" required placeholder="">
            </div>
          </div>
          <div class="i-row">
            <label class="i-col-3">邮箱</label>
            <div class="i-col-9">
              <input type="email" v-model="userInfo.email" required placeholder="">
            </div>
          </div>
          <div class="i-row">
            <label class="i-col-3">电话</label>
            <div class="i-col-9">
              <input type="text" v-model="userInfo.telephone" required placeholder="">
            </div>
          </div>
          <div class="i-row">
            <label class="i-col-3">出生日期</label>
            <div class="i-col-9">
              <input type="date" v-model="userInfo.birthday" required placeholder="">
            </div>
          </div>
          <div class="i-row">
            <label class="i-col-3">联系地址</label>
            <div class="i-col-9">
              <input type="text" v-model="userInfo.address" required placeholder="">
            </div>
          </div>
          <div class="i-row">
            <label class="i-col-3">性别</label>
            <div class="i-col-9">
              <i_radio
                v-bind:item-list="sexList"
                v-bind:choose.sync="userInfo.sex"
                sid="sid"
                text="name"
              ></i_radio>
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
    route: {
      canReuse(transition){
        return false;
      }
    },
    data () {
      return {
        sexList: [{
          sid: '0',
          name: '男'
        }, {
          sid: '1',
          name: '女'
        }],
        userInfo: {}
      }
    },
    ready () {

    },
    methods: {
      submitForm () {
        let $this = this;
        this.$http.post(this.$tools.resolveUrl("/AuthUsers"), {
          loginName: this.userInfo.loginName,
          realName: this.userInfo.realName,
          userName: this.userInfo.userName,
          email: this.userInfo.email,
          sex: this.userInfo.sex,
          address: this.userInfo.address,
          birthday: this.userInfo.birthday,
          telephone: this.userInfo.telephone
        }, function (res, ste, req) {
          this.$dispatch('link', 'user')
        }).error(function () {
          $this.$dialog.error('请稍后重试!');
        })
      },
      reset () {
        this.$dispatch('link', 'user')
        this.userInfo = {};
      }
    },
    attached () {

    }
  }
</script>
