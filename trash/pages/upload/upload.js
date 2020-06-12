// pages/upload/upload.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: '../../images/information.png',
    path:"",
    fileName:"",
    title:"",
    detail:""
  },
  /**
   *  文本框输入信息
   */
  inputTitle:function(e){
    this.setData({
      title:e.detail.value
    })
  },
   /**
   *  文本框输入信息
   */
  inputDetail:function(e){
    this.setData({
      detail:e.detail.value
    })
  },
  /**
   * 发布动态
   */
  upload:function(){
    var that = this
    //上传图片
    console.log(this.data.path)
    wx.uploadFile({
      url: app.globalData.url + '/file/fileUpload',
      filePath: this.data.path,
      name: 'file',
      formData: {
        fileName: "123.png"
      },
      success(res) {
        console.log("===========================")
      }
    })
    var fileName = that.data.fileName
    //上传详情信息
  /*  wx.getStorage({//获取本地缓存
      key: "userinformation",
      success: function (res) {
        console.log(res.data.nickName)
        console.log(res.data.avatarUrl)
        console.log("http://49.233.216.140:8080/lajitong--plus/image/"+fileName)
        console.log(that.data.title)
        console.log(that.data.detail)
        wx.request({        //获取有害垃圾信息
          url: (app.globalData.url+'/find/upload'),
          method:'POST',
          data: {
            name:res.data.nickName,
            userImage:res.data.avatarUrl,
            contentImage:"http://49.233.216.140:8080/lajitong--plus/image/"+fileName,
            title:that.data.title,
            detail:that.data.detail
          },
          header: {
            "content-type": "application/x-www-form-urlencoded",
            'csrf-csrf': 'csrf-csrf'
          },
          success:function(response){
            wx.navigateBack({//返回
              delta: 1
            })
          }
        })
      }
    }) */
  },
  /**
   * 从本地选择图片
   */
  wordImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        var tempFilePaths = res.tempFilePaths
        this.setData({
          images: tempFilePaths[0],
          path:tempFilePaths[0]
        })
        var name = this.data.path.split("/")
        this.setData({
          fileName:name[name.length-1]
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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