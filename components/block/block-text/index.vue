<template lang="pug" src="./index.pug"></template>

<script>
import { fadeIn } from '~/resources/mixins'
import BaseIcon from '~/components/base/base-icon'

export default {
  components: {
    BaseIcon
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
        if (this.props.title) {
          this.$_titleAnimation(this.$refs.title, 0)
        }
        const tl = this.$gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'center bottom',
            toggleActions: 'play none play none'
          }
        })

        tl.fromTo(this.$refs.col, {
          y: '48',
          opacity: 0
        }, {
          y: '0',
          opacity: 1,
          duration: 1.5,
          ease: 'customEaseOut'
        }, '<+=0.2')
      })
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
