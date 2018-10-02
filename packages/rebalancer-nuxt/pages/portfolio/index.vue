<template>
  <section class="portfolio">

    <div class="columns">
      <div class="column is-12">
        <h1>Portfolio</h1>
      </div>
    </div>

    <div class="postfolio-grid">
      <nuxt-link to="/portfolio/1234" class="card">
        <div class="card-content">
          <div class="portfolio-title">Portfolio1</div>
          <div class="portfolio-amount"><i class="fas fa-dollar-sign"></i>1,358,000</div>
        </div>
      </nuxt-link>
      <div class="card">
        <div class="card-content">
          <div class="portfolio-title">Portfolio1</div>
          <div class="portfolio-amount"><i class="fas fa-dollar-sign"></i>1,358,000</div>
        </div>
      </div>
      <div class="card add-portfolio">
        <div class="card-content">
          <div class=""><i class="fas fa-plus"></i></div>
          <div class="">ポートフォリオを<br/>新規作成する</div>
          </div>
        </div>
      </div>

  </section>
</template>

<script>
export default {};
</script>

<style lang="scss">
.portfolio {
  .postfolio-grid {
    display: grid;
    // max-width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    grid-gap: 1rem;

    .card {
      min-height: 244px;
      &:hover {
        cursor: pointer;
      }
    }

    .portfolio-title {
      font-weight: bold;
      margin-bottom: 16px;
    }

    .fa-dollar-sign {
      color: #d84f00;
      margin-right: 0.5rem;
    }

    .add-portfolio {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: transparent;
      box-shadow: none;
      border: 1px dotted #ccc;
      &:hover {
        background: white;
        cursor: pointer;
      }

      .card-content {
        text-align: center;
        color: #d84f00;

        i {
          font-size: 3rem;
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>
