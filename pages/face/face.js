// pages/face/face.js
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
  onUnload: function () {

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
    this.setData({
      modalHidden: false,
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
  showtip() {
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
  },
  error(e) {
    console.log(e.detail)
  },
  bindViewTapllll: function (options) {
    wx.navigateBack({

    })
  }

})