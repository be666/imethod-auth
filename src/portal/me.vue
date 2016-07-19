<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="i-panel">
    <div class="i-panel-header">
      个人中心
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
              <input type="text" v-model="userInfo.loginName" readonly placeholder="">
            </div>
          </div>
          <div class="i-row">
            <label class="i-col-3">用户名</label>
            <div class="i-col-9">
              <input type="text" v-model="userInfo.userName" required placeholder="">
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
            <label class="i-col-3">密码</label>
            <div class="i-col-9">
              <input type="password" v-model="userInfo.password" required placeholder="">
            </div>
          </div>
          <div class="i-row">
            <label class="i-col=3">确认密码</label>
            <div class="i-col-9">
              <input type="password" v-model="userInfo.password2" required placeholder="">
            </div>
          </div>
          <div class="i-row">
            <div class="i-btn-g">
              <button type="submit">提交</button>
              <button type="reset">取消&返回</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>
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
        userInfo: {}
      }
    },
    methods: {
      link (pathName, params) {
        this.$dispatch('link', pathName, params)
      },
      reset(){
        this.$dispatch('link', 'root')
      },
      submitForm(){
        if (this.userInfo.password != this.userInfo.password2) {
          this.$dialog.error('请确认正确的密码格式!');
          return false;
        }
        this.$http.post(this.$tools.resolveUrl("/AuthUsers/modify"), {
          id: this.userInfo.id,
          userName: this.userInfo.userName,
          email: this.userInfo.email,
          telephone: this.userInfo.telephone,
          passWord: this.userInfo.password
        }, function (res, ste, req) {
          window.location.reload();
        }).error(function (err) {
          this.$dialog.error(err.error.message);
        })
      }
    },
    attached () {
      this.$http.get(this.$tools.resolveUrl("/AuthUsers/"), {
        filter: {
          where: {
            id: (this.$auth.getUserInfo() || {}).userId
          }
        }
      }, function (res, ste, req) {
        if (res.length > 0) {
          this.userInfo = res[0];
        }
      })
    }
  }

</script>
