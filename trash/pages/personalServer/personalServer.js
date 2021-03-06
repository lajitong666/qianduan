// pages/personalServer/personalServer.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({ //获取资讯列表
      url: (app.globalData.url + '/personalServer/getAll'),
      method: 'POST',
      data: {},
      header: {
        "content-type": "application/x-www-form-urlencoded",
        'csrf-csrf': 'csrf-csrf'
      },
      success: function (response) {
        that.setData({
          list:response.data.data
        })
      }
    })
  },
  contractMe:function(e){
    var that = this
    wx.showActionSheet({
        itemList: ['立即拨打'],
        success: function (res) {
            console.log(res.tapIndex)
            if(res.tapIndex == 0){
              wx.makePhoneCall({
                phoneNumber: e.currentTarget.dataset.id
            })
            }
        },
        fail: function (res) {
            console.log(res.errMsg)
        }
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

  }
})