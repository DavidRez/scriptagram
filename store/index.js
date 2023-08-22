import storeActions from './storeActions'
import storeMutations from './storeMutations'

export const state = () => ({
  devInspector: false,
  devTools: false,
  forms: null,
  global: null,
  isPhoneLandLg: false,
  isPhoneLg: false,
  isTablet: false,
  isTabletLg: false,
  isTabletMd: false,
  menu: false,
  siteIsLoaded: false,
  videoIsLoading: true
})

export const actions = storeActions()

export const mutations = storeMutations()
