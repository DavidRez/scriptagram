<template lang='pug' src='./index.pug'></template>

<script>
import BaseImage from '~/components/base/base-image'
import BlockButton from '~/components/block/block-button'

export default {
  components: {
    BaseImage,
    BlockButton
  },
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    image: {
      type: Object,
      default: () => ({})
    },
    compact: {
      type: Boolean,
      default: false
    },
    video: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
