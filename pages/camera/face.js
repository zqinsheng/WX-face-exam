// pages/face/face.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalHidden: true,
    ihidden: true,
    modalHidden2: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var exId = options.examId;
    //console.log(exId);
    this.setData({
      examId: options.examId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function (options) {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
* 显示弹窗
*/
  showtip: function () {

    var that = this;
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'normal',
      success: (res) => {
        const tempFilePath = res.tempImagePath;
        that.setData({
          src: res.tempImagePath,
          ihidden: false,
          chidden: true
        })
        wx.showLoading({ //展示加载接口
          title: '验证中...',
        });
        //上传图片
        wx.uploadFile({
          url: app.globalData.serverUrl + '/verifyFace',
          filePath: tempFilePath,
          name: 'file',
          header: {
            "content-type": "multipart/form-data"
          },
          success(res) {
            wx.hideLoading();
            var data = JSON.parse(res.data);
            console.log(data);
            if (res.statusCode == 200) {
              //人脸验证失败，没有人脸信息
              if (data.data.content.data == null) {
                that.setData({
                  modalHidden2: false,
                })
              } else {
                //人脸验证成功，查找是否有对应的学生
                var stuNumber = data.data.content.data.usercode;
                var eId = that.data.examId;
                var imageName = data.data.imgName;
                var imageType = data.data.imgType
                console.log(stuNumber);
                console.log(eId);
                wx.request({
                  url: app.globalData.serverUrl + '/verifyStudent/'
                    + eId + '/' + stuNumber + '/' + imageName + "/" + imageType,
                  header: { "Content-Type": "application/x-www-form-urlencoded" },
                  method: "POST",
                  success(res) {
                    console.log("xuesheng---------------------dsfsddfs");
                    console.log(res.data);
                    //通过学号找到
                    if (res.data.data.content != null) {
                      that.setData({
                        stuName: res.data.data.content.personName,
                        stuClasses: res.data.data.content.classesName,
                        modalHidden: false,
                        chidden: true,
                        ihidden: false,
                      })
                    } else {
                      that.setData({
                        modalHidden2: false,
                      })
                    }
                  }
                })


              }
            }
          }
        })
        /*
        this.setData({
          src: res.tempImagePath,
          modalHidden: false,
          chidden:true,
          ihidden:false
        })
        */
      }
    })
  },
  /**
  * 点击确认
  */
  modalConfirm: function () {
    // do something
    this.setData({
      modalHidden: true,
      chidden:false,
      ihidden:true
    })
  },
  
  modalConfirm2: function() {
    // do something
    this.setData({
      modalHidden2: true,
      chidden: false,
      ihidden: true
    })
  },
  /*
  showtip:function() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath,
          modalHidden: false,
          chidden:true,
          ihidden:false
        })
      }
    })
  },*/
  error(e) {
    console.log(e.detail)
  },
  bindViewTapllll: function (options) {
    wx.navigateBack({

    })
  }

})