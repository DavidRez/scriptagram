<template lang='pug' src='./index.pug'></template>

<script>
import BlockButton from '~/components/block/block-button'

export default {
  components: {
    BlockButton
  },
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
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
