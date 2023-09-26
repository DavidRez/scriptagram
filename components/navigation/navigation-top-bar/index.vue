<template lang='pug' src='./index.pug'></template>

<script>
import MenuContact from '~/components/menu/menu-contact'
import MenuSocialMedia from '~/components/menu/menu-social-media'

export default {
  components: {
    MenuContact,
    MenuSocialMedia
  },
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    isScrolled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    hideNav: false
  }),
  methods: {
    closeNav () {
      this.hideNav = true
      setTimeout(() => {
        this.$refs.main.style.zIndex = '-1'
      }, 500)
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
