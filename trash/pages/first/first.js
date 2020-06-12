const app = getApp();

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