<template>
  <section class="home">
    <div>
      <h1 class="title has-text-white">Portfolio Rebalancer</h1>
      <h2 class="subtitle has-text-white">
        <span>that increase portfolio returns and reduce risks.</span>
      </h2>
      <div class="youtube">
        <ResponsiveIframe
          src="https://www.youtube.com/embed/0GWQ93O7mLY?rel=0&amp;showinfo=0&amp;cc_load_policy=1"
        />
      </div>
      <nuxt-link to="/portfolio/try-now" class="button is-primary">Try now</nuxt-link>
      <div class="login">
        <SignupLink text="or Login"></SignupLink>
      </div>
    </div>
  </section>
</template>

<script>
import SignupLink from '~/components/SignupLink';
import ResponsiveIframe from '~/components/base/ResponsiveIframe';

export default {
  components: {
    SignupLink,
    ResponsiveIframe,
  },
  layout: 'home',
};
</script>

<style lang="scss" scoped>
.home {
  align-items: center;
  // https://www.pexels.com/photo/aerial-architectural-design-architecture-buildings-373912/
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
    margin-bottom: 36px;
    font-size: 1.5rem;
    text-shadow: 0px 3px 1px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14),
      0px 1px 5px rgba(0, 0, 0, 0.12);
  }

  .youtube {
    max-width: 500px;
    margin: 0 auto 2rem;
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
