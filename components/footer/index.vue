<template lang="pug" src="./index.pug"></template>

<script>
import { debounce } from '~/resources/mixins'
import BaseIcon from '~/components/base/base-icon'
import FooterDesktop from '~/components/footer/footer-desktop'
import FooterMobile from '~/components/footer/footer-mobile'
import router from '~/router/index'

export default {
  components: {
    BaseIcon,
    FooterDesktop,
    FooterMobile
  },
  mixins: [debounce],
  data: () => ({
    height: '0px',
    position: '0%'
  }),
  computed: {
    links () {
      return router.filter((link) => {
        return link.footer
      })
    }
  },
  mounted () {
    this.setData()
    this.handleAnimation()
    window.addEventListener('resize', this.debounceFunc)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.debounceFunc)
  },
  methods: {
    debounceFunc () {
      this.debounce(this.setData, null, 300)
    },
    setData () {
      const waveHeight = this.$refs.wave.$el.clientHeight
      this.height = `-${waveHeight * 0.75}px`
      window.innerWidth > 1024 ? this.position = '-15%' : window.innerWidth > 600 ? this.position = '-10%' : this.position = '5%'
    },
    handleAnimation () {
      const tl = this.$gsap.timeline({
        scrollTrigger: {
          trigger: this.$refs.container,
          start: 'center bottom'
        }
      })
      if (this.$refs.largeBubbles) {
        tl.from(this.$refs.largeBubbles.$el, {
          y: '5',
          scale: 0.95,
          transformOrigin: 'right center',
          repeat: -1,
          yoyo: true,
          ease: 'Sine.easeOut',
          duration: 4
        })
      }
      if (this.$refs.smallBubbles) {
        tl.from(this.$refs.smallBubbles.$el, {
          y: '5',
          scale: 0.9,
          transformOrigin: 'left center',
          repeat: -1,
          yoyo: true,
          ease: 'Sine.easeOut',
          duration: 4
        })
      }
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
