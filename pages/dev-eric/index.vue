<template lang='pug' src='./index.pug'></template>

<script>
import { setData, setMeta } from '~/resources/utils'
import PageSections from '~/components/page-sections'

export default {
  transition: 'fade',
  components: {
    PageSections
  },
  async asyncData () {
    const props = await setData('dev-eric')
    const global = await setData('global', 'globalData')
    return { props, global }
  },
  head () {
    return setMeta(this.props)
  }
}
</script>
