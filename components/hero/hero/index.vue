<template lang="pug" src="./index.pug"></template>

<script>
import { debounce, titleAnimation } from '~/resources/mixins'
import BaseIcon from '~/components/base/base-icon'
import BlockButton from '~/components/block/block-button'

export default {
  components: {
    BaseIcon,
    BlockButton
  },
  mixins: [debounce, titleAnimation],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    compOpacity: 0,
    currentImg: null,
    loading: true,
    imgSrc: null,
    imgWebp: null,
    imgPosition: null,
    windowWidth: null,
    marginTop: '100px'
  }),
  beforeDestroy () {
    window.removeEventListener('resize', this.debounceFunc)
  },
  mounted () {
    this.handleResize()
    window.addEventListener('resize', this.debounceFunc)

    if (this.$refs.image) {
      this.loadImage()
      this.loading = false
      this.compOpacity = 1
    } else if (this.$refs.video) {
      this.$refs.video.addEventListener('loadeddata', () => {
        if (!this.$store.state.siteIsLoaded) {
          this.$store.dispatch('VIEW_SITE', true)
        }
        this.compOpacity = 1
        this.handleAnimation()
      })
    }
    if (!this.$refs.video && !this.props.desktop_image.src) {
      if (!this.$store.state.siteIsLoaded) {
        this.$store.dispatch('VIEW_SITE', true)
      }
      this.compOpacity = 1
      this.handleAnimation()
    }
  },
  methods: {
    debounceFunc () {
      this.debounce(this.handleResize, null, 300)
    },
    handleResize () {
      if (this.props.media_type === 'image') {
        this.windowWidth = window.innerWidth
        this.windowWidth > 600 ? this.imgSrc = this.props.desktop_image.src : this.imgSrc = this.props.mobile_image.src
        this.windowWidth > 600 ? this.imgWebp = this.props.desktop_image.webp : this.imgWebp = this.props.mobile_image.webp
        this.windowWidth > 600 ? this.imgPosition = this.props.desktop_image.objectPosition : this.imgPosition = this.props.mobile_image.objectPosition
      }

      this.marginTop = `${document.querySelector('.navigation').clientHeight}px`
    },
    loadImage () {
      this.imgSrc = this.props.desktop_image.src
      this.webpSrc = this.props.desktop_image.webp
      this.$refs.image.children[1].onload = () => {
        if (!this.$store.state.siteIsLoaded) {
          this.$store.dispatch('VIEW_SITE', true)
        }
        this.handleAnimation()
      }

      window.addEventListener('resize', this.debounceFunc)
    },
    handleAnimation () {
      this.$nextTick(() => {
        const tl = this.$gsap.timeline()

        if (this.props.add_floating_image && this.props.floating_image) {
          tl.from(this.$refs.floating, {
            y: 24,
            opacity: 0,
            duration: 2,
            ease: 'bounce'
          }, '<+=0.5')
        }
      })
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
