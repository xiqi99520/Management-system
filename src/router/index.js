import Vue from 'vue'
import Router from 'vue-router'
import {
  getStore
} from '../util/utils'
import store from '../store'

// 登陆页
const login = r => require.ensure([], () => r(require('../page/login')), 'Login')

// 首页
const home = r => require.ensure([], () => r(require('../page')), 'Home')

/**
 * 进件系统
 */
const incomingData = r => require.ensure([], () => r(require('../page/incomingData')), 'incomingData')

// 进件管理
const intoPieces = r => require.ensure([], () => r(require('../page/incomingData/intoPieces')), 'incomingData')

// 进件管理详情
const intoPieceDetail = r => require.ensure([], () => r(require('../page/incomingData/intoPieces/children/detail')), 'incomingData')

/**
 * 贷款管理
 */
const postLanMgmt = r => require.ensure([], () => r(require('../page/postLanMgmt')), 'postLan')

// 放款申请
const lendingApply = r => require.ensure([], () => r(require('../page/postLanMgmt/Lending/apply')), 'postLan')

// 放款申请详情
const lendingApplyDetail = r => require.ensure([], () => r(require('../page/postLanMgmt/Lending/apply/children/detail')), 'postLan')

/**
 * 系统管理
 */
const systemMgmt = r => require.ensure([], () => r(require('../page/systemMgmt')), 'system')

// 用户管理
const user = r => require.ensure([], () => r(require('../page/systemMgmt/user')), 'system')

// 客户经理管理
const customer = r => require.ensure([], () => r(require('../page/systemMgmt/customerManager')), 'system')

Vue.use(Router)

// 路由对象
const router = new Router({
  routes: [{
    path: '/login',
    name: 'Login',
    component: login
  }, {
    path: '/',
    name: 'Home',
    component: home,
    meta: {
      requireAuth: true
    },
    children: [{ // 进件系统
      path: 'incoming',
      name: 'incomingData',
      component: incomingData,
      children: [{ // 进件管理
        path: 'intoPieces',
        name: 'intoPieces',
        meta: {
          requireAuth: true
        },
        component: intoPieces,
        children: [{
          path: 'detail',
          name: 'intoPieceDetail',
          component: intoPieceDetail,
          meta: {
            requireAuth: true
          }
        }]
      }]
    }, { // 业务流程
      path: 'operationFlow',
      name: 'operationFlow',
      meta: {
        requireAuth: true
      },
      children: []
    }, { // 贷款管理
      path: 'postLanMgmt',
      name: 'postLanMgmt',
      component: postLanMgmt,
      meta: {
        requireAuth: true
      },
      children: [{ // 贷款申请
        path: 'lendingApply',
        name: 'lendingApply',
        component: lendingApply,
        meta: {
          requireAuth: true
        },
        children: [{
          path: 'detail',
          name: 'lendingApplyDetail',
          component: lendingApplyDetail,
          meta: {
            requireAuth: true
          }
        }]
      }]
    }, { // 大数据风控
      path: 'bigDataRiskMgmt',
      name: 'bigDataRiskMgmt',
      meta: {
        requireAuth: true
      },
      children: []
    }, { // 报表统计
      path: 'report',
      name: 'report',
      meta: {
        requireAuth: true
      },
      children: []
    }, { // 系统管理
      path: 'systemMgmt',
      name: 'systemMgmt',
      component: systemMgmt,
      meta: {
        requireAuth: true
      },
      children: [{ // 用户管理
        path: 'user',
        name: 'user',
        component: user,
        meta: {
          requireAuth: true
        }
      }, { // 客户经理管理
        path: 'customerMgmt',
        name: 'customerManager',
        component: customer,
        meta: {
          requireAuth: true
        }
      }]
    }]
  }]
})

// enter钩子
router.beforeEach((to, from, next) => {
  let auth = getStore('ready')
  let navs = getStore('navs')
  // 需要登录的路由检测登录状态
  if (to.meta.requireAuth) {
    if (!auth) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      if (to.query.index !== undefined && to.query.index !== navs.active) {
        store.commit('SET_NAV', {
          active: to.query.index,
          data: navs.data
        })
        store.commit('SET_MENU', {
          active: 0,
          data: navs.data[to.query.index].children
        })
      }
      next()
    }
  } else {
    if (to.path === '/login' && auth) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  }
})

export default router
