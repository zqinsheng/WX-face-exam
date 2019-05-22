var util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    arrayCollege: [
      "请选择",
      "经济管理学院",
      "畜牧兽医学院",
      "园林园艺学院",
      "工程学院",
      "农学与生物技术学院"
    ],

    name: "张三",
    sex: 0,
    age: 0,
    phone: "",
    jobNumber: "",
    college: "",
    checkedMen: "",
    checkedWomen: "",
    teacherId: 0,
    index: 0
  },

  radioChange: function(e) {
   // console.log('radio发生change事件，携带value值为：', e.detail.value)
  },

  onLoad: function(options) {
    var tId = options.teacherId;
    var that = this;
    wx.request({
      url: app.globalData.serverUrl +'/findTeacher/' + tId,
      method: "POST",
      success(res) {
        //console.log(res.data);

        var result = res.data.data.content;
        that.setData({
          name: result.teacherName,
          age: result.age,
          phone: result.phone,
          jobNumber: result.jobNumber,
          gender:result.gender,
          index:result.college,
        })

      }
    })

    //接收teacherId
    this.setData({
      teacherId: options.teacherId
    })

  },
  //返回主界面
  bindViewTapllll: function(options) {
    wx.navigateBack({

    })
  },
  //选择学院  改变事件
  pickerChange: function(e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: (e.detail.value)
    })
  },

  //表单提交
  formSubmit: function (e) {
    var tId = this.data.teacherId;
   // console.log("=============teacherId=======" + tId);
    //console.log('form发生了submit事件，携带数据为：', e.detail.value.teacherName);
   // console.log('form发生了submit事件，携带数据为：', e.detail.value.sex);
   // console.log('form发生了submit事件，携带数据为：', e.detail.value.age);
   // console.log('form发生了submit事件，携带数据为：', e.detail.value.phone);
   // console.log('form发生了submit事件，携带数据为：', e.detail.value.jobNumber);
    //console.log('form发生了submit事件，携带数据为：', e.detail.value.college);


    wx.request({
      url: app.globalData.serverUrl+'/updateTeacher/' + tId + "/" + e.detail.value.teacherName + "/" + e.detail.value.sex + "/" + e.detail.value.age + "/" + e.detail.value.phone + "/" + e.detail.value.jobNumber + "/" + e.detail.value.college,
      method:"POST",
      success(res){
          if(res.data==1){
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000
            })
          }else if(res.data==0){
            wx.showModal({
              title: '提示',
              content: '修改失败！',
              showCancel: false,
              success: function (res) {

              }
            })
          }
      }
    })
  }

})