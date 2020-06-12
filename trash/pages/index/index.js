//index.js
//获取应用实例
const app = getApp()
var that
Page({
  data: {
           //判断小程序的API，回调，参数，组件等是否在当前版本可用。
           canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    that = this;
    // 查看是否授权
    wx.getSetting({
        success: function (res) {
            if (res.authSetting['scope.userInfo']) {
                wx.getStorage({
                    key: 'openId',
                    success(res) {
                        console.log(res.data)
                        app.globalData.openId = res.data
                        console.log(app.globalData.openId)
                    }
                })
              
                wx.getUserInfo({
                    success: function (res) {
                        wx.switchTab({
                            url: '/pages/home/home',   //授权成功后跳转的页面
                        })
                    }
                });
            }
        }
    })
},
bindGetUserInfo: function (e) {
  if (e.detail.userInfo) {
      console.log(e.detail.userInfo)
      wx.setStorage({
          key: 'userinformation',
          data: e.detail.userInfo
      })
      wx.setStorage({
          key: 'province',
          data: e.detail.userInfo.province
      })
      wx.request({
        url: (app.globalData.url + '/user/getAppSecure'),
        method: 'post',
        data: {

        },
        header: {
          "content-type": "application/x-www-form-urlencoded", // 默认值    
          'csrf-csrf': 'csrf-csrf'
        },
        success: function (response) {
          console.log(response)
          app.globalData.appSecret = response.data.data
        }
      })


      wx.login({
          success(res) {
              if (res.code) {
                  // 发起网络请求
                  console.log('用户code'+res.code)                  
                  wx.request({
                      url: ('https://api.weixin.qq.com/sns/jscode2session?appid=wx5e3066fcc86059d3&secret='+app.globalData.appSecret+'&js_code=' + res.code + '&grant_type=authorization_code'),
                      // '?m=home&c=Api&a=getOpenId&appid=' + app.globalData.appId + '&secret=' + app.globalData.appSecret + '&js_code=' + res.code + '&grant_type=authorization_code').replace(/\s+/g, ""
                      // 'https://api.weixin.qq.com/sns/jscode2session?appid=' + app.globalData.appId + '&secret=' + app.globalData.appSecret + '&js_code=' + res.code + '&grant_type=authorization_code',
                      header: {
                          'content-type': 'application/json' // 默认值                     
                      },
                      method: "GET",
                      success(res) {
                          app.globalData.openId = res.data.openid;
                          console.log(res)
                          console.log("分割线")
                          if (e.detail.userInfo) {
                            
                              wx.setStorage({
                                  key: 'openId',
                                  data: res.data.openid
                              })
                              wx.request({
                                  url: (app.globalData.apiUrl + '?m=home&c=Api&a=Add&userid=' + res.data + '&province=' + e.detail.userInfo.province + '&city=' + e.detail.userInfo.city + '&nickname=' + e.detail.userInfo.nickName).replace(/\s+/g, ""),
                                  method: "GET",
                                  header: {
                                      'content-type': 'application/json'
                                  },
                                  success(res) {

                                      console.log(res.data)
                                      wx.setStorage({
                                          key: 'userid',
                                          data: res.data[0]["ID"]
                                      })
                                  }

                              })

                          }


                      }

                  })
              } else {
                  console.log('登录失败！' + res.errMsg)
              }
          }
      })
      wx.switchTab({
          url: '/pages/home/home',
      })
  } else {
      //用户按了拒绝按钮
      wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
          showCancel: false,
          confirmText: '返回授权',
          success: function (res) {
              if (res.confirm) {
                  console.log('用户点击了“返回授权”')
              }
          }
      })
  }
}
})