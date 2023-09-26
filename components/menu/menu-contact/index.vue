<template lang='pug' src='./index.pug'></template>

<script>
export default {
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    compact: {
      // make true to hide labels
      type: Boolean,
      default: false
    },
    inline: {
      // make true to make all links inline
      type: Boolean,
      default: false
    },
    center: {
      // make true to center align links
      type: Boolean,
      default: false
    },
    toggleMenu: {
      type: Function,
      default: () => ({})
    }
  },
  data: () => ({
    modalOpen: false
  })
}
</script>

<style lang='sass' src='./index.sass'></style>
