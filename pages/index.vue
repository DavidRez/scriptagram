<template lang="pug" src="./index.pug"></template>

<script>
import { setData } from '~/resources/utils'
import PageSections from '~/components/page-sections'

export default {
  transition: 'fade',
  components: {
    PageSections
  },
  async asyncData () {
    const props = await setData('home')
    return { props }
  }
}
</script>
