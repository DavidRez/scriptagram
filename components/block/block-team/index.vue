<template lang="pug" src='./index.pug'></template>

<script>
import { bodyScroll, trapFocus } from '~/resources/mixins'
import BaseImage from '~/components/base/base-image'

export default {
  components: {
    BaseImage
  },
  mixins: [
    bodyScroll,
    trapFocus
  ],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    windowWidth: null,
    cardHeight: 0,
    textHeight: 0,
    maxContentHeight: 0,
    imageHeight: 0,
    active: null
  }),
  beforeDestroy () {
    window.removeEventListener('resize', this.setWindowWidth)
  },
  mounted () {
    window.addEventListener('resize', this.setWindowWidth)
    if (this.$store.state.siteIsLoaded) {
      this.setWindowWidth()
      this.handleAnimation()
    } else {
      this.$store.watch(
        state => this.$store.state.siteIsLoaded,
        (newVal) => {
          if (newVal) {
            this.setWindowWidth()
            window.addEventListener('resize', this.setWindowWidth)
            this.handleAnimation()
          }
        }
      )
    }
  },
  methods: {
    clickActive (i) {
      if (this.active === i) {
        this.active = null
      } else if (this.active !== i) {
        this.active = i
      }
    },
    setWindowWidth () {
      this.windowWidth = window.innerWidth
      this.getHeight()
    },
    getHeight () {
      // text height
      this.$nextTick(() => {
        const content = this.$refs.content
        const contentHeights = content ? content.map(a => a.clientHeight) : []
        this.maxContentHeight = Math.max(...contentHeights)
      })
      this.$nextTick(() => {
        // image height
        this.imageHeight = `${this.$refs.images[0].clientHeight}px`
      })
      this.$nextTick(() => {
        // card height
        this.cardHeight = `${this.$refs.images[0].clientHeight + this.maxContentHeight}px`
      })
    },
    handleAnimation () {
      this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
      const container = this.$refs.container
      const tl = this.$gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: '+48 bottom'
        }
      })
      const title = this.props.title ? this.$refs.title : null

      if (title) {
        tl.from(title, {
          y: 24,
          opacity: 0,
          duration: 1,
          ease: 'customEaseOut'
        }, '<+=0.1')
      }
      this.$refs.card.forEach((card, i) => {
        const delay = 0.025 + (0.05 * i)
        tl.from(card, {
          opacity: 0,
          scale: 0.7,
          delay,
          duration: 0.5,
          ease: 'customEaseOut'
        }, '<+=0.2')
      })
    }
  }
}
</script>

<style lang="sass" src='./index.sass'></style>
