import 'core-js/features/array/at'
import axios from 'axios'
import { api } from '../resources/api'
import webFonts from '../resources/fonts.js'
import { setData } from '../resources/utils'
import buildConfig from './build.config.js'
import { siteHead } from './head.config.js'
import { siteMap, setRobots } from './seo.config'
import 'core-js/features/array/at'

export default async () => {
  const meta = await setData('home')
  return {
    server: {
      port: 8080,
      host: '0.0.0.0'
    },
    target: 'static',
    generate: {
      async routes () {
        const dyRoutes = []

        await axios.get(`${api}/wp/v2/posts?per_page=9`).then(async (response) => {
          const dataPages = response.headers['x-wp-totalpages']
          let postsArray = response.data
          dyRoutes.push('/blog/page/1')
          for (let i = 2; i <= dataPages; i++) {
            const nextPage = await axios.get(
              `${api}/wp/v2/posts?per_page=9&page=${i}`
            )
            postsArray = [...postsArray, ...nextPage.data]
            dyRoutes.push('/blog/page/' + i)
          }
          return postsArray.map((post) => {
            dyRoutes.push('/blog/' + post.slug)
          })
        })

        await axios.get(`${api}/wp/v2/events?per_page=9`).then(async (response) => {
          const dataPages = response.headers['x-wp-totalpages']
          let eventsArray = response.data
          dyRoutes.push('/events/page/1')
          for (let i = 2; i <= dataPages; i++) {
            const nextPage = await axios.get(
              `${api}/wp/v2/events?per_page=9&page=${i}`
            )
            eventsArray = [...eventsArray, ...nextPage.data]
            dyRoutes.push('/events/page/' + i)
          }
          return eventsArray.map((post) => {
            dyRoutes.push('/events/' + post.slug)
          })
        })

        return dyRoutes
      }
    },
    head: siteHead(meta),
    globalName: 'globalContent',
    loading: { color: '#fff' },
    components: {
      dirs: [
        '~/components',
        '~/components/custom',
        '~/components/block'
      ]
    },
    polyfill: {
      features: [
        {
          require: 'intersection-observer',
          detect: () => 'IntersectionObserver' in window
        }
      ]
    },
    plugins: [
      '~/resources/components',
      '~/resources/mixins',
      '~/resources/vendors.js',
      {
        src: '~/resources/vendors.client.js',
        mode: 'client'
      }
    ],
    modules: [
      '@nuxtjs/axios',
      '@nuxtjs/style-resources',
      'nuxt-webfontloader',
      '@nuxtjs/robots',
      '@nuxtjs/sitemap',
      'nuxt-polyfill',
      '@nuxtjs/gtm'
    ],
    robots: setRobots,
    sitemap: siteMap,
    css: [
      { src: '~/styles/static/normalize.sass', lang: 'sass' },
      { src: '~/styles/index.sass', lang: 'sass' }
    ],
    styleResources: {
      sass: [
        '~/styles/base/*.sass',
        '~/styles/utilities/*.sass',
        '~/styles/grid/*.sass'
      ]
    },
    stylelint: {
      files: [
        'styles/*.sass',
        'styles/**/*.sass',
        'components/**/*.sass',
        'components/**/**/*.sass'
      ]
    },
    webfontloader: webFonts,
    buildModules: [
      '@nuxtjs/eslint-module',
      '@nuxtjs/stylelint-module',
      'nuxt-gsap-module'
    ],
    gsap: {
      extraPlugins: {
        scrollTrigger: true
      },
      clubPlugins: {
        customEase: true
      },
      extraEases: {
        customEase: true
      }
    },
    vue: {
      config: {
        productionTip: false
      }
    },
    build: buildConfig
  }
}
