<template lang='pug' src='./index.pug'></template>

<script>
import { titleAnimation, debounce, bodyScroll, removeFocus, trapFocus } from '~/resources/mixins'
import BaseImage from '~/components/base/base-image'
import BaseModal from '~/components/base/base-modal'
import BlockButton from '~/components/block/block-button'
import BlockPreviewPost from '~/components/block/block-preview-post'

export default {
  components: {
    BaseImage,
    BaseModal,
    BlockPreviewPost,
    BlockButton
  },
  mixins: [titleAnimation, debounce, bodyScroll, removeFocus, trapFocus],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    width: '100%',
    video: {},
    modalOpen: false
  }),
  computed: {
    videos () {
      return this.props.category ? this.$store.state.videos.posts.filter((e, i) => e.category === this.props.category && i < (this.props.amount || this.$store.state.videos.posts.length)) : this.$store.state.videos.posts
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
    modalSrc (vid) {
      // set video in modal
      this.video.title = vid.title
      this.video.src = vid.src
      this.modalOpen = true
      this.$_stopBodyScroll()
      this.$_removeFocus()
    },
    setDimensions () {
      this.$nextTick(() => {
        const width = this.$refs.col.clientWidth
        if (window.innerWidth > 768) {
          this.videos.length === 1 ? this.width = `${width * 0.7}px` : this.videos.length === 2 ? this.width = `${width * 0.4}px` : this.width = `${width * 0.4}px`
        } else {
          this.width = `${width * 0.8}px`
        }
      })
    },
    handleAnimation () {
      this.$nextTick(() => {
        if (this.props.title) {
          this.$_titleAnimation(this.$refs.title, 0)
        }
        if (this.props.subtitle) {
          this.$_titleAnimation(this.$refs.subtitle, 0.75)
        }
      })
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
