//app.js
App({
  onLaunch: function () {
    /*wx.redirectTo({
      url: "/pages/user/user?name=hello"
    });*/

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: function (res) {
        //console.log("登录code：" + res.code);
        if (res.code) {
          //发起网络请求,通过code换取openId，通过openId查询教师信息
          wx.request({
            url: 'https://app.yunyitx.com:8888/api/wx/session/' + res.code,
            //url: 'https://192.168.0.189:8888/api/wx/session/' + res.code,
            data: {
              //code: res.code
            },
            method: "POST",
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              console.log(res.data);
              //console.log("app.js----->"+res.data.data.content.openId);

              //没有绑定教师信息
              if (res.data.data.teacherStatus==0){
                wx.reLaunch({
                   url: "/pages/user/user?openId=" + res.data.data.openId
                 });
               } else if (res.data.data.teacherStatus == 1){//已经绑定教师信息
                wx.reLaunch({
                   url: "/pages/main/index?openId=" + res.data.data.content.openId
                 });
                  
               }
               
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });


    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    serverUrl:"https://app.yunyitx.com:8888/api/ynavc",
    serverImg: "https://app.yunyitx.com:8888/"
    //serverUrl: "https://192.168.0.189:8888/api/ynavc",
    //serverImg: "https://192.168.0.189:8888/"
  }
})