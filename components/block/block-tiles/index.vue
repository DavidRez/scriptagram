<template lang='pug' src='./index.pug'></template>

<script>
import BlockButton from '~/components/block/block-button'

export default {
  components: {
    BlockButton
  },
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    slider: false
  }),
  mounted () {
    this.setIfSlider()
    window.addEventListener('resize', () => {
      this.setIfSlider()
    })
  },
  destroyed () {
    window.removeEventListener('resize', this.setIfSlider)
  },
  methods: {
    setIfSlider () {
      let columnsAtCurrentWidth = this.props.columns

      if (this.props.overflow === 'slider') {
        this.slider = true

        if (window.innerWidth <= 480) {
          columnsAtCurrentWidth = 1
        } else if (window.innerWidth <= 768) {
          columnsAtCurrentWidth = 2
        } else if (window.innerWidth <= 880) {
          columnsAtCurrentWidth = this.props.columns === '2' ? 2 : 3
        } else {
          columnsAtCurrentWidth = +this.props.columns
        }
      } else if (window.innerWidth <= 480 && this.props.tiles.length > 3) {
        this.slider = true
      }

      if (columnsAtCurrentWidth >= this.props.tiles.length) {
        this.slider = false
      }
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
