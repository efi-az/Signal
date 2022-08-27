<template>
  <div class="custom-container">
    <footer class="footer">
      <div class="footer-social">
        <div
          class="footer-social__item"
          v-for="(item, index) in socialMedia"
          :key="index"
          :style="cssVars(item.color)"
        >
          <img class="" :src="item.icon" :alt="item.name" />
        </div>
      </div>
      <nav class="footer-nav">
        <a
          class="footer-nav__item"
          v-for="(item, index) in footerNav"
          :key="index"
        >
          {{ item.name }}
        </a>
      </nav>
    </footer>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  data: () => ({
    socialMedia: [
      {
        name: "instagram",
        icon: "/_nuxt/assets/media/global/footer/instagram.svg",
        color: "#F00073",
      },
      {
        name: "telegram",
        icon: "/_nuxt/assets/media/global/footer/telegram.svg",
        color: "#0088CC",
      },
      {
        name: "twitter",
        icon: "/_nuxt/assets/media/global/footer/twitter.svg",
        color: "#1DA1F2",
      },
      {
        name: "facebook",
        icon: "/_nuxt/assets/media/global/footer/facebook.svg",
        color: "#1877F2",
      },
    ],
    footerNav: [
      {
        name: "اخبار و مقالات",
        route: "",
      },
      {
        name: "نقشه بازار",
        route: "",
      },
      {
        name: "درباره ما",
        route: "",
      },
      {
        name: "اشتراک ها",
        route: "",
      },
    ],
    color: "#efefef",
  }),
  computed: {
    cssVars() {
      return (color) => {
        return {
          "--bg-color": color,
        };
      };
    },
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  padding: 40px 88px;
  @include flex($dir: space-between);
  .footer-social {
    @include flex($dir: center);
    gap: 25px;
    .footer-social__item {
      $size: 32px;
      width: $size;
      height: $size;
      border-radius: 10px;
      background: #979797;
      @include flex($dir: center);
      transition: 0.3s all ease-in;
      cursor: pointer;
      &:hover {
        background: var(--bg-color);
      }
    }
  }
  .footer-nav {
    @include flex($dir: center);
    gap: 66px;
    .footer-nav__item {
      font-size: var(--fs-sm);
      font-family: var(--bakh-fa-regular);
      color: var(--color-base);
      line-height: normal;
    }
  }
}
</style>
