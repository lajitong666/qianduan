const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    current: 'tab1',
  },
  onLoad: function (options) {
    var that = this;
    console.log(options)
    wx.request({
      url: (app.globalData.url + '/waste/getOne'),
      method: 'POST',
      data: {
        name: options.name,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
        'csrf-csrf': 'csrf-csrf'
      },
      success:function(response){
        console.log("成功过")
        console.log(response);
        that.setData({
          waste:response.data.data
        })
      }
      
    })
  },
  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },
  handleChange ({ detail }) {
    this.setData({
        current: detail.key
    });
  }
});
