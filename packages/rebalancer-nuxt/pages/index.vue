<template>
  <section class="home container">
    <div>
      <h1 class="title">
        Portfolio Rebalancer
      </h1>
      <h2 class="subtitle">
        <p>面倒なリバランスの計算を楽に行うためのツールです。</p>
        <p>株式、投資信託、仮想通貨など、幅広くご利用いただけます。</p>
      </h2>
      <nuxt-link to="a"><button class="button">使ってみる</button></nuxt-link>

    </div>
  </section>
</template>

<script>
export default {
  layout: 'home',
};
</script>

<style lang="scss">
.home.container {
  align-items: center;
  background-size: cover;
  background: url('~assets/top-background.jpg') no-repeat center center;
  color: white;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  text-shadow: 0px 3px 1px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14),
    0px 1px 5px rgba(0, 0, 0, 0.12);

  .title {
    display: block;
    font-size: 3.5rem;
    font-weight: bold;
    letter-spacing: 3px;
    line-height: 1;
    margin-bottom: 35px;
  }

  .subtitle {
    font-size: 1.25rem;
    font-weight: 300;
    line-height: 2rem;
    margin-bottom: 35px;
    padding-bottom: 15px;
    word-spacing: 5px;
  }

  .button {
    background: #d84f00;
    border-radius: 10px;
    border: 0;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    color: white;
    cursor: pointer;
    font-size: 1.25rem;
    height: 54px;
    width: 280px;
  }
}
</style>
