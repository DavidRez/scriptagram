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
    hideIcons: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
