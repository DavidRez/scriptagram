<template src='./default.pug' lang='pug'></template>

<script>
import { getCustomPosts, setData } from '~/resources/utils'
import DevModeBanner from '~/components/dev-mode/dev-mode-banner'
import SkipLink from '~/components/base/base-skip-link'
import TheFooter from '~/components/footer'
import TheNavigation from '~/components/navigation'

export default {
  components: {
    DevModeBanner,
    SkipLink,
    TheFooter,
    TheNavigation
  },
  data: () => ({
    forms: null,
    videos: null,
    events: null,
    posts: null,
    global: null,
    testimonials: null,
    showDevModeBanner: false
  }),
  watch: {
    $route: 'onRouteChange'
  },
  async fetch () {
    this.forms = await getCustomPosts('forms')
    this.videos = await getCustomPosts('videos')

    // change number to desired number of posts per page
    this.events = await getCustomPosts('events', 9)
    this.posts = await getCustomPosts('posts', 9)

    this.global = await setData('global', 'globalData')
    this.testimonials = await setData('testimonials', 'globalData')

    this.$store.dispatch('SET_VIDEOS', this.videos)
    this.$store.dispatch('SET_EVENTS', this.events)
    this.$store.dispatch('SET_BLOG', this.posts)
    this.$store.dispatch('SET_TESTIMONIALS', this.testimonials.testimonials)
    this.$store.dispatch('SET_GLOBAL', this.global)
    this.$store.dispatch('SET_FORMS', this.forms)
  },
  mounted () {
    this.updateGlobalStyles()
    this.checkWindowWidth()

    this.showDevModeBanner = process.env.NODE_ENV === 'development' && this.global.enable_development_mode

    window.addEventListener('resize', () => {
      this.checkWindowWidth()
    })
  },
  methods: {
    checkWindowWidth () {
      this.$nextTick(() => {
        this.$store.dispatch('IS_PHONE_LAND_LG', window.innerWidth <= 900 && window.innerHeight <= 480)
        this.$store.dispatch('IS_PHONE_LG', window.innerWidth <= 480)
        this.$store.dispatch('IS_TABLET', window.innerWidth <= 768)
        this.$store.dispatch('IS_TABLET_MD', window.innerWidth <= 880)
        this.$store.dispatch('IS_TABLET_LG', window.innerWidth <= 1024)
        this.$store.dispatch('IS_DESKTOP', window.innerWidth >= 1681)
      })
    },
    onRouteChange () {
      const target = document.querySelector('#page-wrapper')
      console.log('change', target)
      target.focus()
    },
    updateGlobalStyles () {
      const root = document.documentElement

      // Colors
      this.global.colors.forEach((color) => {
        root.style.setProperty(`--${color.label}`, `rgba(${color.color.red}, ${color.color.green}, ${color.color.blue}, ${color.color.alpha})`)
        root.style.setProperty(`--${color.label}-rgb`, `${color.color.red}, ${color.color.green}, ${color.color.blue}`)
      })

      // Typography
      this.global.typography.forEach((font) => {
        root.style.setProperty(`--${font.label}`, font.font)
      })
    }
  }
}
</script>

<style>
  .main-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  main:focus {
    outline: none;
  }
  #page-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow: hidden;
  }
  #page-wrapper:focus {
    outline: none;
  }
</style>
