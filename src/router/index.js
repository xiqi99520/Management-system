import Vue from 'vue'
import Router from 'vue-router'
import {
  getStore
} from '@/util/utils'
import store from '@/store'

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

// 渠道管理
const channelMgmt = r => require.ensure([], () => r(require('@/page/incomingData/channel')), 'channelMgmt')

// 新增渠道
const channelAdd = r => require.ensure([], () => r(require('@/page/incomingData/channel/children/channel-add')), 'channelMgmt')

// 支行管理
const branchList = r => require.ensure([], () => r(require('@/page/incomingData/branch')), 'channelMgmt')

// 客户经理管理
const managerList = r => require.ensure([], () => r(require('@/page/incomingData/manager')), 'channelMgmt')

// 新增客户经理
const managerAdd = r => require.ensure([], () => r(require('@/page/incomingData/channel/children/manager-add')), 'channelMgmt')

// 客户经理详情
const managerDetail = r => require.ensure([], () => r(require('@/page/incomingData/channel/children/manager-detail')), 'channelMgmt')

// 客户管理
const customerMgmt = r => require.ensure([], () => r(require('@/page/incomingData/customer')), 'customerMgmt')

// 客户详情
const customerDetail = r => require.ensure([], () => r(require('@/page/incomingData/customer/children/detail')), 'customerMgmt')

/**
 * 贷款管理
 */
const postLanMgmt = r => require.ensure([], () => r(require('../page/postLanMgmt')), 'postLan')

// 放款申请
const lendingApply = r => require.ensure([], () => r(require('../page/postLanMgmt/Lending/apply')), 'postLan')

// 放款申请详情
const lendingApplyDetail = r => require.ensure([], () => r(require('../page/postLanMgmt/Lending/apply/children/detail')), 'postLan')

const loanSys = r => require.ensure([], () => r(require('@/page/postLanMgmt')), 'postLan')

// 房产评估
const valuationMgt = r => require.ensure([], () => r(require('@/page/postLanMgmt/valuationMgt/index')), 'postLan')

// 房产评估
const evaluation = r => require.ensure([], () => r(require('@/page/postLanMgmt/valuationMgt/index')), 'postLan')

// 下户尽调
const xhResearch = r => require.ensure([], () => r(require('@/page/postLanMgmt/xhResearch/index')), 'postLan')
const xhTaskList = r => require.ensure([], () => r(require('@/page/postLanMgmt/xhResearch/children/taskList')), 'postLan')

// 下户复核
const xhRecheck = r => require.ensure([], () => r(require('@/page/postLanMgmt/xhRecheck/index')), 'postLan')

// 风控审批
const riskApproval = r => require.ensure([], () => r(require('@/page/postLanMgmt/riskApproval/index')), 'postLan')

// 合同面签
const interview = r => require.ensure([], () => r(require('@/page/postLanMgmt/interview/index')), 'postLan')

// 权证上抵
const warrants = r => require.ensure([], () => r(require('@/page/postLanMgmt/warrants/index')), 'postLan')

// 风控审查
const riskCheck = r => require.ensure([], () => r(require('@/page/postLanMgmt/riskCheck/index')), 'postLan')

/**
 * 系统管理
 */
const systemMgmt = r => require.ensure([], () => r(require('../page/systemMgmt')), 'system')

// 用户管理
const user = r => require.ensure([], () => r(require('../page/systemMgmt/user')), 'system')

// 客户经理管理
const customer = r => require.ensure([], () => r(require('../page/systemMgmt/customerManager')), 'system')

// 资金项目管理
const financeMgmt = r => require.ensure([], () => r(require('../page/systemMgmt/financeProject')), 'system')

// 账户管理
const account = r => require.ensure([], () => r(require('../page/systemMgmt/accountMgmt')), 'system')

// 产品管理
const production = r => require.ensure([], () => r(require('../page/systemMgmt/productionMgmt')), 'system')

/**
 * 台账
 */
const standingBook = r => require.ensure([], () => r(require('../page/standingBook')), 'standingBook')

// 预拨申请
const predialing = r => require.ensure([], () => r(require('../page/standingBook/predialing')), 'predialing')

// 预拨申请记录
const predialingLog = r => require.ensure([], () => r(require('../page/standingBook/predialingLog')), 'predialingLog')

// 放款入账
const lending = r => require.ensure([], () => r(require('../page/standingBook/lending')), 'lending')

// 台账查询
const standingBookSearch = r => require.ensure([], () => r(require('../page/standingBook/standingBookSearch')), 'standingBookSearch')

// 逾期列表
const overdueList = r => require.ensure([], () => r(require('../page/standingBook/overdueList')), 'overdueList')

// 还款入账
const reimbursement = r => require.ensure([], () => r(require('../page/standingBook/reimbursement')), 'reimbursement')

// 代偿入账
const compensableAdmission = r => require.ensure([], () => r(require('../page/standingBook/compensableAdmission')), 'compensableAdmission')

// 提前还款管理
const earlyRepayment = r => require.ensure([], () => r(require('../page/standingBook/earlyRepayment')), 'earlyRepayment')

// 减免管理
const reductionManage = r => require.ensure([], () => r(require('../page/standingBook/reductionManage')), 'reductionManage')

// 退款申请
const refundApplication = r => require.ensure([], () => r(require('../page/standingBook/refundApplication')), 'standingBook')

// 退款入账
const refundsCredited = r => require.ensure([], () => r(require('../page/standingBook/refundsCredited')), 'standingBook')

// 专户、待拨户非业务类流水记录
const nonBusinessRecords = r => require.ensure([], () => r(require('../page/standingBook/nonBusinessRecords')), 'standingBook')

// 第三方支付非业务类流水记录
const thirdPartyRecords = r => require.ensure([], () => r(require('../page/standingBook/thirdPartyRecords')), 'standingBook')

// 放还款流水记录查询
const repayingWaterRecords = r => require.ensure([], () => r(require('../page/standingBook/repayingWaterRecords')), 'standingBook')

// 账户余额查询
const accountBalance = r => require.ensure([], () => r(require('../page/standingBook/accountBalance')), 'standingBook')

// 渤海对接文档审核
const dockDocumentReview = r => require.ensure([], () => r(require('../page/standingBook/dockDocumentReview')), 'standingBook')

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
      requireAuth: false
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
      }, { // 渠道管理
        path: 'channelMgmt',
        component: channelMgmt,
        name: 'channelMgmt',
        children: [{
          path: 'channelAdd',
          name: 'channelAdd',
          component: channelAdd
        }, {
          path: 'managerDetail',
          name: 'managerDetail',
          component: managerDetail
        }]
      }, {
        path: 'branchList',
        name: 'branchList',
        component: branchList
      }, {
        path: 'managerList',
        name: 'managerList',
        component: managerList
      }, { // 客户管理
      path: 'customerMgmt',
      component: customerMgmt,
      name: 'customerMgmt',
      children: [{
        path: 'view',
        name: 'customerDetail',
        component: customerDetail
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
        }
      }, {
        path: 'detail',
        name: 'lendingApplyDetail',
        component: lendingApplyDetail,
        meta: {
          requireAuth: true
        }
      }, { // 房产评估
        path: 'evaluation',
        name: 'evaluation',
        component: evaluation,
        meta: {
          requireAuth: true
        }
      }, { // 下户尽调
        path: 'xhResearch',
        name: 'xhResearch',
        component: xhResearch,
        meta: {
          requireAuth: true
        },
        children: [{
          path: 'list',
          name: 'xhTaskList',
          component: xhTaskList
        }]
      }, { // 下户复核
        path: 'xhRecheck',
        name: 'xhRecheck',
        component: xhRecheck,
        meta: {
          requireAuth: true
        }
      }, { // 风控审批
        path: 'riskApproval',
        name: 'riskApproval',
        component: riskApproval,
        meta: {
          requireAuth: true
        }
      }, { // 合同面签
        path: 'interview',
        name: 'interview',
        component: interview,
        meta: {
          requireAuth: true
        }
      }, { // 权证上抵
        path: 'warrants',
        component: warrants,
        meta: {
          requireAuth: true
        }
      }, { // 风控审查
        path: 'riskCheck',
        name: 'riskCheck',
        component: riskCheck,
        meta: {
          requireAuth: true
        }
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
      }, { // 项目资金管理
        path: 'financeMgmt',
        name: 'financeMgmt',
        component: financeMgmt,
        meta: {
          requireAuth: true
        }
      }, { // 产品管理
        path: 'productionMgmt',
        name: 'productionMgmt',
        component: production,
        meta: {
          requireAuth: true
        }
      }, { // 账户管理
        path: 'accountMgmt',
        name: 'accountMgmt',
        component: account,
        meta: {
          requireAuth: true
        }
      }]
    }, { // 台账
      path: 'standingBook',
      name: 'standingBook',
      component: standingBook,
      meta: {
        requireAuth: true
      },
      children: [{ // 预拨申请
        path: 'predialing',
        name: 'predialing',
        component: predialing,
        meta: {
          requireAuth: true
        }
      }, { // 预拨申请记录
        path: 'predialingLog',
        name: 'predialingLog',
        component: predialingLog,
        meta: {
          requireAuth: true
        }
      }, { // 放款入账
        path: 'lending',
        name: 'lending',
        component: lending,
        meta: {
          requireAuth: true
        }
      }, { // 台账查询
        path: 'standingBookSearch',
        name: 'standingBookSearch',
        component: standingBookSearch,
        meta: {
          requireAuth: true
        }
      }, { // 逾期列表
        path: 'overdueList',
        name: 'overdueList',
        component: overdueList,
        meta: {
          requireAuth: true
        }
      }, { // 还款入账
        path: 'reimbursement',
        name: 'reimbursement',
        component: reimbursement,
        meta: {
          requireAuth: true
        }
      }, { // 代偿入账
        path: 'compensableAdmission',
        name: 'compensableAdmission',
        component: compensableAdmission,
        meta: {
          requireAuth: true
        }
      }, { // 提前还本管理
        path: 'earlyRepayment',
        name: 'earlyRepayment',
        component: earlyRepayment,
        meta: {
          requireAuth: true
        }
      }, { // 减免管理
        path: 'reductionManage',
        name: 'reductionManage',
        component: reductionManage,
        meta: {
          requireAuth: true
        }
      }, { // 退款申请
        path: 'refundApplication',
        name: 'refundApplication',
        component: refundApplication,
        meta: {
          requireAuth: true
        }
      }, { // 退款入账
        path: 'refundsCredited',
        name: 'refundsCredited',
        component: refundsCredited,
        meta: {
          requireAuth: true
        }
      }, { // 专户、待拨户非业务类流水记录
        path: 'nonBusinessRecords',
        name: 'nonBusinessRecords',
        component: nonBusinessRecords,
        meta: {
          requireAuth: true
        }
      }, { // 第三方支付非业务类流水记录
        path: 'thirdPartyRecords',
        name: 'thirdPartyRecords',
        component: thirdPartyRecords,
        meta: {
          requireAuth: true
        }
      }, { // 放还款流水记录查询
        path: 'repayingWaterRecords',
        name: 'repayingWaterRecords',
        component: repayingWaterRecords,
        meta: {
          requireAuth: true
        }
      }, { // 账户余额查询
        path: 'accountBalance',
        name: 'accountBalance',
        component: accountBalance,
        meta: {
          requireAuth: true
        }
      }, { // 渤海对接文档审核
        path: 'dockDocumentReview',
        name: 'dockDocumentReview',
        component: dockDocumentReview,
        meta: {
          requireAuth: true
        }
      }]
    }]
  }]
})

const getActiveMenu = (menus, active = '') => {
  let menu = menus[0]
  let str = active.length ? active : '0'
  if (menu.type === '菜单') {
    return getActiveMenu(menu.children, str + '-')
  } else if (menu.type === '页面') {
    if (str.includes('-')) {
      return str + '0'
    } else {
      return '0'
    }
  }
}

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
        let nActive = String(to.query.index)
        let menu = navs.data[to.query.index].children
        let mActive = getActiveMenu(menu)
        store.commit('SET_NAV', {
          active: nActive,
          data: navs.data
        })
        store.commit('SET_MENU', {
          active: mActive,
          data: menu
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
