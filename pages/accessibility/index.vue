<template lang="pug">
  .pages-accessibility
    .pages-accessibility__container
      h1.pages-accessibility__title Accessibility Statement
      .pages-accessibility__col
        p {{ props.company_name }} is committed to facilitating the accessibility and usability of its website, {{ companyDomain }}, for everyone.  {{ props.company_name }} aims to comply with all applicable standards, including the World Wide Web Consortium's Web Content Accessibility Guidelines 2.0 up to Level AA (WCAG 2.0 AA).
        p {{ props.company_name }} is proud of the efforts that we have completed and that are in-progress to ensure that our website is accessible to everyone. Should you experience any difficulty in accessing any part of this website #[span(v-if='props.phone.number') , please feel free to call us at #[a(:href='props.phone.href' tabindex='0') {{ props.phone.number }} ] or ] email us at #[a(:href='"mailto:" + props.email' tabindex='0') {{ props.email }} ] and we will work with you to provide the information or service you seek through an alternate communication method that is accessible for you consistent with applicable law (for example, through telephone support).
</template>

<script>
import { setData } from '~/resources/utils'
import { url } from '~/resources/api'

export default {
  transition: 'fade',
  components: {},
  data: () => ({
    companyDomain: url.slice(0, -1)
  }),
  async asyncData () {
    const props = await setData('global', 'globalData')
    return { props }
  },
  head () {
    return {
      title: `Accessibility | ${this.props.company_name}`,
      meta: [
        { hid: 'description', name: 'description', content: `${this.props.company_name}` },
        { hid: 'og:type', property: 'og:type', content: 'Website' },
        { hid: 'og:url', property: 'og:url', content: `${url}accessibility` }
      ],
      link: [
        { hid: 'canonical', rel: 'canonical', href: `${url}accessibility` }
      ]
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
