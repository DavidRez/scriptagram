<template lang='pug'>
  .page-404(:class="{ 'page-404--dark': darkMode }")
    .page-404__container(ref='container')
      // Classic Theme
      .page-404__column(v-if='theme === "classic"')
        h1.page-404__title 404
        h2.page-404__subtitle Page Not Found
        p.page-404__text The link you followed my be broken or the page may have been removed.
        nuxt-link.page-404__button(to='/', aria-label='Back to home.') Back To Home

      //Branded Theme
      .page-404__content(v-else-if='theme === "branded"')
        nuxt-link.page-404__logo(to='/', aria-label='Return Home')
          BaseIcon.page-404__logo-icon(name='logo' :class="{ 'page-404__logo-icon--portrait': logoPortrait }")
        h1.page-404__title.page-404__title--branded Whoops!
        p.page-404__text.page-404__text--branded We can't seem to find the page you are looking for
        nuxt-link.page-404__button(to='/', aria-label='Return Home') Return Home
</template>

<script>
export default {
  transition: 'fade',
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    // theme options: 'classic', 'branded'
    theme: 'classic',
    darkMode: false,
    logoPortrait: false
  }),
  mounted () {
    this.handleAnimation()
  },
  methods: {
    handleAnimation () {
      this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
      const tl = this.$gsap.timeline()
      const container = this.$refs.container

      tl.to(container, {
        opacity: 1,
        ease: 'customEaseOut',
        duration: 1
      })
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
