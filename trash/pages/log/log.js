const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
  },
  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'openId',
      success: function (res) {
        wx.request({
          url: app.globalData.url + '/integral/getIntegral',
          method: 'post',
          data: {
            openId: 'o-l0h5ePG1stxZW7REGKHdrcsCu0'
          },
          header: {
            "content-type": "application/x-www-form-urlencoded", // 默认值    
            'csrf-csrf': 'csrf-csrf'
          },
          success:function(res){
            console.log(res.data.data)
            that.setData({
              list1:res.data.data
            })
            var listtemple = []
            for(var i = 0;i<res.data.data.length;i++){
              console.log(res.data.data[i].details.split(","))
              let temple = res.data.data[i].details.split(",")
              listtemple.push(temple)
            }
            console.log(listtemple)
            that.setData({
              list2:listtemple
            })
          }
        })
        
      }
    })

  },
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  },

});
