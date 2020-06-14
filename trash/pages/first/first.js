var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ColorList: app.globalData.ColorList,
    cardCur: 0,
    scanResult:'',
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=104813898,1898163406&fm=26&gp=0.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2056146150,3067592488&fm=26&gp=0.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2973598070,2257499655&fm=15&gp=0.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=360835900,3233160965&fm=26&gp=0.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3300419795,3282529978&fm=26&gp=0.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1888801328,1076456724&fm=11&gp=0.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585802157914&di=b1cd753140277bf68e64d1bd702b1f3a&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20190705%2Fca99b15d6da8440dada3a1da8a3d95d9.gif'
    }],
    
  },
  onLoad: function (options) {
    var that = this
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
        app.globalData.appSecret = response.data.msg
      }
    }),
    wx.login({
      success(res) {
          if (res.code) {
              // 发起网络请求
              console.log('用户code'+res.code)          
              console.log(app.globalData.appSecret)        
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
              })
          }
      }
    })
  
    wx.request({ //获取垃圾与收益
      url: (app.globalData.url + '/trash/get'),
      method: 'POST',
      data: {
        id:1 
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
        'csrf-csrf': 'csrf-csrf'
      },
      success: function (response) {
        console.log(response.data.data)
        that.setData({
          trash:response.data.data[0]['trash'],
          profit:response.data.data[0]['profit']
        })
      }
    }) 
  },
  scanCode:function(options){
    var that = this;
    wx.scanCode({
      success (res) {
        console.log(res)
        that.data.scanResult = res.result;
        that.setData({
          scanResult:res.result
        })
      },
      fail(res){
        console.log("扫码失败")
      }
    })
  }
})