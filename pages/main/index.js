//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openId:"",
    monthFaceCount:0,
    successFaceCount:0,
    failFaceCount:0,
    phone:"",
    readyExam:0,
    alreadyExam:0,
    teacherId:0,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../three/three'
    })
  },
  onLoad: function (options) {
    var oId = options.openId;

      this.setData({
        openId: options.openId
      })
    console.log("main-----index----->"+options.openId);
    
    var that = this;
    wx.request({
      url: 'https://192.168.0.189:8888/api/ynavc/examCount/' +oId,
      method:"GET",
      success(res){
        /*
        console.log(res.data);
        console.log(res.data.data.content[0][0]);
        console.log(res.data.data.content[0][1]);
        console.log(res.data.data.content[1][0]);
        console.log(res.data.data.content[1][1]);*/
        that.setData({
          //待监考场次  考试状态为1
          readyExam: res.data.data.content[1][1],
          //已监考场次，考试状态为0
          alreadyExam:res.data.data.content[0][1],
          //教师手机号
          phone: res.data.data.teacher.phone,
          //教师id
          teacherId:res.data.data.teacher.id
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  setTeacherInfo:function(){
    wx.navigateTo({
      url: '../three/three?teacherId=' + this.data.teacherId,
    })
  }


})
