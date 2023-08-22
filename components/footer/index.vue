<template lang="pug" src="./index.pug"></template>

<script>
import { setData } from '../../resources/utils'

export default {
  data: () => ({
    props: null
  }),
  async fetch () {
    this.props = await setData('global', 'globalData')
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
