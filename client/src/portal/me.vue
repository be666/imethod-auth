<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="am-panel am-panel-default">
    <div class="am-panel-hd">
      <h3 class="am-panel-title">
        个人中心
      </h3>
    </div>
    <div class="am-panel-bd">
      <form class="am-form am-form-horizontal"
            v-on:submit.prevent="submitForm"
            v-on:reset.prevent="reset">
        <fieldset>
          <legend>用户信息</legend>
          <div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">登陆名</label>
            <div class="am-u-sm-9 am-u-end ">
              <input type="text" v-model="userInfo.loginName" readonly placeholder="">
            </div>
          </div>
          <div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">用户名</label>
            <div class="am-u-sm-9 am-u-end ">
              <input type="text" v-model="userInfo.userName" required placeholder="">
            </div>
          </div>
          <!--<div class="am-form-group">-->
          <!--<label class="am-u-sm-3 am-form-label">真实姓名</label>-->
          <!--<div class="am-u-sm-9 am-u-end ">-->
          <!--<input type="text" v-model="userInfo.realName" required placeholder="">-->
          <!--</div>-->
          <!--</div>-->
          <div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">邮箱</label>
            <div class="am-u-sm-9 am-u-end ">
              <input type="email" v-model="userInfo.email" required placeholder="">
            </div>
          </div>
          <div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">电话</label>
            <div class="am-u-sm-9 am-u-end ">
              <input type="text" v-model="userInfo.telephone" required placeholder="">
            </div>
          </div>
          <!--<div class="am-form-group">-->
          <!--<label class="am-u-sm-3 am-form-label">出生日期</label>-->
          <!--<div class="am-u-sm-9 am-u-end ">-->
          <!--<input type="date" v-model="userInfo.birthday" required placeholder="">-->
          <!--</div>-->
          <!--</div>-->
          <!--<div class="am-form-group">-->
          <!--<label class="am-u-sm-3 am-form-label">联系地址</label>-->
          <!--<div class="am-u-sm-9 am-u-end ">-->
          <!--<input type="text" v-model="userInfo.address" required placeholder="">-->
          <!--</div>-->
          <!--</div>-->
          <!--<div class="am-form-group">-->
          <!--<label class="am-u-sm-3 am-form-label">性别</label>-->
          <!--<div class="am-u-sm-9 am-u-end ">-->
          <!--<i_radio-->
          <!--v-bind:item-list="sexList"-->
          <!--v-bind:choose.sync="userInfo.sex"-->
          <!--sid="sid"-->
          <!--text="name"-->
          <!--&gt;</i_radio>-->
          <!--</div>-->
          <!--</div>-->

          <div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">密码</label>
            <div class="am-u-sm-9 am-u-end ">
              <input type="password" v-model="userInfo.password" required placeholder="">
            </div>
          </div>
          <div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">确认密码</label>
            <div class="am-u-sm-9 am-u-end ">
              <input type="password" v-model="userInfo.password2" required placeholder="">
            </div>
          </div>
          <div class="am-form-group">
            <div class="am-u-sm-10 am-u-sm-offset-2">
              <button type="submit" class="am-btn am-btn-default">提交</button>
              <button type="reset" class="am-btn am-btn-default">取消&返回</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
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
            id: this.$tools.getUserInfo().userId
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
