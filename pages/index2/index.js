var app = getApp()

Page({

  data: {
    serverImg:app.globalData.serverImg,
    examId:0,
    navbar: [
      { id: '成功', sz: 32 },
      { id: '缺考', sz: 8 }
    ],
    modalHidden: true,
    countSuccess: 0,
    countFail: 0,
    successStudent:[],
    failStudent:[],
    currentTab: 0,
    tip: '',
    buttonDisabled: false,
    modalHidden: true,
    show: false

  },
  onLoad: function (options) {
    var eId = options.examId;
    this.setData({
      examId:options.examId
    })
    var that = this;
    wx.request({
      url: app.globalData.serverUrl+'/findStudent/'+eId,
      method:"POST",
      success(res){
        //console.log(res.data);
        var index1 = 0;
        var sz1 = 'navbar[' + index1 + '].sz';
        var index2 = 1;
        var sz2 = 'navbar[' + index2 + '].sz'
        that.setData({
          [sz1]: res.data.data.countSuccess,
          [sz2]: res.data.data.countFail,
          countSuccess: res.data.data.countSuccess,
          countFail: res.data.data.countFail,
          successStudent: res.data.data.successStudent,
          failStudent: res.data.data.failStudent,
          examName:res.data.data.examName
          
        })
      }
    })

    /*
    var artical = [{
      img: "../images/12345.jpg",
      tupian: "../images/time.png",
      date: "../images/right.png",
      title: "鹿晗",
      content: "2019-5-4 13:45"

    },
    {
      img: "../images/12345.jpg",
      tupian: "../images/time.png",
      date: "../images/right.png",
      title: "蔡徐坤",
      content: "2019-5-4 13:45"


    },
    {
      img: "../images/12345.jpg",
      tupian: "../images/time.png",
      date: "../images/right.png",
      title: "吴亦凡",
      content: "2019-5-4 13:45"


    }
    ]
  
    this.setData({
      artical_key: artical
    });
  */
  },



  // 导航切换监听

  navbarTap: function (e) {

    console.debug(e);
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  showModal: function () {
    this.setData({
      modalHidden: !this.data.modalHidden
    })
  },
   /*
 showtip: function () {
   wx.showModal({
    title: '该学生信息',
     img:"../images/12345.jpg",
     content: '失败',
   })
 },
*/

//查看学生详细信息
  showtip: function (e) {
    var id = e.currentTarget.dataset.stu;
   // console.log('学生id0.0.0.0.0=' + id)
    var that = this;
    wx.request({
      url: app.globalData.serverUrl+'/findOneStudent/'+id,
      method:"POST",
      success(res){
       // console.log(res.data);
        that.setData({
          studentInfo:res.data.data.student
        })
        
      }
    })
    this.setData({
      modalHidden: false
    })
  },
  //失败学生搜索
  searchFailInput:function(e){
    this.setData({ inputFailVal: e.detail.value });
  },
  //搜索失败学生姓名
  clickFailSearch: function (e) {
    var that = this;
    var eId = this.data.examId;
    var stuName = this.data.inputFailVal;

    if (stuName == null) {
      wx.showToast({
        title: '请输入学生姓名',
        icon: 'none',
        duration: 2000
      })
      return;
    } else {
      wx.request({
        url: app.globalData.serverUrl+'/searchFailStudent/' + that.data.examId + "/" + that.data.inputFailVal,
        method: "POST",
        header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', },
        success(res) {
          if (res.data.data != null) {
            //console.log(res.data.data);
            that.setData({
              failStudent: res.data.data.failStudent
            })

          } else {
            wx.showToast({
              title: '没有找到学生',
              icon: 'none',
              duration: 2000
            })
          }

        }
      })
    }
  },


  //搜索成功学生姓名
  searchInput:function(e){
    this.setData({ inputVal: e.detail.value });
  },
  //搜索成功学生姓名
  clickSearch:function(e){
    var that = this;
    var eId = this.data.examId;
    var stuName = this.data.inputVal;

    if(stuName==null){
      wx.showToast({
        title: '请输入学生姓名',
        icon: 'none',
        duration: 2000
      })
      return;
    }else{
      wx.request({
        url: app.globalData.serverUrl+'/searchSuccessStudent/' + that.data.examId + "/" + that.data.inputVal,
        method: "POST",
        header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', },
        success(res) {
          if (res.data.data != null) {
            //console.log(res.data.data);
            that.setData({
              successStudent: res.data.data.successStudent
            })
            
          } else {
            wx.showToast({
              title: '没有找到学生',
              icon: 'none',
              duration: 2000
            })
          }

        }
      })
    }
  },

  /**
  * 点击取消
  */
  modalConfirm: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },
  modalCandel: function () {
    // do something
    this.setData({
      modalHidden: true

    })
  },

  /**
  * 点击确认
  */
  modalConfirm: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },
  bindViewTapllll: function (options) {
    wx.navigateBack({
      delta: 1
    })
  },
  tab_slide: function (e) {//滑动切换tab 
    var that = this;
    that.setData({ tab: e.detail.current });
  },
  tab_click: function (e) {//点击tab切换
    var that = this;
    if (that.data.tab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        tab: e.target.dataset.current
      })
    }
  },
})