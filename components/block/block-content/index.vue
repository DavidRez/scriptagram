<template lang='pug' src='./index.pug'></template>

<script>
import { titleAnimation } from '~/resources/mixins'
import BlockButton from '~/components/block/block-button'

export default {
  components: {
    BlockButton
  },
  mixins: [titleAnimation],
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    forceLeft: {
      type: Boolean,
      default: false
    },
    forceRight: {
      type: Boolean,
      default: false
    },
    forceCenter: {
      type: Boolean,
      default: false
    },
    animate: {
      type: Boolean,
      default: false
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
        if (this.props.header && this.animate) {
          this.$_titleAnimation(this.$refs.header, 0.5)
        }
        if (this.props.subheader && this.animate) {
          this.$_titleAnimation(this.$refs.subheader, 1)
        }
        if (this.props.body && this.animate) {
          this.$_titleAnimation(this.$refs.body, 1.5)
        }
      })
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
