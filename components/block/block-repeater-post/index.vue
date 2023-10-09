<template lang="pug" src="./index.pug"></template>

<script>
import { fadeIn, debounce, titleAnimation } from '~/resources/mixins'
import BlockPagination from '~/components/block/block-post-pagination'
import BaseImage from '~/components/base/base-image'
import BlockPost from '~/components/block/block-post'

export default {
  components: {
    BlockPagination,
    BaseImage,
    BlockPost
  },
  mixins: [fadeIn, debounce, titleAnimation],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      postsPerPage: this.$store.state[this.props.type].postsPerPage,
      pageCount: Number(this.$store.state[this.props.type].pageCount),
      havePosts: false,
      tileWidth: '100%'
    }
  },
  mounted () {
    this.setTiles()
    window.addEventListener('resize', this.debounceFunc)

    if (this.$store.state[this.props.type].posts) {
      this.havePosts = true
    }

    this.$nextTick(() => {
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
    })
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
          this.postsPerPage.length < 3 ? this.tileWidth = `${width * 0.45}px` : this.tileWidth = `${width * 0.3}px`
        } else if (window.innerWidth > 600) {
          this.tileWidth = `${(width * 0.45) - 16}px`
        } else {
          this.tileWidth = `${width}px`
        }
      })
    },
    handleAnimation () {
      this.$nextTick(() => {
        if (this.props.title) {
          this.$_titleAnimation(this.$refs.title, 0)
        }
        if (this.havePosts) {
          const tl = this.$gsap.timeline({
            scrollTrigger: {
              trigger: this.$refs.container,
              toggleActions: 'play none play none',
              start: '+48 bottom'
            }
          })
          this.$refs.posts.forEach((post, i) => {
            const delay = 0.1 + (0.1 * i)
            tl.fromTo(post.$el, {
              y: '96',
              opacity: 0
            }, {
              y: '0',
              opacity: 1,
              delay,
              duration: 0.75,
              ease: 'power1'
            }, '<+=0.1')
          })
        }
      })
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
