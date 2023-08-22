<template lang='pug' src='./index.pug'></template>

<script>
import BlockAccordion from '~/components/block/block-accordion'
import BlockForm from '~/components/block/block-form'
import BlockGallerySlider from '~/components/block/block-gallery-slider'
import BlockTiles from '~/components/block/block-tiles'
import DevModeTools from '~/components/dev-mode/dev-mode-tools'
import DevModeOverlay from '~/components/dev-mode/dev-mode-overlay'
import Hero from '~/components/hero/hero'

export default {
  components: {
    BlockAccordion,
    BlockForm,
    BlockGallerySlider,
    BlockTiles,
    DevModeTools,
    DevModeOverlay,
    Hero
  },
  props: {
    global: {
      type: Object,
      default: () => ({})
    },
    props: {
      type: Array,
      default: () => ([])
    }
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$store.dispatch('SITE_IS_LOADED', true)
      }, 100)
    })
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
