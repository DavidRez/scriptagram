<template lang='pug' src='./index.pug'></template>

<script>
import BaseIcon from '~/components/base/base-icon'
import MenuSocialMedia from '~/components/menu/menu-social-media'
import MenuLinks from '~/components/menu/menu-links'
import MenuContact from '~/components/menu/menu-contact'
import MenuQuickLinks from '~/components/menu/menu-quick-links'

export default {
  components: {
    BaseIcon,
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
    },
    toggleMenu: {
      type: Function,
      default: () => ({})
    },
    // move to top of page
    top: {
      type: Function,
      default: () => ({})
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
