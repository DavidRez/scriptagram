<template lang='pug' src='./index.pug'></template>

<script>
export default {
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    handleClick () {
      // Add custom functionality ================

      // this.$emit('emit-function-name', true)
      console.log('button clicked')
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
