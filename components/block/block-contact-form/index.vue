<template lang='pug' src='./index.pug'></template>

<script>
import { fadeIn, titleAnimation } from '~/resources/mixins'
import BlockContent from '~/components/block/block-content'
// import Form from '~/components/form/form-contact'

export default {
  components: {
    BlockContent
    // Form
  },
  mixins: [fadeIn, titleAnimation],
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    global: {
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
        if (this.props.title) {
          this.$_titleAnimation(this.$refs.title)
        }
        this.$_fadeIn(this.$refs.box, 24, 0, 'top+=58', 0.5, 2)
      })
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
