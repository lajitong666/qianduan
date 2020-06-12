const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    messageList: null
  },
  onLoad:function(options){
    var that = this;
    wx.request({
      url: (app.globalData.url+'/message/getAll'),
      method: 'post',
      data: {

      },
      header: {
        "content-type": "application/x-www-form-urlencoded", // 默认值    
        'csrf-csrf': 'csrf-csrf'
      },
      success:function(res){
        console.log(res.data.data)
          that.setData({
            messageList:res.data.data
          })
      }
  })
},
  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },
});