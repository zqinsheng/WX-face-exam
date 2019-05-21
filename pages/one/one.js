var util = require('../../utils/util.js');

Page({
  data: {

    teacherId:0,
    examList:[],
    examCount:0,
    endSubDate:"",
  },
  onLoad: function (options) {
    var tId = options.teacherId;
    //console.log(tId);

    this.setData({
      teacherId:options.teacherId
    })

    var that = this;
    wx.request({

      url: 'https://192.168.0.189:8888/api/ynavc/findReadyExam/'+tId,
      method:"POST",
      success(res){
          console.log(res.data);
          that.setData({
            examCount: res.data.data.examCount,
            examList:res.data.data.content,
          }),
            console.log(res.data.data.content[0].examInfo.endDate);

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
    wx.navigateBack({

    })
  },
  viewDetails:function(e){
    var id = e.currentTarget.dataset.examid;
    console.log('examid--------0.0.0.0.0=' + id)
    wx.navigateTo({
      url: '../index2/index?examId='+id
    })
  }
})
