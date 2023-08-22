<template lang='pug' src='./index.pug'></template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: () => ``
    }
  },
  computed: {
    svg () {
      return require(`@/assets/icons/${this.name}.svg`)
    }
  }
}
</script>
