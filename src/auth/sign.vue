<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <section>
    <div class='i-row i-scope i-al-c'>
      <div class='i-col-6'>
        <h1>
          注册
        </h1>
        <form
          v-on:submit.prevent="sign"
          novalidate="novalidate">
          <input name="utf8" type="hidden" value="✓">
          <div class='i-row'>
            <label class="i-col-4">登陆名</label>
            <input class="i-col-8" type="text" v-model="userInfo.username" id="loginName" required
                   placeholder="">
          </div>
          <div class='i-row'>
            <label class="i-col-4">邮箱</label>
            <input class="i-col-8" type="email" class="am-radius"
                   id="email"
                   v-model="userInfo.email" required placeholder=""
                   pattern="^((([a-zA-Z]|\d|[!#\$%&amp;'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&amp;'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$"
            >
          </div>
          <div class='i-row'>
            <label class="i-col-4">用户名</label>
            <input class="i-col-8" type="text" class="am-radius" v-model="userInfo.realm"
                   id="userName"
                   required placeholder="">
          </div>
          <div class='i-row'>
            <label class="i-col-4" for="user_passWord">密码</label>
            <input class="i-col-8"
                   v-model="userInfo.passWord"
                   required="required" type="password" id="user_passWord">
          </div>
          <div class='i-row'>
            <label class="i-col-4">确认密码</label>
            <input class="i-col-8"
                   v-model="userInfo.passWord2"
                   required="required" type="password"
                   id="user_passWord_confirmation">
          </div>
          <div class='i-row i-al-c'>
            <button class="i-col-8" type="submit" name="commit"
            >注册帐号
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<style lang='less'>
  .i-radio {
    display: inline-block;
    margin: 0 10px 0 10px;
  }
</style>
<script type="text/javascript">
  export default {
    data () {
      return {
        sexList: [{
          sid: '0',
          name: '男'
        }, {
          sid: '1',
          name: '女'
        }],
        userInfo: this.userInfo || {},
        appId: null,
        url: null
      }
    },
    created () {
      let search = window.location.search;
      while (search.startsWith("?")) {
        search = search.substring(1, search.length);
      }
      search = search.split("&");
      let query = {};
      for (let s of search) {
        s = s.split("=");
        query[s[0]] = decodeURIComponent(s[1]);
      }
      this.appId = query.appId || null
    },
    components: {
      'i_header': require("./header.vue")
    },
    ready () {

    },
    methods: {
      sign () {
        var $this = this;
        if (!this.userInfo.passWord2 || this.userInfo.passWord != this.userInfo.passWord2) {
          this.$dialog.error('请确认密码输入是否正确!');
          return false;
        }
        this.$http.post(this.$tools.resolveUrl("/AuthUsers"), {
          "realm": this.userInfo.realm,
          "username": this.userInfo.username,
          "password": this.userInfo.passWord,
          "email": this.userInfo.email,
          "appId": this.appId
        }, function (data, status, request) {
          if (data.siteUrl) {
            window.location.href = $this.$tools.resolveHost($this.siteUrl) + '/login?app_token=' + encodeURIComponent(this.app_token) + '&url=' + encodeURIComponent(data.siteUrl);
          }
        }).error(function (data, status, request) {
          $this.$dialog.error(data.error.message);
        });
        return false
      }
    },
    attached () {

    }
  }
</script>
