import {
  DEV_INSPECTOR,
  DEV_TOOLS,
  IS_PHONE_LAND_LG,
  IS_PHONE_LG,
  IS_TABLET,
  IS_TABLET_LG,
  IS_TABLET_MD,
  IS_DESKTOP,
  SET_FORMS,
  SET_EVENTS,
  SET_VIDEOS,
  SET_BLOG,
  SET_GLOBAL,
  SET_TESTIMONIALS,
  SITE_IS_LOADED,
  VIDEO_LOADING,
  VIEW_MENU
} from './mutation-types.js'

const stateMutations = () => ({
  [DEV_INSPECTOR] (state, data) {
    state.devInspector = data
  },
  [DEV_TOOLS] (state, data) {
    state.devTools = data
  },
  [IS_PHONE_LAND_LG] (state, data) {
    state.isPhoneLandLg = data
  },
  [IS_PHONE_LG] (state, data) {
    state.isPhoneLg = data
  },
  [IS_TABLET] (state, data) {
    state.isTablet = data
  },
  [IS_TABLET_LG] (state, data) {
    state.isTabletLg = data
  },
  [IS_TABLET_MD] (state, data) {
    state.isTabletMd = data
  },
  [IS_DESKTOP] (state, data) {
    state.isDesktop = data
  },
  [SET_FORMS] (state, data) {
    state.forms = data
  },
  [SET_VIDEOS] (state, data) {
    state.videos = data
  },
  [SET_EVENTS] (state, data) {
    state.events = data
  },
  [SET_BLOG] (state, data) {
    state.posts = data
  },
  [SET_GLOBAL] (state, data) {
    state.global = data
  },
  [SET_TESTIMONIALS] (state, data) {
    state.testimonials = data
  },
  [SITE_IS_LOADED] (state, data) {
    state.siteIsLoaded = data
  },
  [VIDEO_LOADING] (state, data) {
    state.videoIsLoading = data
  },
  [VIEW_MENU] (state, data) {
    state.menu = data
  }
})

export default stateMutations
