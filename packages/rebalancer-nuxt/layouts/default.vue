<template>
  <div>

    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <!-- brand name -->
          <nuxt-link to="portfolio" class="navbar-item">
            Portfolio Rebalancer
          </nuxt-link>
          <!-- humberger icon -->
          <a :class="{'is-active': isHumbergerOpen}" @click="toggleHumberger" role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div :class="{'is-active': isHumbergerOpen}" class="navbar-menu">
          <div class="navbar-end">
            <!-- menu items -->
            <nuxt-link @click.native="closeHumberger" to="portfolio" class="navbar-item">
              Portfolio
            </nuxt-link>
            <nuxt-link @click.native="closeHumberger" to="account" class="navbar-item">
              Account
            </nuxt-link>
          </div>
        </div>
      </div>
    </nav>

    <div class="container">
      <nuxt />
    </div>

  </div>
</template>

<script>
export default {
  methods: {
    toggleHumberger() {
      this.isHumbergerOpen = !this.isHumbergerOpen;
    },
    closeHumberger() {
      this.isHumbergerOpen = false;
    },
  },
  data() {
    return {
      isHumbergerOpen: false,
    };
  },
};
</script>

<style lang="scss">
.navbar {
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 2px 1px -1px;

  .navbar-brand {
    .navbar-item {
      color: #ff8e4d;
      font-size: 1.5rem;
      padding-bottom: 5px; // adjust vertical align
      &:hover {
        color: #ff8e4d;
      }
    }
  }

  .navbar-burger {
    span {
      color: #fff;
      height: 2px;
    }
  }
}
</style>
