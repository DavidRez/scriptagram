import storeActions from './storeActions'
import storeMutations from './storeMutations'

export const state = () => ({
  devInspector: false,
  devTools: false,
  forms: null,
  events: null,
  videos: null,
  posts: null,
  global: null,
  testimonials: null,
  isPhoneLandLg: false,
  isPhoneLg: false,
  isTablet: false,
  isTabletLg: false,
  isTabletMd: false,
  isDesktop: false,
  menu: false,
  siteIsLoaded: false,
  videoIsLoading: true
})

export const actions = storeActions()

export const mutations = storeMutations()
