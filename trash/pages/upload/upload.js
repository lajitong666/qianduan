// pages/upload/upload.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: '',
    path:"",
    fileName:"",
    title:"",
    detail:"",
    imgList: [],
    userinformation:'',
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
    console.log(this.data)
    wx.getStorage({
      key: 'userinformation',
      success (res) {
        that.setData({
          userinformation:res.data
        })
      }
    })
    console.log(that.data.userinformation);
    wx.uploadFile({
      url: app.globalData.url + '/find/upload',
      filePath: this.data.imgList[0],
      name: 'contentImage',
      formData: {
        name:that.data.userinformation.nickName,
        userImage:that.data.userinformation.avatarUrl,
        title:that.data.title,
        detail: that.data.detail
      },
      success(res) {
        console.log("上传动态完成")
      }
    })
    var fileName = that.data.fileName
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
        console.log(this.images);
        var name = this.data.path.split("/")
        this.setData({
          fileName:name[name.length-1]
        })
      },
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
})