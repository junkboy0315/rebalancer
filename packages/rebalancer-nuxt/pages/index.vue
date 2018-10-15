<template>
  <section class="home">
    <div>
      <h1 class="title has-text-white">Portfolio Rebalancer</h1>
      <h2 class="subtitle has-text-white">
        <span>面倒なリバランスの計算を楽に行うためのツールです。
          <br>株式、投資信託、仮想通貨など、幅広くご利用いただけます。
        </span>
      </h2>
      <nuxt-link to="portfolio" class="button is-primary">使ってみる</nuxt-link>
      <div class="login">
        <SignupLink text="またはログインする"></SignupLink>
      </div>
    </div>
  </section>
</template>

<script>
import SignupLink from '~/components/SignupLink';

export default {
  components: {
    SignupLink,
  },
  layout: 'home',
};
</script>

<style lang="scss" scoped>
.home {
  align-items: center;
  background: url('~assets/top-background.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  text-align: center;

  .title {
    font-size: 3.5rem;
    font-weight: 700;
    letter-spacing: 3px;
    line-height: 1;
    margin-bottom: 35px;
    text-shadow: 0px 3px 1px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14),
      0px 1px 5px rgba(0, 0, 0, 0.12);
  }

  .subtitle {
    line-height: 2rem;
    margin-bottom: 56px;
    text-shadow: 0px 3px 1px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14),
      0px 1px 5px rgba(0, 0, 0, 0.12);
  }

  .button {
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    font-size: 1.25rem;
    height: 54px;
    width: 280px;
    margin-bottom: 1rem;
  }

  .login {
    color: white;
  }
}
</style>
