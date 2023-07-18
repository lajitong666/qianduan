
const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list1: ['废纸','玻璃'],   //可回收物
    list2: [],   //有害垃圾
    list3: [],   //湿垃圾
    list4: [],   //干垃圾
    load: true
  },
  onLoad:function(options) {
    var that = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    wx.request({     //获取可回收物垃圾信息
      url: (app.globalData.url+'/waste/getAll'),
      method:'POST',
      data: {
        type:1,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
        'csrf-csrf': 'csrf-csrf'
      },
      success:function(response){
          console.log(response.data.data)
          that.setData(
            {
              list1 :response.data.data
            }
          )
      }
    })
    wx.request({        //获取有害垃圾信息
      url: (app.globalData.url+'/waste/getAll'),
      method:'POST',
      data: {
        type:2,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
        'csrf-csrf': 'csrf-csrf'
      },
      success:function(response){
          console.log(response.data.data)
          that.setData(
            {
              list2 :response.data.data
            }
          )
      }
    })
    wx.request({         //获取湿垃圾信息
      url: (app.globalData.url+'/waste/getAll'),
      method:'POST',
      data: {
        type:3,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
        'csrf-csrf': 'csrf-csrf'
      },
      success:function(response){
          console.log(response.data.data)
          that.setData(
            {
              list3 :response.data.data
            }
          )
      }
    })
    wx.request({            //获取干垃圾信息
      url: (app.globalData.url+'/waste/getAll'),
      method:'POST',
      data: {
        type:4,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
        'csrf-csrf': 'csrf-csrf'
      },
      success:function(response){
          console.log(response.data.data)
          that.setData(
            {
              list4 :response.data.data
            }
          )
      }
    })
    
    let list = [{}];
    list[0] = {};
    list[1] = {};
    list[2] = {};
    list[3] = {};
    list[0].name = '可回收物';
    list[1].name = '有害垃圾';
    list[2].name = '湿垃圾';
    list[3].name = '干垃圾';
    list[0].id = 0;
    list[1].id = 1;
    list[2].id = 2;
    list[3].id = 3;
    this.setData({
      list: list,
      listCur: list[0]
    })
  },
  navigator(e){
    console.log(e)
    wx.navigateTo({ 
      url: '/pages/detail/detail?name='+e.currentTarget.dataset.name, //跳转到详情页
    });
  },
  onReady() {
    wx.hideLoading()
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;     
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  }
})