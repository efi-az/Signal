<template>
  <div class="custom-container">
    <header class="header">
      <div class="header-figure blue-bg">cs</div>
      <nav class="header-nav">
        <a
          class="header-nav__item"
          v-for="(item, index) in headerNav"
          :key="index"
        >
          {{ item.name }}
        </a>
      </nav>
      <div class="header-btn-row">
        <button class="header-button" type="button">
          ورود
          <img class="" src="@/assets/media/global/header/user.svg" />
        </button>
        <button class="header-button blue-bg color-white" type="button">
          ثبت نام
          <img class="" src="@/assets/media/global/header/add-user.svg" />
        </button>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  data: () => ({
    headerNav: [
      {
        name: "نقشه بازار",
        route: "/road-map",
      },
      {
        name: "اخبار و مقالات",
        route: "/news",
      },
      {
        name: "درباره ما",
        route: "/about-us",
      },
    ],
  }),
});
</script>

<style lang="scss" scoped>
.header {
  .fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  width: 100%;
  background: transparent !important;
  @include flex($dir: space-between);
  padding: 40px 88px;
  .header-figure {
    $size: 50px;
    width: $size;
    height: $size;
    padding: 10px;
    font-size: var(--fs-md);
    box-sizing: border-box;
    @include flex($dir: center);
    color: white;
    border-radius: 10px;
    text-transform: uppercase;
  }
  .header-nav {
    flex: 1 1 0;
    padding-right: 108px;
    @include flex($dir: flex-start);
    gap: 90px;
    .header-nav__item {
      font-size: var(--fs-sm);
      font-family: var(--bakh-fa-regular);
      color: var(--color-base);
    }
  }
  .header-btn-row {
    @include flex($dir: space-between);
    .header-button {
      font-size: var(--fs-sm);
      color: var(--color-base);
      font-family: var(--bakh-fa-regular);
      padding: 15px 25px;
      border-radius: 10px;
      img {
        margin: 0 5px;
        height: max-content;
        width: max-content;
      }
    }
  }
}
</style>
