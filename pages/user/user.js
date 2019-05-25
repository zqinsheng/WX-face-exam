//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openId: ""
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onReady: function(options) {

  },
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '我的'
    }) 

    this.setData({
      openId: options.openId

    })
   

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
    //console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /*
  jumpPage: function (options) {
    wx.redirectTo({
      url: '../index/index',
    }),
      wx.showToast({
        title: '绑定成功',
        icon: 'success',
        duration: 2000
      })
  },*/
  formSubmit: function(e) {
    var oId = this.data.openId;
   // console.log("=============openId======="+oId);
   // console.log('form发生了submit事件，携带数据为：', e.detail.value.teacherNumber);
    var teacherName = e.detail.value.teacherName;
    var teacherPhone = e.detail.value.teacherPhone;
    var teacherNumber = e.detail.value.teacherNumber;

    if (teacherName == "" || teacherPhone == "" || teacherNumber == "") {
      wx.showModal({
        title: '提 示',
        content: '请输入完整信息！',
        showCancel: false,
        success: function(res) {

        }
      })
    } else {
      //检查输入的信息是否正确
      wx.request({
        url: app.globalData.serverUrl+'/login/' + e.detail.value.teacherNumber,
        method: "POST",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          if (res.data.data == null) {
            wx.showModal({
              title: '提 示',
              content: '绑定失败，请核对信息！',
              showCancel: false,
              success(res) {
                if (res.confirm) {

                } else if (res.cancel) {

                }
              },
            })
          } else {
            //console.log(res.data)
            if (res.data.data.content.teacherName == teacherName &&
              res.data.data.content.phone == teacherPhone &&
              res.data.data.content.jobNumber == teacherNumber) {

              //绑定用户openId
              wx.request({
                url: app.globalData.serverUrl+'/addTeacher/' + res.data.data.content.jobNumber + "/" + oId,
                method: "POST",
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success(res) {
                  //console.log(res.data);
                  if (res.data == "1") {
                    wx.showToast({
                      title: '绑定成功',
                      icon: 'success',
                      duration: 2000
                    })

                    wx.redirectTo({
                      url: "../main/index?openId=" + oId
                    });

                  } else {
                    wx.showModal({
                      title: '提 示',
                      content: '绑定失败，请核对信息！',
                      showCancel: false,
                      success(res) {
                        if (res.confirm) {

                        } else if (res.cancel) {

                        }
                      },
                    })
                  }
                }
              })



            }else{
              wx.showModal({
                title: '提示',
                content: '绑定失败，请核对信息！',
                showCancel: false,
                success(res) {
                  if (res.confirm) {

                  } else if (res.cancel) {

                  }
                },
              })
            }
          }

        },
        fail() {

        }
      })

    }



  }
})