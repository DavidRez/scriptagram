<template lang='pug' src='./index.pug'></template>

<script>
import { fadeIn, titleAnimation, debounce } from '~/resources/mixins'
import BlockButton from '~/components/block/block-button'

export default {
  components: {
    BlockButton
  },
  mixins: [ fadeIn, titleAnimation, debounce ],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    tileWidth: '100%',
    maxHeight: 'fit-content'
  }),
  mounted () {
    this.setTiles()
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
      this.debounce(this.setTiles, null, 100)
    },
    setTiles () {
      if (this.$refs.container) {
        const containerWidth = this.$refs.container.clientWidth

        if (window.innerWidth > 768) {
          this.tileWidth = `${(containerWidth / this.props.columns) - (8 * this.props.columns)}px`
        }
        if (window.innerWidth <= 900 && window.innerHeight <= 480) {
          this.tileWidth = `${(containerWidth / 2) - 32}px`
        }
        if (window.innerWidth <= 768) {
          this.tileWidth = `${(containerWidth / 2) - (16 * this.props.columns)}px`
        }
        if (window.innerWidth <= 600) {
          this.tileWidth = '100%'
        }
      }

      this.$nextTick(() => {
        const titles = this.$refs.titles
        let titlesHeights = []
        titlesHeights = titles ? titles.map((a) => {
          return a.scrollHeight
        }) : []
        this.maxHeight = `${Math.max(...titlesHeights)}px`
      })
    },
    handleAnimation () {
      this.$nextTick(() => {
        if (this.props.title) {
          this.$_titleAnimation(this.$refs.title, 0)
        }
        if (this.props.tiles) {
          const tl = this.$gsap.timeline({
            scrollTrigger: {
              trigger: this.$refs.tiles,
              toggleActions: 'play none play none',
              start: '+48 bottom'
            }
          })
          this.$refs.tiles.forEach((tile, i) => {
            const delay = 0.1 + (0.1 * i)
            tl.from(tile, {
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
