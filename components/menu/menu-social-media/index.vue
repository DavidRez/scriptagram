<template lang='pug' src='./index.pug'></template>

<script>
import BaseIcon from '~/components/base/base-icon'

export default {
  components: {
    BaseIcon
  },
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    toggleMenu: {
      type: Function,
      default: () => ({})
    },
    center: {
      // make true to center align icons
      type: Boolean,
      default: false
    },
    stacked: {
      // make true to stack icons
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
