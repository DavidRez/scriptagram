<template lang="pug" src="./_page.pug"></template>

<script>
import { setData, setMeta } from '~/resources/utils'
import PageSections from '~/components/page-sections'

export default {
  transition: 'fade',
  components: {
    PageSections
  },
  async asyncData () {
    const data = await setData('blog')
    return { props: data }
  },
  mounted () {
    this.$nextTick(() => {
      if (!this.$store.state.siteIsLoaded) {
        this.$store.dispatch('SITE_IS_LOADED', true)
      }
    })
  },
  head () {
    return setMeta(this.props)
  }
}
</script>
