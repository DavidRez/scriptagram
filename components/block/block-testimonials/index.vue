<template lang='pug' src='./index.pug'></template>

<script>
import { titleAnimation, debounce } from '~/resources/mixins'
import BlockButton from '~/components/block/block-button'

export default {
  components: {
    BlockButton
  },
  mixins: [titleAnimation, debounce],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    width: '100%',
    height: '0px'
  }),
  computed: {
    testimonials () {
      return this.$store.state.testimonials.filter(e => e.type.includes(this.props.type))
    }
  },
  mounted () {
    this.setDimensions()
    setTimeout(() => {
      this.setDimensions()
    }, 500)
    window.addEventListener('resize', () => {
      this.debounceFunc()
    })
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
  beforeDestroy () {
    window.removeEventListener('resize', this.debounceFunc)
  },
  methods: {
    debounceFunc () {
      this.debounce(this.setDimensions, null, 300)
    },
    setDimensions () {
      this.$nextTick(() => {
        const width = this.$refs.col.clientWidth
        if (window.innerWidth > 1024) {
          this.testimonials.length === 1 ? this.width = `${width * 0.7}px` : this.testimonials.length === 2 ? this.width = `${width * 0.4}px` : this.width = `${width * 0.6}px`
        } else if (window.innerWidth > 768) {
          this.width = `${width * 0.7}px`
        } else {
          this.width = `${width * 0.8}px`
        }

        // const slides = this.$refs.slides
        // let slidesHeights = []
        // slidesHeights = slides.map((a) => {
        //   return a.scrollHeight
        // })
        // const maxSlidesHeight = Math.max(...slidesHeights)

        this.height = `${this.$refs.slider.clientHeight}px`
      })
    },
    handleAnimation () {
      this.$nextTick(() => {
        if (this.props.title) {
          this.$_titleAnimation(this.$refs.title, 0)
        }
      })
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
