<template lang='pug' src='./index.pug'></template>

<script>
import { bodyScroll, removeFocus } from '~/resources/mixins'
import BaseIcon from '~/components/base/base-icon'
import BlockButton from '~/components/block/block-button'
import Menu from '~/components/menu/'
import MenuLinks from '~/components/menu/menu-links'
import NavigationTopBar from '~/components/navigation/navigation-top-bar'
import router from '~/router/index'

export default {
  components: {
    BaseIcon,
    BlockButton,
    Menu,
    MenuLinks,
    NavigationTopBar
  },
  mixins: [
    bodyScroll,
    removeFocus
  ],
  data: () => ({
    props: null,
    isOpen: false,
    scrollPos: 0,
    phone: false
  }),
  computed: {
    links () {
      return router.filter((link) => {
        return link.navigation
      })
    },
    isScrolled () {
      if (process.client) {
        return this.scrollPos > 5
      } else {
        return null
      }
    }
  },
  mounted () {
    this.scrollPos = window.pageYOffset
    window.addEventListener('scroll', () => {
      this.scrollPos = window.pageYOffset
    })
  },
  methods: {
    top () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    togglePhone () {
      this.phone = !this.phone
    },
    toggleMenu () {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.$_stopBodyScroll()
        this.$_removeFocus()
      } else {
        this.$_resetBodyScroll()
      }
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
