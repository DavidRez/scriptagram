<template lang='pug' src='./index.pug'></template>

<script>
import { setData } from '../../resources/utils'
import router from '~/router/index'

export default {
  data: () => ({
    props: null
  }),
  computed: {
    links () {
      return router.filter((link) => {
        return link.navigation
      })
    }
  },
  async fetch () {
    this.props = await setData('global', 'globalData')
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
