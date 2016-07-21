<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <section>
    <div class='i-row i-scope i-al-c'>
      <div class='i-col-6'>
        <h1>登陆</h1>
        <form
          accept-charset="UTF-8"
          v-on:submit.prevent="login"
        >

          <div class='i-row'>
            <label class="i-col-4">账号</label>
            <input class="i-col-8" required="required" type="text" v-model="username" id="userName"/>
          </div>
          <div class='i-row'>
            <label class="i-col-4">密码</label>
            <input class="i-col-8" required="required" type="password" v-model="password" id="passWord"/>
          </div>
          <div class='i-row'>
            <button type="submit" class="i-col-fill" name="commit"> 登陆</button>
          </div>
          <div class='i-row'>
            <button type="button" class="i-col-fill" name="sign" v-on:click="sign">注册</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<style lang='less'>
  .auth-keep {

  }
</style>
<script type="text/javascript">
  export default {
    data () {
      return {
        username: null,
        password: null,
        appId: null
      }
    },
    components: {},
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
    methods: {
      login () {
        let $this = this;
        let query = {
          loginName: this.username,
          password: this.password
        };
        if (this.appId) {
          query.appId = this.appId;
        }
        this.$http.post(this.$tools.resolveUrl("/AuthAppUsers/authLogin"), query, function (data, status, request) {
          let tokenInfo = data.tokenInfo;
          let callbackUrls = data.callbackUrls;
          window.location.href = callbackUrls + "?access_token=" + tokenInfo;
        }).error(function (data, status, request) {
          $this.$dialog.error(data.error.message);
        })
      },
      sign(){
        window.location.href = this.$tools.resolveHost(this.$config.siteUrl) + '/sign?appId=' + encodeURIComponent(this.appId);
      }
    },
    attached () {

    }
  }
</script>
