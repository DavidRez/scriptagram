<template lang='pug' src='./index.pug'></template>

<script>
import { fadeIn } from '~/resources/mixins'
import BaseImage from '~/components/base/base-image'
import BlockButton from '~/components/block/block-button'

export default {
  components: {
    BaseImage,
    BlockButton
  },
  mixins: [fadeIn],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    dataValues () {
      return this.props.cards.map(card => ({ value: 0, target: card.number, inline_label: card.inline_label, label: card.label }))
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
    // add commas to counter values
    numberWithCommas (str) {
      return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    handleAnimation () {
      this.$nextTick(() => {
        this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
        if (this.props.cards) {
          const tl = this.$gsap.timeline({
            scrollTrigger: {
              trigger: this.$refs.cards,
              toggleActions: 'play none play none',
              start: '+48 bottom'
            }
          })
          this.$refs.cards.forEach((card, i) => {
            const delay = 0.1 + (0.1 * i)
            tl.from(card, {
              opacity: 0,
              scale: 0.75,
              delay,
              duration: 1.5,
              ease: 'customEaseOut'
            }, '<+=0.1')
          })
        }
      })
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
