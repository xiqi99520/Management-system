const state = {
  ready: false,
  userInfo: '',
  navs: {
    active: '',
    data: []
  },
  menus: {
    active: 0,
    data: null
  },
  btns: [],
  imgDialog: {
    show: false,
    file: '',
    name: '',
    mark: ''
  },
  bigImg: {
    showBigImg: false,
    imgName: '',
    imgType: '',
    imgUrl: ''
  },
  allStates: {
    C1000: '全部',
    C1001: '评房中',
    C1002: '待推荐',
    C1003: '待分配',
    C1004: '待跟进',
    C1005: '待录入',
    C1006: '待放款审核',
    C1007: '驳回补件',
    C1008: '审核通过',
    C1009: '审核不通过',
    C1010: '客户放弃'
  },
  allOperations: {
    C2000: '运营总监分配'
  },
  production: {
    showDialog: false
  },
  productDetail: {
    showDialog: false,
    productId: ''
  }
}

export default state
