import {
  fetch
} from '../util/axios'

const env = process.env
const context = env.CONTEXT

/**
 * 一级接口
 */

// 公开方法
const publicInterface = `${context}/public`

// 用户接口
const userInterface = `${context}/user`

// 角色接口
const roleInterface = `${context}/role`

// 组织机构
const organizationInterface = `${context}/organization`

// 进件控制器
const incomingDataInterface = `${context}/incomingData`

// 贷款申请
const loanApplyInterface = `${context}/loanApply`

// 录入放款信息
const enteringInterface = `${context}/entering`

// 权限接口
const permissionInterface = `${context}/permission`

// 影像资料
const loanApplyPhotoInterface = `${context}/LoanApplyPhoto`
/**
 * 详细接口URL
 */

// 获取加密盐
const md5Url = `${publicInterface}/loginEncryptSalt`

// 获取角色列表
const getRoleListUrl = `${roleInterface}/getRolesList`

// 更新客户经理
const updateManagerUrl = `${userInterface}/updateManager`

// 获取下拉框选项URL
const dictUrl = `${publicInterface}/getDict`

// 获取城市列表URL
const subLocationUrl = `${publicInterface}/getSubLocation`

// 获取已开通服务城市
const displayLocationUrl = `${publicInterface}/displayLocations`

// 无法登陆用户修改密码
const pchangePwdUrl = `${publicInterface}/changePassword`

// 登录
const loginUrl = `${context}/login`

// 登出
const logOutUrl = `${context}/logout`

// 获取当前用户信息
const userInfoUrl = `${userInterface}/currentUser`

// 查询用户
const usersUrl = `${userInterface}/findUsers`

// 登录
const newUserUrl = `${userInterface}/addSingleUser`

// 登录
const updateUserUrl = `${userInterface}/updateUser`

// 登录
const resetUserPwdUrl = `${userInterface}/resetPassword`

// 登录
const managerUrl = `${userInterface}/findManagers`

// 登录
const addManagerUrl = `${userInterface}/addManager`

// 登录
const acceptorsUrl = `${userInterface}/findAcceptors`

// 登录
const changePwdUrl = `${userInterface}/changePassword`

// 查询角色
const rolesUrl = `${roleInterface}/findRoles`

// 登录
const organizationUrl = `${organizationInterface}/getOrganizations`

// 获取进件列表
const incomingUrl = `${incomingDataInterface}/findIncomingData`

// 获取放款信息列表
const LoanApplyDataUrl = `${incomingDataInterface}/findLoanApplyData`

// 登录
const operationsUrl = `${incomingDataInterface}/getAllOperations`

// 登录
const incomingDataDetailUrl = `${incomingDataInterface}/getIncomingDataDetail`

// 登录
const statesUrl = `${incomingDataInterface}/getAllStates`

// 审核通过
const auditPassUrl = `${loanApplyInterface}/auditPass`

// 审核不通过
const auditRefuseUrl = `${loanApplyInterface}/auditApplyRefuse`

// 登录
const auditCancelUrl = `${loanApplyInterface}/auditApplyCancel`

// 登录
const assignUrl = `${loanApplyInterface}/assignAcceptor`

// 登录
const acceptorHandleUrl = `${loanApplyInterface}/acceptorHandle`

// 登录
const agencyPredictMoneyUrl = `${loanApplyInterface}/agencyPredictMoney`

// 风控总监不通过
const auditApplyRefuseUrl = `${loanApplyInterface}/auditApplyRefuse`

// 风控总监终审通过
const auditApplyPassUrl = `${loanApplyInterface}/loanApply/auditApplyPass`

// 驳回补件
const rejectApplyUrl = `${loanApplyInterface}/rejectApply`

// 放款上传图片
const uploadImgDataUrl = `${loanApplyPhotoInterface}/addImageData`

// 放款删除图片
const deleteImgDataUrl = `${loanApplyPhotoInterface}/deletePhoto`

// 更新放款影像资料
const updataImgDataUrl = `${loanApplyPhotoInterface}/updateImageData`

// 放款申请详情URL
const applyDetailUrl = `${enteringInterface}/getDataByApplyId`

// 联想查询服务人员列表
const queryServantUrl = `${enteringInterface}/thinkQueryServants`

// 自动保存数据
const autoWriteUrl = `${enteringInterface}/write`

// 完成录入操作
const completeEnteringUrl = `${enteringInterface}/completeEntering`

// 查询下户费
const underCostUrl = `${enteringInterface}/findUnderCostByApplyId`

// 删除共同的担保人
const deleteLenderUrl = `${enteringInterface}/deleteLender`

// 查询所有权限
const findPermUrl = `${permissionInterface}/findPermissions`

/**
 * 接口实现
 */
// 登陆加密盐
export const getMD5 = () => fetch(md5Url)

// 登陆
export const Login = (username, password) => fetch(loginUrl, {
  username,
  password,
  loginMode: 'PhonePassword'
}, 'post')

// 获取当前登陆的用户及权限角色信息
export const getCurrentUser = () => fetch(userInfoUrl)

// 分页查找用户
export const getUsersInfo = (input, roleId, offset = 0, limit = 15) => fetch(usersUrl, {
  input,
  roleId,
  offset,
  limit
}, 'post')

export const getRolesInfo = () => fetch(rolesUrl, {}, 'post')

export const doNewUser = (formData, gender = '保密') => fetch(newUserUrl, {
  cityRoles: formData.role,
  phoneNo: formData.phone,
  state: formData.state,
  roleId: formData.roleId,
  username: formData.username,
  gender
}, 'post')

export const doUpdateUser = (formData, gender = '保密') => fetch(updateUserUrl, {
  cityRoles: formData.role,
  userId: formData.userId,
  username: formData.username,
  phoneNo: formData.phone,
  gender,
  state: formData.state
}, 'post')

export const doRsetUserPwd = (phoneNo) => fetch(resetUserPwdUrl, {
  phoneNo
}, 'post')

export const getManagers = (input = '', city = '', offset = 0, limit = 15, count = true) => fetch(managerUrl, {
  offset,
  limit,
  count,
  input,
  city
}, 'post')

// 获取客户经理模板url
export const templateFileUrl = `${userInterface}/customManagerImportTemplate`

export const uploadManagerUrl = `${context}/user/importManagerInfos`

export const doAddManager = (form, gender = '保密') => fetch(addManagerUrl, {
  phoneNo: form.phoneNo,
  name: form.username,
  gender,
  organizationId: form.organizationId,
  operateNo: form.operateNo,
  location: form.areaName
}, 'post')

export const getOrganizations = (type = '', parentId = '', name = '', city = '') => fetch(organizationUrl, {
  type,
  parentId,
  name,
  city
})

// 获取进件列表
export const getIncomingData = (formData, page, limit, count = true) => fetch(incomingUrl, {
  input: formData.input,
  state: formData.state === '全部' ? '' : formData.state,
  lastOperation: formData.lastOperation,
  applyBeginTime: formData.dateRange[0] || '',
  applyEndTime: formData.dateRange[1] || '',
  offset: (page - 1) * limit,
  limit,
  count
}, 'post')

export const getAcceptors = (name = '') => fetch(acceptorsUrl, {
  name
}, 'post')

export const getAllOperations = () => fetch(operationsUrl)

export const getAllStates = () => fetch(statesUrl)

// 放款审核通过
export const auditPass = (form) => fetch(auditPassUrl, form)

// 放款审核不通过
export const auditRefuse = (form) => fetch(auditRefuseUrl, form)

export const auditApplyCancel = (form) => fetch(auditCancelUrl, form)

export const assignAcceptor = (form) => fetch(assignUrl, form)

export const acceptorHandle = (form) => fetch(acceptorHandleUrl, form)

export const getIncomingDataDetail = (applyId) => fetch(incomingDataDetailUrl, {
  applyId
})

export const agencyPredictMoney = (form) => fetch(agencyPredictMoneyUrl, form, 'post')

// 修改密码
export const changePwd = (form) => fetch(changePwdUrl, form, 'post')

// 放款申请详情
export const applyDetail = (uuid) => fetch(applyDetailUrl + '/' + uuid, {}, 'post')
// export const applyDetail = () => fetch('http://localMock.com/getApplyDetail')

// 获取下拉框选项
export const getDict = (queryList) => fetch(dictUrl, queryList, 'post')

// 获取所有城市列表
export const getSubLocation = (parentId) => fetch(subLocationUrl, {
  parentId
}, 'post')

// 获取已开通服务城市列表
export const getDisplayLocation = () => fetch(displayLocationUrl, {}, 'post')

// 自动保存当前区域信息至服务器
export const autoWrite = (uuid, area, saveEntity) => fetch(`${autoWriteUrl}/${uuid}/${area}`, saveEntity, 'post')

// 联想查询服务人员列表
export const queryServants = () => fetch(queryServantUrl, {}, 'post')
// export const queryServants = () => fetch('http://localMock.com/getServants')

// 上传图片
export const uploadImg = (form) => fetch(uploadImgDataUrl, form, 'post')

// 删除图片
export const deletePhoto = (photoId) => fetch(deleteImgDataUrl, {
  photoId
}, 'post')

// 更新放款的影像资料
export const updataImgData = (form) => fetch(updataImgDataUrl, form, 'post')

// 登出
export const logOut = () => fetch(logOutUrl, {}, 'post')

// 获取角色列表
export const getRoleList = (input, offset = 0, limit = 15) => fetch(getRoleListUrl, {
  input,
  offset,
  limit
}, 'post')

// 更新客户经理
export const updateManager = (formData) => fetch(updateManagerUrl, {
  userId: formData.userId,
  username: formData.username,
  state: formData.state,
  phoneNo: formData.phoneNo,
  operateNo: formData.operateNo,
  organizationId: formData.branch,
  city: formData.areaName
}, 'post')

// 完成录入操作
export const completeEntering = (uuid) => fetch(`${completeEnteringUrl}/${uuid}`, {}, 'post')

// 查询所有权限
export const findPerms = () => fetch(findPermUrl, {}, 'post')

// 风控总监审核不通过
export const auditApplyRefuse = (form) => fetch(auditApplyRefuseUrl, form)

// 风控总监终审通过
export const auditApplyPass = (form) => fetch(auditApplyPassUrl, form)

// 驳回补件
export const rejectApply = (form) => fetch(rejectApplyUrl, form)

// 获取放款信息列表
export const getloanApplyData = (formData, page, limit, count = true) => fetch(LoanApplyDataUrl, {
  input: formData.input,
  state: formData.state,
  lastOperation: formData.lastOperation,
  applyBeginTime: formData.dateRange[0] || '',
  applyEndTime: formData.dateRange[1] || '',
  offset: (page - 1) * limit,
  limit,
  count
}, 'post')

// 无法登陆用户修改密码
export const pchangePwd = (form) => fetch(pchangePwdUrl, form, 'post')

// 查询下户费
export const findUnderCost = (uuid) => fetch(`${underCostUrl}/${uuid}`)

// 删除共同的担保人
export const deleteLender = (uuid, mainly) => fetch(`${deleteLenderUrl}/${uuid}/${mainly}`)
