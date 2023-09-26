<template lang='pug' src='./index.pug'></template>

<script>
import { fadeIn, titleAnimation, debounce } from '~/resources/mixins'
import BaseIcon from '~/components/base/base-icon'
import BlockContent from '~/components/block/block-content'

export default {
  components: {
    BaseIcon,
    BlockContent
  },
  mixins: [ fadeIn, titleAnimation, debounce ],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  mounted () {
    if (this.$store.state.siteIsLoaded) {
      this.handleAnimation()
    } else {
      this.$store.watch(
        state => this.$store.state.siteIsLoaded,
        (newVal) => {
          if (newVal) {
            this.handleAnimation()
          }
        }
      )
    }
  },
  methods: {
    handleAnimation () {
      this.$nextTick(() => {
        this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
        if (this.props.title) {
          this.$_titleAnimation(this.$refs.title, '0', '24', 1, 0)
        }
        if (this.props.logos) {
          const tl = this.$gsap.timeline({
            scrollTrigger: {
              trigger: this.$refs.container,
              toggleActions: 'play none play none',
              start: 'top bottom'
            }
          })
          this.$refs.logos.forEach((logo, i) => {
            const delay = 0.05 + (0.05 * i)
            tl.from(logo.$el, {
              opacity: 0,
              scale: 0.9,
              delay,
              duration: 1,
              ease: 'customEaseOut'
            }, '<+=0.1')
          })
        }
      })
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
