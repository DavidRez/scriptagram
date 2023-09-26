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
} from './mutation-types'

const stateActions = () => ({
  DEV_INSPECTOR ({ commit }, data) {
    commit(DEV_INSPECTOR, data)
  },
  DEV_TOOLS ({ commit }, data) {
    commit(DEV_TOOLS, data)
  },
  IS_PHONE_LAND_LG ({ commit }, data) {
    commit(IS_PHONE_LAND_LG, data)
  },
  IS_PHONE_LG ({ commit }, data) {
    commit(IS_PHONE_LG, data)
  },
  IS_TABLET ({ commit }, data) {
    commit(IS_TABLET, data)
  },
  IS_TABLET_LG ({ commit }, data) {
    commit(IS_TABLET_LG, data)
  },
  IS_TABLET_MD ({ commit }, data) {
    commit(IS_TABLET_MD, data)
  },
  IS_DESKTOP ({ commit }, data) {
    commit(IS_DESKTOP, data)
  },
  SET_FORMS ({ commit }, data) {
    commit(SET_FORMS, data)
  },
  SET_VIDEOS ({ commit }, data) {
    commit(SET_VIDEOS, data)
  },
  SET_EVENTS ({ commit }, data) {
    commit(SET_EVENTS, data)
  },
  SET_BLOG ({ commit }, data) {
    commit(SET_BLOG, data)
  },
  SET_GLOBAL ({ commit }, data) {
    commit(SET_GLOBAL, data)
  },
  SET_TESTIMONIALS ({ commit }, data) {
    commit(SET_TESTIMONIALS, data)
  },
  SITE_IS_LOADED ({ commit }, data) {
    commit(SITE_IS_LOADED, data)
  },
  VIDEO_LOADING ({ commit }, data) {
    commit(VIDEO_LOADING, data)
  },
  VIEW_MENU ({ commit }, data) {
    commit(VIEW_MENU, data)
  }
})

export default stateActions
