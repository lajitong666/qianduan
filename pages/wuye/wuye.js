//teacherlist.js
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    trimg: 'http://img.xdf.cn/TeacherIMG/2011/20110412/TCCQ09120110412170811_big.jpg',
    propertyName:'',
    propertySynopsis:'',
    propertyDetail:'',
    grade:'',
    address:'',
    image:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(app.globalData.url);
    wx.request({ //获取物业详细信息
      
      url: (app.globalData.url + '/wuye/getAll'),
      method: 'POST',
      data:{
        
      },
      success: function (response) {
        console.log(response.data.data);
        that.setData({
          propertyName:response.data.data.name,
          propertySynopsis:response.data.data.synopsis,
          propertyDetail:response.data.data.detail,
          grade:response.data.data.grade,
          address:response.data.data.address,
          image:response.data.data.image
        })
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