<template>
  <span class="span" @click="login">{{text}}</span>
</template>

<script>
export default {
  props: ['text'],
  head() {
    return { script: [{ src: 'https://apis.google.com/js/api.js' }] };
  },
  methods: {
    async login() {
      gapi.load('client', async () => {
        await gapi.client.init({
          apiKey: 'AIzaSyCyd31ac-QUrNJy9rF9BbcaeSxzv2T6k_k',
          clientId:
            '279575238032-4iu4orv594ihrgdt791952qk7c1gs4qk.apps.googleusercontent.com',
          scope: 'profile',
        });

        gapi.auth2.getAuthInstance().signIn({
          ux_mode: 'redirect',
          redirect_uri: 'http://localhost:3000/auth/redirect-receiver/',
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.span {
  text-decoration: underline;
  cursor: pointer;
}
</style>
