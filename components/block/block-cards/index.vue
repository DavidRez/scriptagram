<template lang='pug' src='./index.pug'></template>

<script>
import { fadeIn, titleAnimation } from '~/resources/mixins'
import BlockButton from '~/components/block/block-button'

export default {
  components: {
    BlockButton
  },
  mixins: [ fadeIn, titleAnimation ],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  mounted () {
    if (this.$store.state.siteIsLoaded) {
      this.handleAnimation()
    } else {
      this.$store.watch(
        state => this.$store.state.siteIsLoaded,
        (newVal) => {
          if (newVal) {
            this.handleAnimation()
          }
        }
      )
    }
  },
  methods: {
    handleAnimation () {
      this.$nextTick(() => {
        if (this.props.title) {
          this.$_titleAnimation(this.$refs.title, '0', '24', 1, 0)
        }
        if (this.props.cards) {
          const tl = this.$gsap.timeline({
            scrollTrigger: {
              trigger: this.$refs.cards.$el,
              toggleActions: 'play none play none',
              start: '+24 bottom'
            }
          })
          this.$refs.cards.forEach((card, i) => {
            const delay = 0.1 + (0.1 * i)
            tl.from(card, {
              opacity: 0,
              y: '24',
              delay,
              duration: 0.75,
              ease: 'bounce'
            }, '<+=0.1')
          })
        }
      })
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
