<template lang="pug" src="./index.pug"></template>

<script>
import { setData } from '~/resources/utils'
import PageSections from '~/components/page-sections'

export default {
  transition: 'fade',
  components: {
    PageSections
  },
  async asyncData () {
    const props = await setData('home')
    return { props }
  },
  head () {
    return {
      script: [
        {
          hid: 'zsiqchat_script',
          id: 'zsiqchat',
          type: 'text/javascript',
          innerHTML: `
            var $zoho=$zoho || {};$zoho.salesiq = $zoho.salesiq || {widgetcode: "siq9ab237bd619d0dd24fd56dcdb444214727ebcc8e49edd2d17dbdc029bbf301d7", values:{},ready:function(){}};var d=document;s=d.createElement("script");s.type="text/javascript";s.id="zsiqscript";s.defer=true;s.src="https://salesiq.zohopublic.com/widget";t=d.getElementsByTagName("script")[0];t.parentNode.insertBefore(s,t);
          `
        }
      ],
      __dangerouslyDisableSanitizersByTagID: {
        zsiqchat_script: ['innerHTML']
      }
    }
  }
}
</script>
