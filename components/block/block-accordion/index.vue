<template lang="pug" src="./index.pug"></template>

<script>
import { fadeIn, throttle } from '~/resources/mixins'
import BlockContent from '~/components/block/block-content'

export default {
  components: {
    BlockContent
  },
  mixins: [fadeIn, throttle],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    activeItem: null
  }),
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

        const tl = this.$gsap.timeline({
          scrollTrigger: {
            trigger: this.$refs.accordions,
            toggleActions: 'play none play none',
            start: '+48 bottom'
          }
        })

        if (this.props.items) {
          tl.from(this.$refs.accordion, {
            opacity: 0,
            y: '48',
            duration: 1.5,
            ease: 'bounce'
          }, '<+=0.1')
        }
      })
    },
    toggleAccordion (i) {
      if (this.activeItem !== i) {
        this.activeItem = i
      } else {
        this.activeItem = null
      }
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
