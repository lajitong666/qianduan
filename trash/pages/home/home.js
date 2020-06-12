const app = getApp()

Page({
  options: {
    addGlobalClass: true,
  },
  data: {
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
  },
  onLoad: function (options) {
    var that = this
    console.log(app.globalData.openId)
    console.log(app.globalData.openId)
    wx.getStorage({//获取本地缓存
      key: "userinformation",
      success: function (res) {
        console.log(res)
        that.setData({
          user: res.data
        })
      }
    })
    wx.getStorage({
      key: 'openId',
      success: function (res) {
        console.log(res)
        that.setData({
          openId: res.data
        }),
        wx.request({
          url: (app.globalData.url + '/user/getUserDetails'),
          method: 'post',
          data: {
            openId: res.data
          },
          header: {
            "content-type": "application/x-www-form-urlencoded", // 默认值    
            'csrf-csrf': 'csrf-csrf'
          },
          success: function (response) {
            console.log(response)
            that.setData({
              userDetails: response.data.data
            })
          }
        })
      }
    })

  },




    attached() {
      console.log("success")
      let that = this;
      wx.showLoading({
        title: '数据加载中',
        mask: true,
      })
      let i = 0;
      numDH();
      function numDH() {
        if (i < 20) {
          setTimeout(function () {
            that.setData({
              starCount: i,
              forksCount: i,
              visitTotal: i
            })
            i++
            numDH();
          }, 20)
        } else {
          that.setData({
            visitTotal: that.coutNum(10),
            starCount: that.coutNum(10),
            forksCount: that.coutNum(200)
          })
        }
      }
      wx.hideLoading()
    },
    methods: {
      coutNum(e) {
        if (e > 1000 && e < 10000) {
          e = (e / 1000).toFixed(1) + 'k'
        }
        if (e > 10000) {
          e = (e / 10000).toFixed(1) + 'W'
        }
        return e
      },
      CopyLink(e) {
        wx.setClipboardData({
          data: e.currentTarget.dataset.link,
          success: res => {
            wx.showToast({
              title: '已复制',
              duration: 1000,
            })
          }
        })
      },
      showModal(e) {
        this.setData({
          modalName: e.currentTarget.dataset.target
        })
      },
      hideModal(e) {
        this.setData({
          modalName: null
        })
      },
      showQrcode() {
        wx.previewImage({
          urls: ['https://image.weilanwl.com/color2.0/zanCode.jpg'],
          current: 'https://image.weilanwl.com/color2.0/zanCode.jpg' // 当前显示图片的http链接      
        })
      },
    }
  })