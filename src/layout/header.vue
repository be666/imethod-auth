<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <header>
    <div class="i-scope">
      <div class="i-row">
        <div class="i-col-8">
          logo
        </div>
        <div class="i-col-4 i-text-al-r">
          <nav class="i-top">
            <ul>
              <li>
                <a href='/home'>个人中心</a>
              </li>
              <li>
                <a href='/console'>控制台</a>
              </li>
              <li>
                <a v-on:click="loginOut">注销</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
  export default {
    components: {},
    data () {
      return {}
    },
    methods: {
      loginOut(){
        this.$http.post(this.$tools.resolveUrl(`/AuthUsers/logout`),function (err) {
          window.location.reload();
        })
      }
    }
  }
</script>
