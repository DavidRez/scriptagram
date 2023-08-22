<template lang='pug' src='./index.pug'></template>

<script>
import BlockContent from '~/components/block/block-content'

export default {
  components: {
    BlockContent
  },
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
  }),
  mounted () {
    // window.addEventListener('resize', () => {
    // })
  },
  destroyed () {
  },
  methods: {
    pauseVideos () {
      const videos = this.$refs.video
      const videosEmbed = this.$refs.videoEmbed
      if (videos) {
        videos.forEach((vid) => { vid.pause() })
      }
      if (videosEmbed) {
        videosEmbed.forEach((vid) => { vid.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*') })
      }
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
