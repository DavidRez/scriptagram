<template lang="pug" src="./index.pug"></template>

<script>
import BaseIcon from '~/components/base/base-icon'

export default {
  components: {
    BaseIcon
  },
  props: {
    pageCount: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    windowWidth: 0
  }),
  mounted () {
    this.getWidth()
    window.addEventListener('resize', this.getWidth)

    // this.$nextTick(() => {
    //   if (this.$store.state.siteIsLoaded) {
    //     this.handleAnimation()
    //   } else {
    //     this.$store.watch(
    //       state => this.$store.state.siteIsLoaded,
    //       (newVal) => {
    //         if (newVal) {
    //           this.handleAnimation()
    //         }
    //       }
    //     )
    //   }
    // })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.getWidth)
  },
  methods: {
    getWidth () {
      this.windowWidth = window.innerWidth
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
