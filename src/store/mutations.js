import {
  SET_USER_INFO,
  FLUSH_DATA,
  SET_NAV,
  SET_MENU,
  SET_BTN,
  LOG_OUT,
  SET_IMG_DIALOG,
  SET_BIGIMG
} from './mutation-types'

import {
  setStore,
  getStore
} from '../util/utils'

export default {
  [SET_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
    setStore('userInfo', userInfo)
    state.ready = true
    setStore('ready', true)
  },
  [FLUSH_DATA] (state) {
    state.userInfo = getStore('userInfo') || null
    state.navs = getStore('navs') || {
      active: 0,
      data: []
    }
    state.menus = getStore('menus') || {
      active: 0,
      data: null
    }
    state.btns = getStore('btns') || []
    state.ready = getStore('ready')
  },
  [SET_NAV] (state, navs) {
    state.navs = navs
    setStore('navs', navs)
  },
  [SET_MENU] (state, menus) {
    state.menus = menus
    setStore('menus', menus)
  },
  [LOG_OUT] (state) {
    window.sessionStorage.clear()
    window.location.reload()
  },
  [SET_BTN] (state, btns) {
    state.btns = btns
    setStore('btns', btns)
  },
  [SET_IMG_DIALOG] (state, value) {
    state.imgDialog = value
  },
  [SET_BIGIMG] (state, bigImg) {
    state.bigImg = bigImg
    setStore('bigImg', bigImg)
  }
}
