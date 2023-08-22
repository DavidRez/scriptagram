import axios from 'axios'
import { api, url } from './api'

export const getAllPages = async () => {
  try {
    const getPath = (str) => {
      const regex = /.*\.com/ // eslint-disable-line
      const match = str.match(regex)
      if (match) {
        return str.replace(match[0], '')
      } else {
        return str
      }
    }

    const response = await axios.get(
      `${api}/wp/v2/pages?per_page=100`
    )

    const dataPages = response.headers['x-wp-totalpages']
    let dataArray = response.data
    for (let i = 2; i <= dataPages; i++) {
      const nextPage = await axios.get(
        `${api}/wp/v2/pages?per_page=100&page=${i}`
      )
      dataArray = [...dataArray, ...nextPage.data]
    }

    return dataArray.map(item => ({
      parent: item.parent,
      path: getPath(item.link),
      slug: item.slug,
      title: item.title.rendered,
      ...item.acf
    }))
  } catch (e) {
    console.error(`ERROR getting pages for dev-mode-component-locations: ${e}`)
  }
}

// gets data for all custom posts of a specific type
export const getCustomPosts = async (customPostType) => {
  try {
    const response = await axios.get(
      `${api}/wp/v2/${customPostType}?per_page=100`
    )
    const dataPages = response.headers['x-wp-totalpages']
    let dataArray = response.data
    for (let i = 2; i <= dataPages; i++) {
      const nextPage = await axios.get(
        `${api}/wp/v2/${customPostType}?per_page=100&page=${i}`
      )
      dataArray = [...dataArray, ...nextPage.data]
    }
    return dataArray.map(item => ({
      id: item.id,
      title: item.title,
      path: `/${customPostType}/${item.slug}`,
      slug: item.slug,
      ...item.acf
    }))
  } catch (e) {
    console.error(`ERROR getting ${customPostType} posts: ${e}`)
  }
}

export const setData = async (slug, customPostType = 'pages') => {
  try {
    const response = await axios.get(
      `${api}/wp/v2/${customPostType}?slug=${slug}`
    )

    const data = {
      title: response.data[0].title.rendered,
      slug: response.data[0].slug,
      ...response.data[0].acf
    }
    return { ...data }
  } catch (e) {
    console.error(`${slug} page: ${e}`)
  }
}

export const setMeta = (meta) => {
  return {
    title: meta.seo.page_title ? meta.seo.page_title : meta.title,
    meta: [
      meta.seo.page_description && { hid: 'description', name: 'description', content: meta.seo.page_description },
      meta.seo.page_keywords && { hid: 'keywords', name: 'keywords', content: meta.seo.keywords },
      // // OG Meta
      { hid: 'og:type', property: 'og:type', content: 'Website' },
      meta.seo.page_title && { hid: 'og:title', property: 'og:title', content: meta.seo.social_meta.og_meta.title ? meta.seo.social_meta.og_meta.title : meta.seo.page_title },
      meta.seo.page_description && { hid: 'og:description', property: 'og:description', content: meta.seo.social_meta.og_meta.description ? meta.seo.social_meta.og_meta.description : meta.seo.page_description },
      meta.seo.social_meta.og_meta.image && { hid: 'og:image', property: 'og:image', content: meta.seo.social_meta.og_meta.image },
      { hid: 'og:url', property: 'og:url', content: `${url}${meta.slug}` }
    ],
    link: [
      { hid: 'canonical', rel: 'canonical', href: `${url}${meta.slug}` }
    ]
  }
}
