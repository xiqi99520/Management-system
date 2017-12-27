import store from '@/store'
import {
  getDict
} from '@/service/getData'

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  content = JSON.stringify(content)
  window.sessionStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  try {
    return JSON.parse(window.sessionStorage.getItem(name))
  } catch (error) {
    return null
  }
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.sessionStorage.removeItem(name)
}

/**
 * 表单数据验证
 */
export const valiData = {
  phone: (rules, value, callback) => { // 检查电话号码有效性
    if (!value) {
      return callback(new Error('手机号码不能为空'))
    } else if (!(/^1[0-9]\d{9}$/.test(value))) {
      return callback(new Error('手机号码输入有误'))
    } else {
      return callback()
    }
  },
  operateNo: (rules, value, callback) => { // 检查工行营销代码有效性
    if (!value) {
      return callback(new Error('工行营销代码不能为空'))
    } else if (!(/^\d{1,10}$/.test(value))) {
      return callback(new Error('最多接受长度为10位的数字'))
    } else {
      return callback()
    }
  },
  predictMoney: (rules, value, callback) => { // 检查合同金额有效性
    if (!value) {
      return callback(new Error('合同金额不能为空'))
    } else if (!(/(^[3-9][0-9]|^[1-9][0-9]{2}|^[1][0-9]{3}|2000)$/.test(value))) {
      return callback(new Error('最小金额为30，最大金额为2000的正整数'))
    } else {
      return callback()
    }
  },
  recordMoney: (rules, value, callback) => { // 检查录入第三方机构评估值有效性
    if (!value) {
      return callback(new Error('合同金额不能为空'))
    } else if (!(/^[1-9]\d*$/.test(value))) {
      return callback(new Error('合同金额为非0开头的正整数'))
    } else {
      return callback()
    }
  },
  onlyString: (rules, value, callback) => { // 判断是否全为数字或字符
    if (!(/^[0-9a-zA-Z]*$/g.test(value))) {
      return callback(new Error('必须输入数字或字母'))
    } else {
      return callback()
    }
  },
  onlyNumber: (rules, value, callback) => { // 判断是否全为数字
    if (!(/^[0-9]*$/g.test(value))) {
      return callback(new Error('必须全为数字'))
    } else {
      return callback()
    }
  },
  onlyFloat: (rule, value, callback) => { // 浮点数判断
    if (!(/^\d+(\.\d+)?$/g.test(value))) {
      return callback(new Error('请输入正确的数值'))
    } else {
      return callback()
    }
  },
  nullValue: (rule, value, callback) => { // 空值判断
    if (!value) {
      return callback(new Error('输入不能为空'))
    } else {
      return callback()
    }
  },
  postNumber: (rules, value, callback) => { // 邮政编码
    if (value && !(/^[1-9][0-9]{5}$/.test(value))) {
      return callback(new Error('中国邮政编码为6位数字'))
    } else {
      return callback()
    }
  },
  homePhoneNumber: (rules, value, callback) => { // 检查录入第三方机构评估值有效性
    if (!value) {
      return callback()
    } else if (!(/(^(\d{3,4}-)?\d{7,8})$|(^1[0-9]\d{9}$)/.test(value))) {
      return callback(new Error('联系方式输入有误'))
    } else {
      return callback()
    }
  },
  getYear: (rules, value, callback) => { // 检查录入第三方机构评估值有效性
    const year = new Date()
    if (!value) {
      return callback(new Error('年限不能为空'))
    } else if (Date.parse(value) > year.getTime()) {
      return callback(new Error('请输入正确的年限范围'))
    } else {
      return callback()
    }
  }
}

// 格式化函数
export const formatter = {
  money: (value, base = 10000, fixed = 0) => {
    if (!value) {
      return ''
    } else {
      let m = Number((value / base).toFixed(fixed))
      return String(m / 100).replace(/(?=((?!\b)\d{3})+$)/g, ',')
      // return '￥' + String(value / 100).replace(/(?=((?!\b)\d{3})+$)/g, ',')
    }
  },
  changeMoney: (value, base = 100, prefix = '') => { // 将6000000的数值转换成￥6,000,000.00格式
    if (!value) {
      return ''
    } else {
      value = String(value / base)
      if (value.indexOf('.') !== -1) {
        if (value.split('.')[1].length <= 2) {
          // value.split('.')[1]
          return prefix + value.split('.')[0].replace(/(?=((?!\b)\d{3})+$)/g, ',') + '.' + value.split('.')[1].padEnd(2, '0')
        } else {
          return prefix + value.split('.')[0].replace(/(?=((?!\b)\d{3})+$)/g, ',') + '.' + value.split('.')[1].substring(0, 2)
        }
      } else {
        return prefix + String(value).replace(/(?=((?!\b)\d{3})+$)/g, ',') + '.00'
      }
    }
  },
  serialNumber: (idx, pageSize, currentPage) => {
    return idx + 1 + pageSize * (currentPage - 1)
  },
  // intoPieceState: (row) => {
  //   const state = row.state
  //   const lastOperation = row.lastOperation
  //   if (state === '客户已申请') {
  //     return '评房'
  //   } else if (state === '已提交贷款') {
  //     return '评房'
  //   } else if (state === '待风控总监预审') {
  //     return '评房'
  //   } else if (state === '风控已预审') {
  //     if (lastOperation === '客户经理已提交') {
  //       return '待分配'
  //     } else {
  //       return '待客户经理推荐'
  //     }
  //   } else if (state === '已分配') {
  //     return '待受理'
  //   } else if (state === '已跟进') {
  //     return '待终审'
  //   } else if (state === '待录入') {
  //     if (lastOperation === '驳回补件') {
  //       return '驳回补件'
  //     }
  //     return state
  //   } else {
  //     return state
  //   }
  // },
  homeAddress: (loanApply, detail = false) => {
    let address = ''
    if (loanApply.houseProvince !== '-') {
      address += `${loanApply.houseProvince}省`
    }
    if (loanApply.houseCity !== '-') {
      address += `${loanApply.houseCity}市`
    }
    if (loanApply.houseRegion !== '-') {
      address += loanApply.houseRegion
    }
    if (detail && loanApply.communityName !== '-') {
      address += loanApply.communityName
    }
    return address
  },
  convertCurrency: (money, base = 100) => {
    // 汉字的数字
    let cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
    // 基本单位
    let cnIntRadice = ['', '拾', '佰', '仟']
    // 对应整数部分扩展单位
    let cnIntUnits = ['', '万', '亿', '兆']
    // 对应小数部分单位
    let cnDecUnits = ['角', '分', '毫', '厘']
    // 整数金额时后面跟的字符
    let cnInteger = '整'
    // 整型完以后的单位
    let cnIntLast = '元'
    // 最大处理的数字
    let maxNum = 999999999999999.9999
    // 金额整数部分
    let integerNum
    // 金额小数部分
    let decimalNum
    // 输出的中文金额字符串
    let chineseStr = ''
    // 分离金额后用的数组，预定义
    let parts
    if (money === '') {
      return ''
    }
    money = parseFloat(money / base)
    if (money >= maxNum) {
      // 超出最大处理数字
      return ''
    }
    if (money === 0) {
      chineseStr = cnNums[0] + cnIntLast + cnInteger
      return chineseStr
    }
    // 转换为字符串
    money = money.toString()
    if (money.indexOf('.') === -1) {
      integerNum = money
      decimalNum = ''
    } else {
      parts = money.split('.')
      integerNum = parts[0]
      decimalNum = parts[1].substr(0, 4)
    }
    // 获取整型部分转换
    if (parseInt(integerNum, 10) > 0) {
      let zeroCount = 0
      let IntLen = integerNum.length
      for (let i = 0; i < IntLen; i++) {
        let n = integerNum.substr(i, 1)
        let p = IntLen - i - 1
        let q = p / 4
        let m = p % 4
        if (n === '0') {
          zeroCount++
        } else {
          if (zeroCount > 0) {
            chineseStr += cnNums[0]
          }
          // 归零
          zeroCount = 0
          chineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
        }
        if (m === 0 && zeroCount < 4) {
          chineseStr += cnIntUnits[q]
        }
      }
      chineseStr += cnIntLast
    }
    // 小数部分
    if (decimalNum !== '') {
      let decLen = decimalNum.length
      for (let i = 0; i < decLen; i++) {
        let n = decimalNum.substr(i, 1)
        if (n !== '0') {
          chineseStr += cnNums[Number(n)] + cnDecUnits[i]
        }
      }
    }
    if (chineseStr === '') {
      chineseStr += cnNums[0] + cnIntLast + cnInteger
    } else if (decimalNum === '') {
      chineseStr += cnInteger
    }
    return chineseStr
  },
  renderBtn: (code) => {
    const btns = getStore('btns')
    let result = false
    if (!btns) {
      return false
    } else {
      btns.map(btn => {
        if (btn.code === code) {
          result = true
          return true
        }
      })
      return result
    }
  }
}

/**
 * 回车事件
 */
export const keydownSubmit = (submitFun, formName) => {
  document.body.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      submitFun(formName)
    }
  })
}

/**
 * 查看大图
 */
export const showBigImg = (photo) => {
  store.commit('SET_BIGIMG', {
    showBigImg: true,
    imgName: photo.name || '',
    imgType: photo.format,
    imgUrl: photo.url
  })
}

/**
 * 日期选择器快捷选择功能
 */
export const pickerOptions = {
  shortcuts: [{
    text: '最近一周',
    onClick: (picker) => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick: (picker) => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick: (picker) => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }]
}

/**
 * 初始化下拉框的值
 * @param {Ayyay} selects 查询的下拉框type
 * @param {Object} form 赋值
 */
export const initSelectOptions = (selects, form) => {
  return getDict(selects)
    .then(resp => {
      if (resp.success) {
        Object.entries(resp.data).map(([key, value]) => {
          if (Object.keys(form).includes(key)) {
            form[key] = form[key].concat(value)
          }
        })
        return form
      } else {
        throw new Error(resp.message)
      }
    })
    .catch(err => {
      console.log(err.resonse ? err.response.data : err.message)
      return form
    })
}
