<template lang='pug' src='./index.pug'></template>

<script>
import { fadeIn, titleAnimation, debounce } from '~/resources/mixins'
import BaseImage from '~/components/base/base-image'
import BlockPreviewPost from '~/components/block/block-preview-post'
import BlockButton from '~/components/block/block-button'

export default {
  components: {
    BaseImage,
    BlockPreviewPost,
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
    maxHeight: 'fit-content',
    width: '100%'
  }),
  computed: {
    events () {
      return this.$store.state.events.posts.slice(0, 3)
    }
  },
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
      this.$nextTick(() => {
        const width = this.$refs.container.clientWidth
        if (window.innerWidth > 768) {
          this.events.length < 3 ? this.tileWidth = `${width * 0.45}px` : this.tileWidth = `${width * 0.3}px`
        } else if (window.innerWidth > 600) {
          this.tileWidth = `${width * 0.4}px`
        } else {
          this.tileWidth = `${width}px`
        }
      })
    },
    handleAnimation () {
      this.$nextTick(() => {
        this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
        if (this.props.title) {
          this.$_titleAnimation(this.$refs.title, '0', '24', 1, 0)
        }
        if (this.events) {
          const tl = this.$gsap.timeline({
            scrollTrigger: {
              trigger: this.$refs.container,
              toggleActions: 'play none play none',
              start: '+48 bottom'
            }
          })
          this.$refs.tiles.forEach((tile, i) => {
            const delay = 0.1 + (0.1 * i)
            tl.from(tile.$el, {
              opacity: 0,
              y: '24',
              delay,
              duration: 1,
              ease: 'customEaseOut'
            }, '<+=0.1')
          })
          if (this.$store.state.events.length > 3 && this.props.button) {
            tl.from(this.$refs.button.$el, {
              opacity: 0,
              y: '24',
              duration: 1,
              ease: 'bounce'
            }, '<+=0.2')
          }
        }
      })
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
