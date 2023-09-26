<template lang='pug' src='./index.pug'></template>

<script>
import { fadeIn } from '~/resources/mixins'
import BlockButton from '~/components/block/block-button'

export default {
  components: {
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
        this.$refs.numbers.forEach((item) => {
          const target = +item.dataset.target
          this.$ScrollTrigger.create({
            trigger: this.$refs.container,
            start: 'bottom bottom',
            onEnter: () => {
              this.$gsap.to(item, {
                innerText: target,
                snap: {
                  innerText: 1
                },
                modifiers: {
                  innerText: value => this.numberWithCommas(Number(value).toFixed())
                },
                duration: 2
              })
            },
            // make animation play once
            onLeaveBack: self => self.disable()
          })
        })
      })
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
