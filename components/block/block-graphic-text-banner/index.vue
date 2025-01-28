<template lang="pug" src="./index.pug"></template>

<script>
import { fadeIn } from '~/resources/mixins'
import BaseIcon from '~/components/base/base-icon'
import BaseImage from '~/components/base/base-image'
import BlockContent from '~/components/block/block-content'

export default {
  components: {
    BaseIcon,
    BaseImage,
    BlockContent
  },
  mixins: [fadeIn],
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
        const container = this.$refs.container
        const tl = this.$gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'center bottom',
            toggleActions: 'play none play none'
          }
        })

        if (this.props.reverse_layout) {
          // animate graphic
          tl.fromTo(this.$refs.col1, {
            scale: 0.8,
            opacity: 0
          }, {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'bounce'
          }, '<+=0.1')
          // animate text
          tl.fromTo(this.$refs.col2, {
            y: '24',
            opacity: 0
          }, {
            y: '0',
            opacity: 1,
            duration: 1,
            ease: 'customEaseOut'
          })
        } else {
          // animate text
          tl.fromTo(this.$refs.col2, {
            y: '24',
            opacity: 0
          }, {
            y: '0',
            opacity: 1,
            duration: 1,
            ease: 'customEaseOut'
          })
          // animate graphic
          tl.fromTo(this.$refs.col1, {
            scale: 0.8,
            opacity: 0
          }, {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'bounce'
          }, '<+=0.1')
        }
      })
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
