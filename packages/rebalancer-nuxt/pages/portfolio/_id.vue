<template>
  <section class="portfolio">

    <h1>Portfolio > Portfolio1</h1>

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
    grid-template-columns: repeat(auto-fill, minmax(280px, 270px));
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
