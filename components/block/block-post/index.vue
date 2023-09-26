<template lang="pug" src="./index.pug"></template>

<script>
import { url } from '~/resources/api'
import { titleAnimation, debounce } from '~/resources/mixins'
import BaseImage from '~/components/base/base-image'
import BaseIcon from '~/components/base/base-icon'
import BlockButton from '~/components/block/block-button'

export default {
  components: {
    BaseImage,
    BaseIcon,
    BlockButton
  },
  mixins: [titleAnimation, debounce, url],
  props: {
    type: {
      type: String,
      default: 'posts'
    },
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    nextPost: null,
    prevPost: null,
    postUrl: '',
    navHeight: '0px',
    title: 'Meet Us'
  }),
  computed: {
    paths () {
      const pathsArr = this.$store.state[this.type].posts.map((post) => {
        return post.path
      })
      return pathsArr
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.debounceFunc)
  },
  mounted () {
    if (this.props.title && this.$route.path.includes('/events/')) {
      this.title = `Meet Us at ${this.props.title}`
    }
    this.handleResize()
    window.addEventListener('resize', this.debounceFunc)

    const currIndex = this.paths.indexOf(this.$route.path)
    this.nextPost = currIndex === this.paths.length - 1 ? null : this.paths[currIndex + 1]
    this.prevPost = currIndex === 0 ? null : this.paths[currIndex - 1]

    this.postUrl = document.location.href

    this.handleAnimation()
  },
  methods: {
    debounceFunc () {
      this.debounce(this.handleResize, null, 300)
    },
    handleResize () {
      this.getHeight()
    },
    getHeight () {
      this.$nextTick(() => {
        const navHeight = document.querySelector('.navigation').clientHeight
        this.navHeight = `${navHeight}px`
      })
    },
    handleAnimation () {
      this.$nextTick(() => {
        if (this.props.title) {
          this.$_titleAnimation(this.$refs.title, '0', '24', 1, 0)
        }

        const tl = this.$gsap.timeline({
          scrollTrigger: {
            trigger: this.$refs.container,
            start: 'center bottom',
            toggleActions: 'play none play none'
          }
        })

        if (this.props.image) {
          tl.from(this.$refs.image.$el, {
            // opacity: 0,
            y: '48',
            duration: 0.75,
            ease: 'bounce'
          }, '<+=0.1')
        }

        tl.from(this.$refs.title, {
          opacity: 0,
          y: '24'
        }, {
          opacity: 0,
          y: '24',
          duration: 0.5,
          ease: 'customEaseOut'
        }, '<+=0.2')

        tl.from(this.$refs.date, {
          opacity: 0,
          y: '24',
          duration: 0.5,
          ease: 'customEaseOut'
        }, '<+=0.3')

        tl.from(this.$refs.social, {
          opacity: 0,
          y: '24',
          duration: 0.5,
          ease: 'customEaseOut'
        }, '<+=0.4')

        tl.from(this.$refs.body, {
          opacity: 0,
          y: '0',
          duration: 1.5,
          ease: 'customEaseOut'
        }, '<+=0.5')

        if (this.prevPost) {
          tl.from(this.$refs.left.$el, {
            opacity: 0,
            x: '24',
            duration: 1.5,
            ease: 'customEaseOut'
          }, '<+=0.6')
        }

        if (this.nextPost) {
          tl.from(this.$refs.right.$el, {
            opacity: 0,
            x: '-24',
            duration: 1.5,
            ease: 'customEaseOut'
          }, '<+=0.6')
        }

        tl.from(this.$refs.banner, {
          opacity: 0,
          y: '24',
          duration: 1.5,
          ease: 'customEaseOut'
        }, '<+=0.7')
      })
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
