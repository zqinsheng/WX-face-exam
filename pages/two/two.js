var util = require('../../utils/util.js');

Page({
  data: {
    teacherId:0,
    examInfoList:[],
    examCount:0,
    text: [
      {
        name: "高等数学上册期末考试",
        adr: "主教楼 5012室",
        num: "55人",
        passnum: "50人",
        failnum: "3人",
        absentnum: "2人"
      },
      {
        name: "大学英语2考试",
        adr: "科教楼 5楼402室",
        num: "38人",
        passnum: "50人",
        failnum: "3人",
        absentnum: "2人"
      }, {
        name: "大学计算机应用考试",
        adr: "昆明官渡区新螺蛳湾2期",
        num: "43人",
        passnum: "50人",
        failnum: "3人",
        absentnum: "2人"
      }
      , {
        name: "大学计算机应用考试",
        adr: "昆明官渡区新螺蛳湾2期",
        num: "43人",
        passnum: "50人",
        failnum: "3人",
        absentnum: "2人"
      }
    ],
  },
  onLoad: function (options) {
    var tId = options.teacherId;
    console.log(tId);
    this.setData({
      teacherId: options.teacherId
    })

    var that = this;
    wx.request({
      url: 'https://192.168.0.189:8888/api/ynavc/findAlreadyExam/' + tId,
      method: "POST",
      success(res) {
        console.log(res.data);
        that.setData({
          examCount: res.data.data.examCount,
          examInfoList:res.data.data.content
        })

      }
    })


    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time
    });
  },
  bindViewTapllll: function (options) {
    wx.redirectTo({
      url: '../index2/index',
    })
  },
  bindViewTapllll: function (options) {
    wx.navigateBack({

    })
  },

  viewDetails: function (e) {
    var id = e.currentTarget.dataset.examid;
    console.log('examid--------0.0.0.0.0=' + id)
    wx.navigateTo({
      url: '../index2/index?examId=' + id
    })
  }
})
