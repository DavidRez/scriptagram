<template lang='pug' src='./index.pug'></template>

<script>
import BlockAccordion from '~/components/block/block-accordion'
import BlockCards from '~/components/block/block-cards'
import BlockCountUpCards from '~/components/block/block-count-up-cards'
import BlockEvents from '~/components/block/block-events'
import BlockFloatingCards from '~/components/block/block-floating-cards'
import BlockForm from '~/components/block/block-form'
import BlockGraphicTextBanner from '~/components/block/block-graphic-text-banner'
import BlockImageText from '~/components/block/block-image-text'
import BlockLogos from '~/components/block/block-logos'
import BlockTeam from '~/components/block/block-team'
import BlockTestimonials from '~/components/block/block-testimonials'
import BlockText from '~/components/block/block-text'
import BlockTiles from '~/components/block/block-tiles'
import BlockVideos from '~/components/block/block-videos'
// import DevModeOverlay from '~/components/dev-mode/dev-mode-overlay'
import Hero from '~/components/hero/hero'

export default {
  components: {
    BlockAccordion,
    BlockCards,
    BlockCountUpCards,
    BlockEvents,
    BlockFloatingCards,
    BlockForm,
    BlockGraphicTextBanner,
    BlockImageText,
    BlockLogos,
    BlockTeam,
    BlockTestimonials,
    BlockText,
    BlockTiles,
    BlockVideos,
    // DevModeOverlay,
    Hero
  },
  props: {
    props: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    global () {
      return this.$store.state.global
    }
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$store.dispatch('SITE_IS_LOADED', true)
        this.handleAnimation()
      }, 100)
    })
  },
  methods: {
    handleAnimation () {
      this.$nextTick(() => {
        if (this.props) {
          this.$refs.sections.forEach((section, i) => {
            const delay = 0.25 + (0.1 * i)
            const tl = this.$gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: '+48 bottom',
                toggleActions: 'play none play none'
              }
            })
            // animate circle graphics, if any
            tl.add(() => {
              section.classList.add('onscroll-animation')
            }, `'<+=${delay}'`)
          })
        }
      })
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
