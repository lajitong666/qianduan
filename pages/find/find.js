// pages/find/find.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    findList:''
  },
  /**
   * 添加动态
   * @param {*} e 
   */
  upload:function(){
    wx.navigateTo({
      url: '/pages/upload/upload',
    })
  },
  /**
   * 选择了一个
   * @param {*} e 
   */
  choose:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/findDetail/findDetail?id='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({ //获取资讯列表
      url: (app.globalData.url + '/find/getAll'),
      method: 'POST',
      data: {},
      header: {
        "content-type": "application/x-www-form-urlencoded",
        'csrf-csrf': 'csrf-csrf'
      },
      success: function (response) {
        //console.log(response.data.data)
        for(var i = 0;i<response.data.data.length;i++){
          console.log("进来了");
          var temp = "C:/apache-tomcat-9.0.33/webapps/plus-lajitong/uploads/"+response.data.data[i].contentImage;
          response.data.data[i].contentImage = temp;
          console.log(that.data.findList[i]);
        }
        that.setData({
          findList: response.data.data
        })
      }
    })
    console.log(that.data.findList);
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
    this.onLoad();
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