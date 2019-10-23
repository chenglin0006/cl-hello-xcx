/**
 * Created by user on 16/5/27.
 */


var msgList = '/u/msg/list.do';
var projectList = '/project/search.do';
var fieldList = '/u/project/to.do';
var projectProgressDetail = '/u/project/progress/detail.do';
var checkList = '/u/project/check/list.do';
var appUpdate = '/u/app/version/check.do';
var messageCount = '/u/msg/unRead.do';



var Url = {

  msgList() {
    return {
      url: msgList,
      type: 'GET',
      param: {}
    }
  },
  projectList(userName, qObj, accessToken, pageSize, curPage) {
    return {
      url: projectList,
      type: 'GET',
      param: {
        userName: userName,
        qObj: qObj,
        accessToken: accessToken,
        pageSize: pageSize,
        curPage: curPage
      }
    }
  },
  /**
  * 样板间筛选条件
  */
  initCondition(terminalType = 8) {
    return {
      url: '/cms-service/prototypeRoom/initCondition.do',
      type: 'GET',
      param: {
        terminalType: terminalType,
      }
    }
  },
  /**
   * 样板间列表
   * @param curPage
   * @param pageSize
   * @param shopCode
   * @param houseLayout
   * @param style
   * @param orderBy //layout(2, "户型样式排序"),style(3, "风格排序");
   * @returns {{url: string, type: string, param: {curPage: *, pageSize: *, shopCode: *, houseLayout: *, style: *}}}
   */
  getCloudHouselist(curPage, pageSize, cityCode, houseLayout, style, orderBy, terminalType = 8) {
    return {
      url: '/cms-service/prototypeRoom/list.do',
      type: 'GET',
      param: {
        curPage,
        pageSize,
        cityCode,
        houseLayout,
        style,
        orderBy,
        terminalType,
      }

    }
  },
  /**
   * 业务介绍
   * @param shopCode
   * @returns {{url: string, type: string, param: {shopCode: *}}}
   */
  getBusinessIntroduction(cityCode, terminalType = 8) {
    return {
      url: '/cms-service/businessIntroduction/detail.do',
      type: 'GET',
      param: {
        cityCode,
        terminalType,
      }
    }
  },
  /**
   *
   * @returns {{url: string, type: string, param: {}}}
   */
  fieldList() {
    return {
      url: fieldList,
      type: 'GET',
      param: {}
    }
  },
  projectProgressDetail(projectId, trackId) {
    return {

      url: projectProgressDetail,
      type: 'GET',
      param: {
        projectId: projectId,
        trackId: trackId,
      }
    }
  },
  projectOnlineList(projectId) {
    return {

      url: '/u/project/check/online-list.do',
      type: 'GET',
      param: {
        projectId: projectId,
      }
    }
  },
  /**
   *
   * @returns {{url: string, type: string, param: {}}}
   */
  checkList(projectId) {
    return {
      url: checkList,
      type: 'GET',
      param: {
        projectId: projectId
      }
    }
  },
  appUpdate(version, platform) {
    return {
      url: appUpdate,
      type: 'GET',
      param: {
        version: version,
        platform: platform,
      }
    }
  },
  /**
   *获取未读消息数
   */
  messageCount() {
    return {
      url: messageCount,
      type: 'GET',
      param: {}
    }
  },
  /***
   * 装修进度
   */
  projectPlanList() {
    return {
      url: '/project/plan/list.do',
      type: 'GET',
      param: {}
    }
  },
  /***
   * 装修日志
   */
  customerTrackList(curPage, pageSize) {
    return {
      url: '/project/customerTrack/list.do',
      type: 'GET',
      param: {
        curPage,
        pageSize
      }
    }
  },
  /***
   * 装修详情
   */
  projectDetail(projectId, curPage, pageSize) {
    return {
      url: '/project/detail.do',
      type: 'GET',
      param: {
        projectId,
        curPage,
        pageSize
      }
    }
  },
  /****
   * 开工确认详情
   * @param projectId 工程Id
   */
  confirmStartDetail(projectId) {
    return {
      url: '/project/confirm/start/detail.do',
      type: 'GET',
      param: {
        projectId,
      }
    }
  },
  /****
   * 开工确认
   * @param projectId 工程Id
   */
  confirmStart(projectId) {
    return {
      url: '/project/confirm/start.do',
      type: 'GET',
      param: {
        projectId,
      }
    }
  },
  /***
   * 施工文件
   */
  projectFiles(projectId) {
    return {
      url: '/project/file/list.do',
      type: 'GET',
      param: {
        projectId,
      }
    }
  },
  /**
   * 获取视频列表
   * @param pageSize curPage projectId
   */
  getVideoList(curPage, pageSize, projectId) {
    return {
      url: '/project/video/list.do',
      type: 'GET',
      param: {
        pageSize: pageSize,
        curPage: curPage,
        projectId: projectId
      }
    }
  },
  /**
   * 获取我的装修列表
   * @param pageSize curPage
   */
  getMydecoList() {
    return {
      url: '/project/list.do',
      type: 'GET',
    }
  },
  /**
   * 消息中心
   */
  getMessageCenterList(curPage, pageSize, categoryId) {
    return {
      url: '/msg/category/list.do',
      type: 'GET',
      param: {
        curPage,
        pageSize,
        categoryId
      }
    }
  },
  /**
   * 修改消息状态为已读
   */
  updataMsgState(msgId) {
    return {
      url: '/msg/state/read/update.do',
      type: 'GET',
      param: {
        msgId
      }
    }
  },
  /*****************************NEW*******************************/
  /****
   * 新家
   * @param projectId
   */
  newHome(projectId) {
    return {
      url: '/bnq_owner/project/queryProject.do',
      type: 'GET',
      param: {
        projectId: projectId,
      }
    }
  },
  /**
   * 退出登录
   */
  logoutUser() {
    return {
      url: '/bnq_owner/apis/auth/logout.do',
      type: 'GET',
    }
  },
  /***
   * 发送登录验证码
   * @param phone 手机号
   */
  sendVerifyCode(phone, picCode, clientType) {
    return {
      url: '/bnq_owner/apis/common/verifyCode/sendV3.do',
      type: 'GET',
      param: {
        phone,
        picCode,
        clientType
      }
    }
  },
  /***
   * 用验证码进行登录
   * @param phone 手机号
   * @param verifyCode    验证码
   * @param clientType 客户端类型(1-ios,2-安卓)
   */
  loginByVerifyCode(phone, verifyCode, clientType) {
    return {
      url: '/bnq_owner/apis/auth/loginByVerifyCode.do',
      type: 'GET',
      param: {
        phone,
        verifyCode,
        clientType
      }
    }
  },
  /***
   * 获取用户信息
   */
  fetchOwnerInfo() {
    return {
      url: '/bnq_owner/mine/fetchOwnerInfo.do',
      type: 'POST',
    }
  },
  /**
   * 获取会员信息
   *
   */
  fetchMemberInfo() {
    return {
      url: '/bnq_owner/mine/getMemberInfo.do',
      type: 'GET',
    }
  },
  /***
   * 获取当前装修工地信息
   */
  fetchCurrentDeco() {
    return {
      url: '/bnq_owner/mine/fetchCurrentDeco.do',
      type: 'POST',
    }
  },
  /****
   * 项目成员
   * @param projectId     工地Id
   */
  members(projectId, clientType) {
    return {
      url: '/bnq_owner/project/projectMember.do',
      type: 'GET',
      param: {
        projectId: projectId,
      }
    }
  },
  /****
   * 项目预算
   * @param projectId     工地Id
   */
  budgets(projectId) {
    return {
      url: '/bnq_owner/project/projectBudget.do',
      type: 'GET',
      param: {
        projectId: projectId,
      }
    }
  },
  /**
   * 我的装修列表
   */
  fetchDecoList(curPage, pageSize) {
    return {
      url: '/bnq_owner/mine/fetchDecoList.do',
      type: 'GET',
      param: {
        curPage: curPage,
        pageSize: pageSize,
      }
    }
  },
  /**
   *  查看评价
   * @param trendId	  动态
   */
  fecthEvaluateDeatial(trendId) {
    return {
      url: '/bnq_owner/project_trend/queryFeedback.do',
      type: 'GET',
      param: {
        trendId: trendId
      }
    }
  },
  /**
   * 提交评价
   * @param
   *     allLevel   总评分
   *     constrResult 施工质量评分
   *     constrService 施工服务评分
   *     designResult 设计评分
   *     designService 设计服务评分
   *     feedbackContent 评价内容
   *     feedbackType 评价类型
   *     isAccompany 是否陪选材料
   *     isDefault 是否默认评价
   *     isRecommend 是否推荐
   *     managerService 客户经理评分
   *     projectId 工地id
   *     refuseReason 不推荐理由
   *     trendId  动态id
   *     supervisionService 监理服务评分
   *     tagIds 不推荐原因id
   */
  sendEvaluate(allLevel, constrResult, constrService, designResult, designService, feedbackContent, feedbackType, isAccompany, isDefault, isRecommend, projectId, refuseReason, trendId, supervisionService, managerService, tagIds, pictures) {
    return {
      url: '/bnq_owner/project_trend/submitFeedback.do',
      type: 'POST',
      param: {
        allLevel: allLevel,
        constrResult: constrResult,
        constrService: constrService,
        designResult: designResult,
        designService: designService,
        feedbackContent: feedbackContent,
        feedbackType: feedbackType,
        isAccompany: isAccompany,
        isDefault: isDefault,
        isRecommend: isRecommend,
        projectId: projectId,
        refuseReason: refuseReason,
        trendId: trendId,
        supervisionService: supervisionService,
        managerService: managerService,
        tagIds: tagIds,
        pictures: pictures,
      }
    }
  },

  fetchDecoList(curPage, pageSize) {
    return {
      url: '/bnq_owner/mine/fetchDecoList.do',
      type: 'GET',
      param: {
        curPage: curPage,
        pageSize: pageSize,
      }
    }
  },
  /** 点赞
  * @param trendId    装修动态id
  */
  approve(trendId) {
    return {
      url: '/bnq_owner/project_trend/Approve.do',
      type: 'POST',
      param: {
        trendId: trendId,
      }
    }
  },
  /**
   * 取消赞
   * @param trendId    装修动态id
   */
  cancelApprove(trendId) {
    return {
      url: '/bnq_owner/project_trend/cancelApprove.do',
      type: 'POST',
      param: {
        trendId: trendId,
      }
    }
  },
  /**
   * 装修动态查询
   * @param trendType 动态类型：0-全部,1-其他,2-验收,3-巡检
   */
  queryTrends(trendType, curPage, pageSize, projectId) {
    return {
      url: '/bnq_owner/project_trend/queryTrends.do',
      type: 'GET',
      param: {
        trendType: trendType,
        curPage: curPage,
        pageSize: pageSize,
        projectId: projectId,
      }
    }
  },
  queryTrendLive(curPage, pageSize, projectId) {

    return {
      url: '/bnq_owner/project_trend/trendLive.do',
      type: 'GET',
      param: {
        curPage: curPage,
        pageSize: pageSize,
        projectId: projectId,
      }
    }
  },
  /**
   * 装修动态提交评论
   * @param comment    评论内容
   * @param trendId    动态id
   */
  submitComment(comment, trendId) {
    return {
      url: '/bnq_owner/project_trend/submitComment.do',
      type: 'POST',
      param: {
        comment: comment,
        trendId: trendId,
      }
    }
  },
  /**
   *我的账号管理
   *
   */
  fetchAccountInfo() {
    return {
      url: '/bnq_owner/userManager/userInfo.do',
      type: 'GET',
    }

  },
  /**
   * 修改账号信息
   *
   */
  changeAccountInfo(headUrl, newName, gender, birthDate, type) {
    return {
      url: '/bnq_owner/userManager/Modify.do',
      type: 'POST',
      param: {
        headUrl: headUrl,
        newName: newName,
        gender: gender,
        birthDate: birthDate,
        type: type,
      }
    }
  },

  /**
   * 获取上传图片接口
   */
  commonOSSToken() {
    return {
      url: '/bnq_owner/apis/common/oss/token/get.do',
      type: 'GET'
    }
  },
  /**
   * 会员卡及明细查询
   * @param curPage   当前第几页
   * @param pageSize  每页显示记录条数
   * @param projectId 工地id
   */
  vip(curPage, pageSize, projectId) {
    return {
      url: '/bnq_owner/userManager/memberCard.do',
      type: 'GET',
      param: {
        curPage: curPage,
        pageSize: pageSize,
        projectId: projectId
      }
    }
  },
  /**
    计划进度
   */
  getProjectSchedule(projectId) {
    return {
      url: '/bnq_owner/project/plan/queryPlan.do',
      type: 'GET',
      param: {
        projectId: projectId
      }
    }
  },
  /**
    消息列表
   */
  getMessageList(curPage, pageSize, msgCategoryId) {
    return {
      url: '/bnq_owner/msg/list.do',
      type: 'GET',
      param: {
        curPage: curPage,
        pageSize: pageSize,
        msgCategoryId: msgCategoryId
      }
    }
  },
  /***
   * 获取消息中心的数据
   * @returns {{url: string, type: string}}
   */
  getMsgCenterInfo() {
    return {
      url: '/bnq_owner/msg/msgCenterInfo.do',
      type: 'GET',
    }
  },

  /**
   * 获取动态详情
   *@param trendId 工地Id
   */
  getMsgDetail(trendId) {
    return {
      url: '/bnq_owner/project_trend/trendDetail.do',
      type: 'GET',
      param: {
        trendId: trendId
      }
    }

  },
  /**
  * 获取动态消息列表
  *
   */
  getUnreadMsgList(curPage, pageSize, projectId) {
    return {
      url: '/bnq_owner/project_trend/getMessgage.do',
      type: 'GET',
      param: {
        curPage: curPage,
        pageSize: pageSize,
        projectId: projectId,

      }
    }
  },

  /***
   * 版本升级接口
   * @param clientType 客户端类型，1为ios 2为android
   * @param curVersion 当前版本号
   */
  appUpgrade(clientType, curVersion) {
    return {
      url: '/bnq_owner/api/version/check.do',
      type: 'GET',
      param: {
        curVersion: curVersion,
        clientType: clientType
      }
    }
  },
  /***
   * 新消息数量统计
   * @param projectId 工程id
   */
  msgCount(projectId) {
    return {
      url: '/bnq_owner/project_trend/countNewMessgage.do',
      type: 'GET',
      param: {
        projectId: projectId,
      }
    }
  },

  /**提交预约
   * @param  address 地址字符串
   * @param  cityCode  城市ID
   * @param  countyCode 区ID
   * @param  provinceCode 省ID
   * @param  name  名字
   * @param  phone  手机号码
   * @param  targetId  预约对象ID
   * @param  type  预约类型，1-预约设计; 2-预约参观工地
   *
   */
  postAppointment(address, cityCode, countyCode, provinceCode, name, phone, targetId, type) {
    return {
      url: '/bnq_owner/appointment/submitAppointment.do',
      type: 'POST',
      param: {
        address: address,
        cityCode: cityCode,
        countyCode: countyCode,
        provinceCode: provinceCode,
        name: name,
        phone: phone,
        targetId: targetId,
        type: type,
      }

    }
  },
  /**
   * 预约界面数据
   * @param  targetId  预约对象ID
   * @param  type  预约类型，1-预约设计; 2-预约参观工地
   *
   */
  getAppointmentInfo(targetId, type) {
    return {
      url: '/bnq_owner/appointment/initAppointment.do',
      type: 'GET',
      param: {
        targetId: targetId,
        type: type,
      }
    }
  },
  /** 灵感图筛选条件

   */
  getFireCaseSelect(cityCode) {
    return {
      url: '/bnq_owner/content/case/getCaseFilters.do',
      type: 'GET',
      param: {
        cityCode: cityCode,
      }
    }
  },
  /** 灵感图列表
   *  @param  cityCode  城市ID
   */
  getFireCaseList(cityCode, curPage, pageSize) {
    return {
      url: '/bnq_owner/content/case/list.do',
      type: 'GET',
      param: {
        cityCode: cityCode,
        curPage: curPage,
        pageSize: pageSize,
      }
    }

  },
  /**灵感图筛选
   *@param  cityCode  城市ID
   *@param  houseLayoutCode  户型
   * @param styleCode   风格
   * @param  sortRuleCode 排序条件
   */
  getFireCaseSelectList(cityCode, houseLayoutCode, styleCode, sortRuleCode, curPage, pageSize) {
    return {
      url: '/bnq_owner/content/case/list.do',
      type: 'GET',
      param: {
        cityCode: cityCode,
        houseLayoutCode: houseLayoutCode,
        styleCode: styleCode,
        sortRuleCode: sortRuleCode,
        curPage: curPage,
        pageSize: pageSize,
      }
    }
  },
  /**灵感图详情
   *
   *@param  caseId  灵感案例id
   */
  getFireCaseDetail(caseId) {
    return {
      url: '/bnq_owner/content/case/getCaseDetail.do',
      type: 'GET',
      param: {
        caseId: caseId,
      }
    }
  },
  /**
   * 获取门店列表
   * @param cityCode 城市code
   * @param latitude 纬度
   * @param longitude 经度
   * @param curPage 当前第几页
   * @param pageSize 分页大小
   */
  getShopList(cityCode, latitude, longitude, curPage, pageSize) {
    return {
      url: '/bnq_owner/content/shop/nearby/list.do',
      type: 'GET',
      param: {
        cityCode: cityCode,
        latitude: latitude,
        longitude: longitude,
        curPage: curPage,
        pageSize: pageSize,
      }
    }
  },
  /**
   * 获取门店详情
   * @param shopId 门店id
   * @param latitude 纬度
   * @param longitude 经度
   */
  getShopDetail(shopId, latitude, longitude) {
    return {
      url: '/bnq_owner/content/shop/get-detail.do',
      type: 'GET',
      param: {
        shopId: shopId,
        latitude: latitude,
        longitude: longitude,
      }
    }
  },
  /**
   * 设计师列表页筛选条件
   * @param cityCode 城市代码
   */
  filterSortInit(cityCode) {
    return {
      url: '/bnq_owner/content/designer/filterSortInit.do',
      type: 'GET',
      param: {
        cityCode: cityCode,
      }
    }
  },
  /**
   * 施工队列表页筛选条件
   * @param shopCode 门店代码
   */
  filterSortInit2(shopCode) {
    return {
      url: '/bnq_owner/content/team-admin/filterSortInit.do',
      type: 'GET',
      param: {
        shopCode: shopCode,
      }
    }
  },
  /**
   * 设计师列表
   * @param cityCode 城市代码
   * @param shopCode 门店code
   * @param scoreRange 分数范围
   * @param rankTitle 设计师级别
   * @param sortRule 排序规则
   * @param curPage 当前第几页
   * @param pageSize 分页大小
   */
  queryDesigner(cityCode, shopCode, scoreRange, rankTitle, sortRule, curPage, pageSize) {
    return {
      url: '/bnq_owner/content/designer/queryDesigner.do',
      type: 'POST',
      param: {
        cityCode: cityCode,
        shopCode: shopCode,
        scoreRange: scoreRange,
        rankTitle: rankTitle,
        sortRule: sortRule,
        curPage: curPage,
        pageSize: pageSize,
      }
    }
  },
  /**
   * 选择设计师列表
   * @param cityCode 城市代码
   * @param shopCode 门店code
   * @param scoreRange 分数范围
   * @param rankTitle 设计师级别
   * @param sortRule 排序规则
   * @param curPage 当前第几页
   * @param pageSize 分页大小
   */
  queryDesigner2(cityCode, shopCode, scoreRange, rankTitle, sortRule, curPage, pageSize) {
    return {
      url: '/bnq_owner/content/designer/choose/list.do',
      type: 'POST',
      param: {
        cityCode: cityCode,
        shopCode: shopCode,
        scoreRange: scoreRange,
        rankTitle: rankTitle,
        sortRule: sortRule,
        curPage: curPage,
        pageSize: pageSize,
      }
    }
  },
  /**
   * 施工队列表
   * @param shopCode 门店代码
   * @param starLevel 星级
   * @param scoreRange 评分范围
   * @param sortRule 排序规则
   * @param curPage 当前第几页
   * @param pageSize 分页大小
   */
  queryCaptains(shopCode, starLevel, scoreRange, sortRule, curPage, pageSize, cityCode = "") {
    return {
      url: '/bnq_owner/content/team-admin/queryCaptains.do',
      type: 'POST',
      param: {
        shopCode: shopCode,
        starLevel: starLevel,
        scoreRange: scoreRange,
        sortRule: sortRule,
        curPage: curPage,
        pageSize: pageSize,
        cityCode: cityCode

      }
    }
  },
  /**
   * 选择施工队列表
   * @param projectId 工地id
   * @param shopCode 门店代码
   * @param starLevel 星级
   * @param scoreRange 评分范围
   * @param sortRule 排序规则
   * @param curPage 当前第几页
   * @param pageSize 分页大小
   */
  queryCaptains2(projectId, shopCode, starLevel, scoreRange, sortRule, curPage, pageSize) {
    return {
      url: '/bnq_owner/content/team-admin/election/list.do',
      type: 'POST',
      param: {
        projectId: projectId,
        shopCode: shopCode,
        starLevel: starLevel,
        scoreRange: scoreRange,
        sortRule: sortRule,
        curPage: curPage,
        pageSize: pageSize,
      }
    }
  },
  /**
   * 设计师详情页
   * @param id 设计师id
   */
  designerInfo(id) {
    return {
      url: '/bnq_owner/content/designer/designerInfo.do',
      type: 'GET',
      param: {
        id: id,
      }
    }
  },
  /**
   * 施工队详情页
   * @param id 施工队id
   */
  captainInfo(id) {
    return {
      url: '/bnq_owner/content/team-admin/captainInfo.do',
      type: 'GET',
      param: {
        id: id,
      }
    }
  },
  /**
   * 工程管理员详情
   * @param id
   * @returns {{url: string, type: string, param: {id: *}}}
   */
  projectManagerInfo(id) {
    return {
      url: '/bnq_owner/content/project-admin/projectManagerInfo.do',
      type: 'GET',
      param: {
        id: id,
      }
    }
  },
  /**
   * 客户经理详情
   * @param id
   * @returns {{url: string, type: string, param: {id: *}}}
   */
  accountManagerInfo(id) {
    return {
      url: '/bnq_owner/content/account-admin/accountManagerInfo.do',
      type: 'GET',
      param: {
        id: id,
      }
    }
  },
  /**
   * 设计师详情页 评价
   * @param pid 设计师Id
   * @param curPage 当前第几页
   * @param pageSize 分页大小
   * @param feedbackType 1全部，2水电，3隐蔽，4竣工，5有图
   */
  designerFeedBack(pid, curPage, pageSize, feedbackType = 1) {
    return {
      url: '/bnq_owner/content/common/feedBack.do',
      type: 'GET',
      param: {
        pid: pid,
        curPage: curPage,
        pageSize: pageSize,
        feedbackType: feedbackType
      }
    }
  },
  /**
   * 施工队详情页施工工地列表
   * @param pid 施工队Id
   * @param curPage 当前第几页
   * @param pageSize 分页大小
   */
  queryAllProject(pid, curPage, pageSize) {
    return {
      url: '/bnq_owner/content/team-admin/queryAllProject.do',
      type: 'GET',
      param: {
        pid: pid,
        curPage: curPage,
        pageSize: pageSize,
      }
    }
  },
  /**
   * 工程管理员详情页施工工地列表
   * @param pid
   * @param curPage
   * @param pageSize
   * @returns {{url: string, type: string, param: {pid: *, curPage: *, pageSize: *}}}
   */
  queryProjectManagerAllProject(pid, curPage, pageSize) {
    return {
      url: '/bnq_owner/content/project-admin/queryAllProject.do',
      type: 'GET',
      param: {
        pid: pid,
        curPage: curPage,
        pageSize: pageSize,
      }
    }
  },
  /**
   * 设计师详情页案例列表
   * @param id
   * @param curPage 当前第几页
   * @param pageSize 分页大小
   */
  designerCase(id, curPage, pageSize) {
    return {
      url: '/bnq_owner/content/designer/designerCase.do',
      type: 'GET',
      param: {
        id: id,
        curPage: curPage,
        pageSize: pageSize,
      }
    }
  },
  /**
   * 提交关注
   * @param targetId 目标id
   * @param type 1-灵感图 2-设计师 3-施工队 4-门店 5-工程管理员 6-客户管理 7-关注灵感图
   */
  submitAttention(targetId, type) {
    return {
      url: '/bnq_owner/attention/submitAttention.do',
      type: 'POST',
      param: {
        targetId: targetId,
        type: type,
      }
    }
  },
  /**
   * 取消关注
   * @param targetId 目标id
   * @param type 1-灵感图 2-设计师 3-施工队 4-门店 5-工程管理员 6-客户管理 7-关注灵感图
   */
  removeAttention(targetId, type) {
    return {
      url: '/bnq_owner/attention/removeAttention.do',
      type: 'POST',
      param: {
        targetId: targetId,
        type: type,
      }
    }
  },
  /***
   * 获取百安居的服务城市
   * @param latitude 纬度
   * @param longitude 经度
   */
  getLocAndCities(latitude, longitude) {
    return {
      url: '/bnq_owner/api/area/get-loc-and-cities.do',
      type: 'GET',
      param: {
        longitude: longitude,
        latitude: latitude
      }
    }
  },
  /***
   * 获取百安居的服务城市
   * @param latitude 纬度
   * @param longitude 经度
   */
  getNearbyProjects(latitude, longitude, distanceMetre, dateScopeId, distanceScopeId, stateScopeId) {
    return {
      url: '/bnq_owner/project/locate/get-nearby-projects.do',
      type: 'GET',
      param: {
        longitude: longitude,
        latitude: latitude,
        distanceMetre: distanceMetre,
        dateScopeId,
        distanceScopeId,
        stateScopeId
      }
    }

  },
  /**
   * 获取附近工地筛选条件
   * @returns {{url: string, type: string, param: {}}}
   */
  getNearbyProjectsCondition() {
    return {
      url: '/bnq_owner/project/locate/get-nearby-projects-condition.do',
      type: 'GET',
      param: {
      }
    }

  },
  /***
   * 我关注的灵感图列表
   * @param lastId 最后一个Id
   * @param pageSize 每次取出来的条数
   */
  getAttentionNewFireCase(lastId, pageSize) {
    return {
      url: '/bnq_owner/attention/getInspirationList.do',
      type: 'GET',
      param: {
        curPage: 1, //该参数无实际意义，不传的话服务断报错
        lastId,
        pageSize
      }
    }
  },
  /***
   * 我关注的案例列表
   * @param lastId 最后一个Id
   * @param pageSize 每次取出来的条数
   */
  getAttentionCase(lastId, pageSize) {
    return {
      url: '/bnq_owner/attention/getCasePicList.do',
      type: 'GET',
      param: {
        curPage: 1, //该参数无实际意义，不传的话服务断报错
        lastId,
        pageSize
      }
    }
  },
  /***
   *我关注的设计师列表
   * @param lastId 最后一个Id
   * @param pageSize 每次取出来的条数
   */
  getAttentionDesigner(lastId, pageSize) {
    return {
      url: '/bnq_owner/attention/getDesignerList.do',
      type: 'GET',
      param: {
        curPage: 1, //该参数无实际意义，不传的话服务断报错
        lastId,
        pageSize
      }
    }
  },
  /***
   * 我关注的门店列表
   * @param lastId 最后一个Id
   * @param pageSize 每次取出来的条数
   * @param latitude 门店的纬度
   * @param longitude 门店的经度
   */
  getAttentionStores(lastId, pageSize, latitude, longitude) {
    return {
      url: '/bnq_owner/attention/getStoreList.do',
      type: 'GET',
      param: {
        curPage: 1, //该参数无实际意义，不传的话服务断报错
        lastId,
        pageSize,
        latitude,
        longitude
      }
    }
  },
  /***
   * 我关注的施工队列表
   * @param lastId 最后一个Id
   * @param pageSize 每次取出来的条数
   */
  getAttentionTeam(lastId, pageSize) {
    return {
      url: '/bnq_owner/attention/getTeamList.do',
      type: 'GET',
      param: {
        curPage: 1, //该参数无实际意义，不传的话服务断报错
        lastId,
        pageSize
      }
    }
  },
  /***
   * 工地直播
   * @param projectId 工地的id
   */
  getProjectLive(projectId) {
    return {
      url: '/bnq_owner/project/projectLive.do',
      type: 'GET',
      param: {
        projectId
      }
    }
  },
  getHomeAd(cityCode) {
    return {
      url: '/bnq_owner/home/data/get.do',
      type: 'GET',
      param: {
        cityCode
      }
    }
  },
  /**
   * 获取我的预约列表
   *
   */
  getAppointmentList(curPage, pageSize) {
    return {
      url: '/bnq_owner/appointment/getAppointmentList.do',
      type: 'GET',
      param: {
        curPage: curPage,
        pageSize: pageSize,
      }
    }
  },
  /**
   * 套餐详情
   * @param prodId 套餐id
   * @returns {{url: string, type: string, param: {prodId: *}}}
   */
  getProductDetail(prodId) {
    return {
      url: '/bnq_owner/content/product/getProductDetail.do',
      type: 'GET',
      param: {
        prodId: prodId,
      }
    }
  },
  /***
   * 第三方授权登录
   * @param accessToken 令牌
   * @param authSource 授权来源，1-微信，2-qq
   * @param clientType 客户端类型，1-ios，2-安卓
   */
  authThirdLogin(accessToken, openId, authSource, clientType, pf) {
    return {
      url: '/bnq_owner/api/third/auth/login.do',
      type: 'GET',
      param: {
        accessToken: accessToken,
        openId: openId,
        authSource: authSource,
        clientType: clientType,
        pf: pf
      }
    }
  },
  /***
   * 第三方授权注册
   * @param accessToken  获取第三方用户信息令牌
   * @param authSource   授权方，1-微信，2-qq
   * @param clientType   客户端类型，1-ios，2-安卓
   * @param openId       用户的标识
   * @param phone        手机号
   * @param verifyCode   验证码
   * @returns {{url: string, type: string, param: {accessToken: *, authSource: *, clientType: *, openId: *, phone: *, verifyCode: *}}}
   */
  authThirdRegister(accessToken, pf, authSource, clientType, openId, phone, verifyCode) {
    return {
      url: '/bnq_owner/api/third/auth/register.do',
      type: 'GET',
      param: {
        accessToken: accessToken,
        pf: pf,
        authSource: authSource,
        clientType: clientType,
        openId: openId,
        phone: phone,
        verifyCode: verifyCode,
      }
    }
  },
  /****
   * 绑定第三方账户
   * @param accessToken
   * @param authSource
   * @param openId
   */
  bindThirdLogin(accessToken, authSource, openId, pf) {
    return {
      url: '/bnq_owner/api/third/auth/bind.do',
      type: 'GET',
      param: {
        accessToken: accessToken,
        authSource: authSource,
        openId: openId,
        pf: pf
      }
    }
  },
  /****
   * 解除绑定第三方账户
   * @param accessToken
   * @param authSource
   * @param openId
   */
  unBindThirdLogin(authSource) {
    return {
      url: '/bnq_owner/api/third/auth/unbind.do',
      type: 'GET',
      param: {
        authSource: authSource,
      }
    }
  },
  /***
   * 判读首页向哪个页面跳转
   * @returns {{url: string, type: string, param: {}}}
   */
  jumpToWhere() {
    return {
      url: '/bnq_owner/home/jumpToWhere.do',
      type: 'GET',
      param: {
      }
    }
  },
  /**
    * 付款信息
    * @param intentOrderNo  意向单号
   */
  getPayInformation(intentOrderNo) {
    return {
      url: '/bnq_owner/order/orderPayInfo.do',
      type: 'GET',
      param: {
        intentOrderNo: intentOrderNo
      }
    }
  },
  /**
   *基本信息
   * @param intentOrderNo  意向单号
   */
  getBasicInformation(intentOrderNo) {
    return {
      url: '/bnq_owner/order/orderBaseInfo.do',
      type: 'GET',
      param: {
        intentOrderNo: intentOrderNo
      }
    }
  },
  /**
   * 工地详情(新家)页进入提交选择施工队 / 订单页选择设计师
   * @param eleType   选择类型，1-设计师，2-施工队
   * @param bindNo    绑定编号，eleType==1时表示订单号orderNo, eleType==2时表示projectId
   * @param targetNo  目标编号，eleType==1时表示设计师表designerId， eleType==2时表示teamAdminId
   */
  orderTeam(eleType, bindNo, targetNo) {
    return {
      url: '/bnq_owner/content/election/submit.do',
      type: 'GET',
      param: {
        eleType: eleType,
        bindNo: bindNo,
        targetNo: targetNo
      }
    }
  },
  /**
   * 最新订单
   * @returns {{url: string, type: string, param: {}}}
   */
  orderFirst() {
    return {
      url: '/bnq_owner/order/orderFirst.do',
      type: 'GET',
      param: {
      }
    }
  },
  /**
   * 订单详情
   * @param intentOrderNo 意向单号
   * @returns {{url: string, type: string, param: {intentOrderNo: *}}}
   */
  orderDetail(intentOrderNo) {
    return {
      url: '/bnq_owner/order/orderDetail.do',
      type: 'GET',
      param: {
        intentOrderNo: intentOrderNo
      }
    }
  },
  /**
   *合同信息
   * @param intentOrderNo  意向单号
   */
  getOrderInformation(intentOrderNo) {
    return {
      url: '/bnq_owner/order/orderContractInfo.do',
      type: 'GET',
      param: {
        intentOrderNo: intentOrderNo
      }
    }
  },
  /**
   * 执行动态
   * @param intentOrderNo 意向单号
   * @returns {{url: string, type: string, param: {intentOrderNo: *}}}
   */
  orderDynamic(intentOrderNo) {
    return {
      url: '/bnq_owner/order/orderDynamic.do',
      type: 'GET',
      param: {
        intentOrderNo: intentOrderNo
      }
    }
  },
  /***
   * 获取订单列表
   * @param orderStatus 订单状态:1：待签约，2：施工中，3：已完成
   * @param curPage
   * @param pageSize
   */
  orderList(orderStatus, curPage, pageSize) {
    if (orderStatus === 0) {
      return {
        url: '/bnq_owner/order/orderList.do',
        type: 'POST',
        param: {
          curPage,
          pageSize
        }
      }
    } else {
      return {
        url: '/bnq_owner/order/orderList.do',
        type: 'POST',
        param: {
          orderStatus,
          curPage,
          pageSize
        }
      }
    }
  },
  /***
   * 付款信息查询
   * @param intentOrderNo 意向单号
   */
  orderPayInfo(intentOrderNo) {
    return {
      url: '/bnq_owner/order/orderPayInfo.do',
      type: 'GET',
      param: {
        intentOrderNo
      }
    }
  },
  /***
   * 创建流水
   * @param amountStr 支付金额
   * @param intentOrderNo 意向单号
   * @param contractSn 合同号
   */
  createPayFlow(amountStr, intentOrderNo, constractNo) {
    return {
      url: '/bnq_owner/order/pay/createPayFlow.do',
      type: 'GET',
      param: {
        amountStr,
        intentOrderNo,
        constractNo
      }
    }
  },
  /**
   * 售后详情
   * @param id 申请单id
   */
  getAfterSaleDetail(id) {
    return {
      url: '/bnq_owner/customer_service/detail.do',
      type: 'GET',
      param: {
        id: id
      }
    }
  },
  /**
   *提交申请
   * @param description 描述
   * @param intentOrderNo  意向单号
   * @param orderSource  订单来源
   * @param orderTitle  订单标题
   * @param picList     图片List
   * @param title       标题
   */
  postAfterSale(description, intentOrderNo, orderSource, orderTitle, picList, title) {
    return {
      url: '/bnq_owner/customer_service/submitRecord.do',
      type: 'POST',
      param: {
        description: description,
        intentOrderNo: intentOrderNo,
        orderSource: orderSource,
        orderTitle: orderTitle,
        picList: picList,
        title: title,
      }
    }
  },
  /**
   *提交申请数据
   *@param intentOrderNo 意向单号
   */
  getInitAfterSale(intentOrderNo) {
    return {
      url: '/bnq_owner/customer_service/initApply.do',
      type: 'GET',
      param: {
        intentOrderNo: intentOrderNo
      }
    }
  },
  /**
   *查询售后记录列表
   * @param curPage 当前第几页
   * @param pageSize 分页大小
   */
  getAfterSaleList(curPage, pageSize) {
    return {
      url: '/bnq_owner/customer_service/applyRecordList.do',
      type: 'GET',
      param: {
        curPage: curPage,
        pageSize: pageSize
      }
    }
  },
  /**
   *取消申请
   * @param id  售后申请单id
   */
  getCancelAfterSale(id) {
    return {
      url: '/bnq_owner/customer_service/cancel.do',
      type: 'GET',
      param: {
        id: id
      }
    }
  }
  ,
  /**
   * 1.判断启动进入首页or新家,若新家判断进入订单or装修直播；2.判断开工大吉显示与否
   * @param timeout 设置网络请求超时时间
   * @returns {{url: string, type: string, param: {}}}
   */
  openAppTodo(timeout, version) {
    return {
      url: '/bnq_owner/home/openAppTodo.do',
      type: 'GET',
      param: {
        timeout,
        version
      }
    }
  },
  /**
   * 播放完开工大吉后，批量刷新后台播放动画的字段为已播放
   * @param showFlashProjects 更新列表
   * @returns {{url: string, type: string, param: {showFlashProjects: *}}}
   */
  updateShowFlash(showFlashProjects) {
    return {
      url: '/bnq_owner/project/updateShowFlash.do',
      type: 'POST',
      param: {
        showFlashProjects,
      }
    }
  },
  /**
   * 变更计划
   * @param projectId
   * @returns {{url: string, type: string, param: {projectId: *}}}
   */
  getPlanHistory(projectId) {
    return {
      url: '/bnq_owner/project/plan/getPlanHistory.do',
      type: 'GET',
      param: {
        projectId,
      }
    }
  },
  /**
   * 项目资料-合同\设计图纸
   * @param orderNo
   * @param type 1：项目资料-合同 2：项目资料-设计图纸
   * @returns {{url: string, type: string, param: {orderNo: *, type: *}}}
   */
  queryAnnex(orderNo, type) {
    return {
      url: '/bnq_owner/order/queryAnnex.do',
      type: 'GET',
      param: {
        orderNo,
        type,
      }
    }
  },
  /**
   * 根据扫码后的编码查询商品信息
   * @param barcode
   * @returns {{url: string, type: string, param: {barcode: *}}}
   */
  getProductByBarcode(barcode) {
    return {
      url: '/qrCode/getProductByBarcode',
      type: 'GET',
      param: {
        barcode,
      }
    }
  },

  /**
   * 获取全景图列表
   * @param {*} orderNo 
   */
  getPanoramaListByOrder(orderNo) {
    return {
      url: '/bnq_owner/order/queryVRList.do',
      type: 'GET',
      param: {
        orderNo,
      }
    }
  },

  /**
   * 首页活动banner微信分享
   * @param activityId 活动id
   */
  shareActivity(activityId) {
    return {
      url: '/bnq_owner/home/activity.share',
      type: 'GET',
      param: {
        activityId,
      }
    }
  },

  /**
   * 评价页面获取不推荐理由
   * 
   */
  getReasonTag() {
    return {
      url: '/bnq_owner/project_trend/getReasonTag.do',
      type: 'GET',
    }
  },
  /**
   * 查询所有评价页面
   * trendId 动态id
   */
  queryFeedbackStage(trendId) {
    return {
      url: '/bnq_owner/project_trend/queryFeedbackStage.do',
      type: 'GET',
      param: {
        trendId,
      }
    }
  },

  updateFeedBackAlert(showFeedbackProjects) {
    return {
      url: '/bnq_owner/project/updateFeedbackProject.do',
      type: 'POST',
      param: {
        showFeedbackProjects
      }
    }
  },

  /**
   * 获取装修商品列表
   * @param type
   * @returns {{url: string, type: string, param: {type: *}}}
   */
  getDecorationList(curPage, pageSize, type, cityCode) {
    return {
      url: '/bnq_owner/content/product/getProductList.do',
      type: 'GET',
      param: {
        type,
        curPage,
        pageSize,
        cityCode
      }
    }
  },

  /**
   * 获取新建订单列表
   * @param lastId 最后工地id
   * @param orderStatus 订单状态:1：待签约，2：施工中，3：已完成
   * @param curPage 当前第几页
   * @param pageSize 分页大小
   * @returns {{url: string, type: string, param: {lastId: *, orderStatus: *, curPage: *, pageSize: *}}}
   */
  getOrderAndProjectList(lastId, orderStatus, curPage, pageSize) {
    return {
      url: '/bnq_owner/order/orderAndProjectList.do',
      type: 'POST',
      param: {
        lastId,
        orderStatus,
        curPage,
        pageSize
      }
    }
  },

  /**
   * 获取报价列表
   * @param curPage 当前第几页
   * @param pageSize 分页大小
   * @returns {{url: string, type: string, param: {curPage: *, pageSize: *}}}
   */
  getQuoRecordList(curPage, pageSize) {
    return {
      url: '/bnq_owner/quotation/quoRecordList.do',
      type: 'GET',
      param: {
        curPage,
        pageSize
      }
    }
  },

  /**
   * 获取优惠券列表
   * @param curPage 当前第几页
   * @param pageSize 分页大小
   */
  getCouponsListByPageIndex(curPage, pageSize) {
    return {
      url: '/bnq_owner/mine/getCouponList.do',
      type: 'GET',
      param: {
        curPage,
        pageSize
      }
    }
  },

  /**
   * 获取优惠券详情信息
   * @param couponId 优惠券id
   */
  getCouponInfoById(couponId) {
    return {
      url: '/bnq_owner/mine/getCouponDetail.do',
      type: 'GET',
      param: {
        couponId
      }
    }
  },

  /**
   * 获取会员卡以及装修卡列表
   * @param curPage 当前第几页
   * @param pageSize 分页大小
   * @returns {{url: string, type: string, param: {projectId: *, curPage: *, pageSize: *}}}
   */
  getCardList(curPage, pageSize) {
    return {
      url: '/bnq_owner/mine/myCardList.do',
      type: 'GET',
      param: {
        curPage,
        pageSize
      }
    }
  },

  /**
   * 获取问答列表内容
   * @param curPage 当前第几页
   * @param pageSize 分页大小
   * @returns {{url: string, type: string, param: {curPage: *, pageSize: *}}}
   */
  getQuestionList(curPage, pageSize) {
    return {
      url: '/bnq_owner/apis/common/queryHelpQA.share',
      type: 'GET',
      param: {
        curPage,
        pageSize
      }
    }
  },
  /**
   * 获取活动专题列表内容
   * @param curPage 当前第几页
   * @param pageSize 分页大小
   * @returns {{url: string, type: string, param: {curPage: *, pageSize: *}}}
   */
  getActivityList(curPage, pageSize, cityCode) {
    return {
      url: '/bnq_owner/content/cms/activityList.do',
      type: 'GET',
      param: {
        curPage,
        pageSize,
        cityCode
      }
    }
  },
  /**
   * 获取视频列表内容
   * @param curPage 当前第几页
   * @param pageSize 分页大小
   * @returns {{url: string, type: string, param: {curPage: *, pageSize: *}}}
   */
  getVideoList(curPage, pageSize) {
    return {
      url: '/bnq_owner/content/cms/videoList.do',
      type: 'GET',
      param: {
        curPage,
        pageSize,
      }
    }
  },
  /***
   * 获取风格测试第一步
   * @returns {{url: string, type: string}}
   */
  getStyleSite() {
    return {
      url: '/cms-service/styleTest//listStep1.do',
      type: 'GET',
    }
  },
  /***
   * 获取风格测试第二步
   * @returns {{url: string, type: string}}
   */
  getStyleScene() {
    return {
      url: '/cms-service/styleTest//listStep2.do',
      type: 'GET',
    }
  },
  /***
   * 获取风格测试第三步
   * @returns {{url: string, type: string}}
   */
  getStyleDecoRoom() {
    return {
      url: '/cms-service/styleTest//listStep3.do',
      type: 'GET',
    }
  },
  /***
   * 获取风格测试选择季节步骤
   * @returns {{url: string, type: string}}
   */
  getStyleSeason() {
    return {
      url: '/cms-service/styleTest/listGetSeason.do',
      type: 'GET',
    }
  },
  /***
   * 获取风格测试选择饰品装饰自己房间的墙
   * @returns {{url: string, type: string}}
   */
  getStyleDecoYourRoom() {
    return {
      url: '/cms-service/styleTest/listGetAdornment.do',
      type: 'GET',
    }
  },
  /***
   * 获取风格测试第四步
   * @returns {{url: string, type: string}}
   */
  getStyleDecoWall() {
    return {
      url: '/cms-service/styleTest//listStep4.do',
      type: 'GET',
    }
  },
  /***
   * 获取风格测试第五步
   * @returns {{url: string, type: string}}
   */
  getStyleEnv() {
    return {
      url: '/cms-service/styleTest//listStep5.do',
      type: 'GET',
    }
  },
  /**
   * 提交风格测试
   */
  submitStyleTest(address, cityCode, countyCode, deviceCode, name, phone, provinceCode, specificId, styleCountList, targetId, terminalTypeId, type, currentCityCode) {
    return {
      url: '/bnq_owner/appointment/styleTestAppointment.do',
      type: 'POST',
      param: {
        address: address,
        cityCode: cityCode,
        countyCode: countyCode,
        deviceCode: deviceCode,
        name: name,
        phone: phone,
        provinceCode: provinceCode,
        specificId: specificId,
        styleCountList: styleCountList,
        targetId: targetId,
        terminalTypeId: terminalTypeId,
        type: type,
        currentCityCode: currentCityCode,
      }
    }
  },
  /**
   *
   * @param cityCode
   * @param latitude
   * @param longitude
   * @param prototypeRoomId
   * @returns {{url: string, type: string, param: {cityCode: *, latitude: *, longitude: *, prototypeRoomId: *}}}
   */
  getNearbyShops(cityCode, latitude, longitude, prototypeRoomId) {
    return {
      url: '/cms-service/prototypeRoom/get-nearby-shops.do',
      type: 'GET',
      param: {
        cityCode: cityCode,
        latitude: latitude,
        longitude: longitude,
        prototypeRoomId: prototypeRoomId,
      },
    }

  },
  /**
   * 品牌故事
   * @param cityCode
   * @param shopCode
   * @param terminalType
   * @returns {{url: string, type: string, param: {cityCode: *, shopCode: *, terminalType: number}}}
   */
  getBrandStory(cityCode, shopCode, terminalType = 8) {
    return {
      url: '/cms-service/brandStory/detail.do',
      type: 'GET',
      param: {
        cityCode,
        shopCode,
        terminalType
      }
    }
  },
  /**
   * 关联工地列表
   * @param curPage
   * @param pageSize
   * @returns {{url: string, type: string, param: {cityCode: *, shopCode: *, terminalType: *}}}
   */
  getAssociatedSiteList(curPage, pageSize) {
    return {
      url: '/bnq_owner/project/getAssociatedSiteList.do',
      type: 'GET',
      param: {
        curPage,
        pageSize,
      }
    }
  },
  /**
   * 退出关联工地
   * @param projectId
   * @returns {{url: string, type: string, param: {projectId: *}}}
   */
  exitProject(projectId) {
    return {
      url: '/bnq_owner/project/exitProject.do',
      type: 'GET',
      param: {
        projectId,
      }
    }
  },
  /**
   * 获取工艺展示的url
   * @returns {{url: string, type: string}}
   */
  getDisplay() {
    return {
      url: '/bnq_owner/content/tech/display.do',
      type: 'GET',
    }
  },
  /**
   * 获取成员列表
   * @returns {{url: string, type: string}}
   */
  getMemberList(projectId) {
    return {
      url: '/bnq_owner/project/getInviteList.do',
      type: 'GET',
      param: {
        projectId: projectId
      }
    }
  },
  /***
   * 添加成员
   * @param projectId
   * @param name
   * @param phone
   * @returns {{url: string, type: string, param: {projectId: *, name: *, phone: *}}}
   */
  addMember(projectId, name, phone) {
    return {
      url: '/bnq_owner/project/addInvitees.do',
      type: 'POST',
      param: {
        projectId: projectId,
        name: name,
        phone: phone,
      }
    }
  },
  /***
   * 删除成员
   * @param phone
   * @param projectId
   * @returns {{url: string, type: string, param: {phone: *, projectId: *}}}
   */
  deleteMember(phone, projectId) {
    return {
      url: '/bnq_owner/project/delInvites.do',
      type: 'GET',
      param: {
        phone: phone,
        projectId: projectId
      }
    }
  },
  /***
   * 灵感图列表
   * @param styleType
   * @param spaceCode
   * @param curPage
   * @param pageSize
   * @returns {{url: string, type: string}}
   */
  getInspirationList(styleType, spaceCode, curPage, pageSize) {
    return {
      url: '/bnq_owner/cms/inspiration/list.do',
      type: 'GET',
      param: {
        styleType: styleType,
        spaceCode: spaceCode,
        curPage: curPage,
        pageSize: pageSize
      },
    }
  },
  /***
   * 初始化灵感图筛选条件
   */
  getInspirationInitCondition() {
    return {
      url: '/bnq_owner/cms/inspiration/initCondition.do',
      type: 'GET',
    }
  },
  /***
   * 获取灵感图的详情
   * @param id
   * @returns {{url: string, type: string, param: {id: *}}}
   */
  getInspirationDetails(id) {
    return {
      url: '/bnq_owner/cms/inspiration/details.do',
      type: 'GET',
      param: {
        id: id
      },
    }
  },
  /***
  * 新增分享纪录
  * @param jsCode 	微信openId
  * @param promotionChannel 推广渠道 1-微信商城
  * @param shareContent 分享内容,若是商品分享为sku
  * @param sharePageName 分享页面名
  * @param sharePageUrl 分享页面url
  * @param shareType 分享类型 1-分享商品; 2-分享活动
  * @param shareWay 	分享方式 1-发送给朋友; 2-生成海报
  * 
  */
  addShareRecord(jsCode,promotionChannel,shareContent,sharePageName, sharePageUrl,shareType,shareWay) {
    return {
      url: '/marketing-service/record/share/addRecord.do',
      type: 'POST',
      param: {
        jsCode: jsCode,
        promotionChannel: promotionChannel,
        shareContent: shareContent,
        sharePageName: sharePageName,
        sharePageUrl: sharePageUrl,
        shareType: shareType,
        shareWay: shareWay,
      },
    }
  },
  /***
  * 生成分享图片
  * @param discountInfo 	优惠信息
  * @param mainPictureUrl 主图url
  * @param price 	价格
  * @param subPictureUrl 	副图url
  */
  createSharePic(discountInfo, mainPictureUrl, price, subPictureUrl) {
    return {
      url: '/marketing-service/share/createSharePic.do?discountInfo=' + encodeURIComponent(discountInfo) + '&mainPictureUrl=' + encodeURIComponent(mainPictureUrl) + '&price=' + encodeURIComponent(price) + '&subPictureUrl=' + encodeURIComponent(subPictureUrl),
      type: 'GET',
      param: {
      },
    }
  },
  /***
  * 生成分享小程序码
  * @param width 	宽度
  * @param scene 参数
  */
  createShareCode(width,scene) {
    return {
      url: '/marketing-service/share/createWxQrCode.do?wxQrCodeWidth=' + encodeURIComponent(width) + '&scene=' + encodeURIComponent(scene),
      type: 'GET',
      param: {
      },
    }
  },
  /***
  * 生成分享海报(带二维码)
  * @param discountInfo 	优惠信息
  * @param mainPictureUrl 主图url
  * @param page 	小程序二维码,跳转地址
  * @param price 	价格
  * @param scene 	小程序二维码,包含信息
  * @param title  标题
  */
  createPoster(discountInfo, mainPictureUrl, page, price, scene, title) {
    return {
      url: '/marketing-service/share/createPoster.do?discountInfo=' + encodeURIComponent(discountInfo) + '&mainPictureUrl=' + encodeURIComponent(mainPictureUrl) + '&page=' + encodeURIComponent(page) + '&price=' + encodeURIComponent(price) + '&scene=' + encodeURIComponent(scene) + '&title=' + encodeURIComponent(title),
      type: 'GET',
      param: {
      },
    }
  },
  /**
   * jsCode换微信用户session 
   */
  jsCode2session(jsCode) {
    return {
      url: '/marketing-service/share/jsCode2session.do',
      type: 'get',
      param: {
        jsCode: jsCode
      },
    }
  },
  /**
   * 获取是否显示某些按钮 (主要为了审核的时候控制是否显示分享按钮)
   * bizType  1:商城小程序
   * type     1:分享按钮
   */
  queryButtonShowFlag(bizType, type) {
    return {
      url: '/marketing-service/common/queryButtonShowFlag.do',
      type: 'get',
      param: {
        bizType: bizType,
        type: type
      },
    }
  },
  /**
   * 百安居20周年庆活动，送会员卡和优惠券
   * mobile 电话号码
   */
  receiveCoupon(mobile, markUserSign){
    return {
      url: '/wx-web/public/biz/activity401/receive',
      type: 'get',
      param: {
        mobile: mobile,
        markUserSign: markUserSign
      },
    }
  },
  /**
   * 采集从外部进入小程序渠道的pv uv
   * channelType 渠道
   * pageTitle 页面名
   * param 参数
   * path 路径
   * visitorName 访问者的名字
   */
  addAccessLog(channelType,pageTitle,param,path,visitorName) {
    return {
      url: '/bnq_owner/appLog/addAccessLog.do',
      type: 'POST',
      param: {
        channelType, pageTitle, param, path, visitorName
      },
    }
  },
  /**
   * 采集销售日志记录 channelType, count, orderNo, orderType, sku
   * channelType 渠道
   * count 数量
   * orderNo 订单号
   * orderType 订单类型
   * sku sku
   */
  addSaleLog(items) {
    return {
      url: "/bnq_owner/appLog/addSaleLog.do",
      type: 'POST',
      param: items,
    }
  },
  /**
   * 获取日志状态 
   * activityCode 日志code
   */
  getActivityStatus(activityCode) {
    return {
      url: "/bnq_owner/content/product/getActivityStatus.do",
      type: 'GET',
      param: { activityCode: activityCode},
    }
  },
  /**
   *分配聊天人员
   */
  getPromoter(itemSkuId) {
    return {
      url: "/bnq_owner/homeMeal/getPromoter.do",
      type: 'GET',
      param: { itemSkuId },
    }
  },
  /**
   *获取聊天人员的头像和昵称
   * roleUserId 需要获取头像的id 例如：["1_1", "0_352444"]
   */
  getChatUser(roleUserId) {
    return {
      url: '/bnq_owner/user/query.do',
      type: 'POST',
      param: { "client_ids": roleUserId},
    }
  },

};
module.exports = Url;