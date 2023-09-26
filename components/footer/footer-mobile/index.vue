<template lang="pug" src="./index.pug"></template>

<script>
import MenuSocialMedia from '~/components/menu/menu-social-media'
import MenuLinks from '~/components/menu/menu-links'
import MenuContact from '~/components/menu/menu-contact'
import MenuQuickLinks from '~/components/menu/menu-quick-links'

export default {
  components: {
    MenuSocialMedia,
    MenuLinks,
    MenuContact,
    MenuQuickLinks
  },
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    links: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
