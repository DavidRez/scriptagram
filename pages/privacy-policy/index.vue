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
    const props = await setData('privacy-policy')
    return { props }
  },
  head () {
    return setMeta(this.props)
  }
}
</script>

<style>
.pages-privacy-policy {
  padding-top: 6rem;
}
</style>
