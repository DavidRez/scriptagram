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
    const props = await setData('contact')
    return { props }
  },
  head () {
    return setMeta(this.props)
  }
}
</script>
