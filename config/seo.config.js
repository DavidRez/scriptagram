import axios from 'axios'
import { api, url } from '../resources/api'

export const siteMap = {
  path: '/sitemap.xml',
  hostname: url,
  gzip: true,
  lastmod: new Date(),
  sitemaps: [
    {
      path: '/sitemap-pages.xml',
      defaults: {
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date()
      },
      routes: [
        {
          url: '/',
          priority: 1
        }
      ]
    },
    {
      path: '/blog/sitemap-blog.xml',
      defaults: {
        changefreq: 'daily',
        priority: 0.1,
        lastmod: new Date()
      },
      exclude: ['/**'],
      routes: async () => {
        try {
          // Get All Blog Posts
          const response = await axios.get(`${api}/wp/v2/posts?per_page=9`)
          const dataPages = response.headers['x-wp-totalpages']
          const routes = []
          let blogArray = response.data
          routes.push('/blog/page/1')
          for (let i = 2; i <= dataPages; i++) {
            const nextPage = await axios.get(
              `${api}/wp/v2/posts?per_page=9&page=${i}`
            )
            blogArray = [...blogArray, ...nextPage.data]
            routes.push('/blog/page/' + i)
          }
          blogArray.map((post) => {
            routes.push('/blog/' + post.slug)
          })
          return routes
        } catch (e) {
          console.error('SITEMAP BLOG API: ' + e)
        }
      }
    },
    {
      path: '/blog/sitemap-events.xml',
      defaults: {
        changefreq: 'daily',
        priority: 0.1,
        lastmod: new Date()
      },
      exclude: ['/**'],
      routes: async () => {
        try {
          // Get All Events
          const response = await axios.get(`${api}/wp/v2/events?per_page=9`)
          const dataPages = response.headers['x-wp-totalpages']
          const routes = []
          let eventsArray = response.data
          routes.push('/events/page/1')
          for (let i = 2; i <= dataPages; i++) {
            const nextPage = await axios.get(
              `${api}/wp/v2/events?per_page=9&page=${i}`
            )
            eventsArray = [...eventsArray, ...nextPage.data]
            routes.push('/events/page/' + i)
          }
          eventsArray.map((post) => {
            routes.push('/events/' + post.slug)
          })
          return routes
        } catch (e) {
          console.error('SITEMAP EVENTS API: ' + e)
        }
      }
    }
  ]
}

export const setRobots = {
  UserAgent: '*',
  Disallow: '',
  Sitemap: url + 'sitemap.xml'
}
