<template lang='pug' src='./index.pug'></template>

<script>
import { debounce, fadeIn } from '~/resources/mixins'
import BaseIcon from '~/components/base/base-icon'
import BaseImage from '~/components/base/base-image'
import BlockContent from '~/components/block/block-content'

export default {
  components: {
    BaseIcon,
    BaseImage,
    BlockContent
  },
  mixins: [debounce, fadeIn],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    activeTab: 0,
    height: '0px'
  }),
  mounted () {
    this.setHeights()

    setTimeout(() => {
      this.setHeights()
    }, 500)
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
    window.addEventListener('resize', this.debounceFunc)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.debounceFunc)
  },
  methods: {
    changeTab (i) {
      this.activeTab = i
    },
    debounceFunc () {
      this.debounce(this.setHeights, null, 300)
    },
    setHeights () {
      const content = this.$refs.content
      let contentHeights = []
      contentHeights = content.map((a) => {
        return a.$el.clientHeight
      })
      const maxContentHeight = Math.max(...contentHeights)

      this.height = `${maxContentHeight}px`
    },
    handleAnimation () {
      this.$nextTick(() => {
        this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
        const tl = this.$gsap.timeline({
          scrollTrigger: {
            trigger: this.$refs.container,
            toggleActions: 'play none play none',
            start: '+48 bottom'
          }
        })
        if (this.props.reverse_layout) {
          tl.fromTo(this.$refs.col2, {
            y: '24',
            opacity: 0
          }, {
            y: '0',
            opacity: 1,
            duration: 1,
            ease: 'customEaseOut'
          }, '<+=0.1')
          tl.fromTo(this.$refs.image.$el, {
            scale: 0.6,
            opacity: 0
          }, {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'bounce'
          }, '<+=0.2')
          tl.fromTo(this.$refs.tabs, {
            y: '24',
            opacity: 0
          }, {
            y: '0',
            opacity: 1,
            duration: 1,
            ease: 'bounce'
          }, '<+=0.2')
        } else {
          tl.fromTo(this.$refs.image, {
            scale: 0.6,
            opacity: 0
          }, {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'bounce'
          }, '<+=0.1')
          tl.fromTo(this.$refs.tabs, {
            y: '24',
            opacity: 0
          }, {
            y: '0',
            opacity: 1,
            duration: 1,
            ease: 'bounce'
          }, '<+=0.1')
          tl.fromTo(this.$refs.col2, {
            y: '24',
            opacity: 0
          }, {
            y: '-0',
            opacity: 1,
            duration: 1,
            ease: 'customEaseOut'
          }, '<+=0.2')
        }
      })
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
