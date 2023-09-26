<template lang='pug' src='./index.pug'></template>

<script>

export default {
  components: {
  },
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    links: {
      type: Array,
      default: () => ([])
    },
    toggleMenu: {
      type: Function,
      default: () => ({})
    },
    top: {
      type: Function,
      default: () => ({})
    },
    inline: {
      // make true to make all links inline
      type: Boolean,
      default: false
    },
    light: {
      // make true to make all links white when on dark bg
      type: Boolean,
      default: false
    },
    center: {
      // make true to center align links
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
