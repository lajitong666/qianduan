const app = getApp();
Page({
  StatusBar: app.globalData.StatusBar,
  CustomBar: app.globalData.CustomBar,
  data: {
    servicePersonList: [],
    name: '', //称呼
    phone: '', //联系电话
    address: '', //详细地址
    person: '',  //人员选择
    time: '12:01', //时间
    date: '2018-12-25',  //日期
    serve: '',
    modalName: null,
    index: null,
    serviceType: []
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: (app.globalData.url + '/servicetable/getAllService'),
      method: 'post',
      data: {
      },
      header: {
        "content-type": "application/x-www-form-urlencoded", // 默认值    
        'csrf-csrf': 'csrf-csrf'
      },
      success: function (res) {
        console.log("这里是服务人会员")
        console.log(res.data.data)
        var list = [];
        for (var i = 0; i < res.data.data.length; i++) {
          list.push(res.data.data[i].name);
        }
        console.log(list);
        that.setData({
          servicePersonList: list
        })
      }
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },



  addOne(e) {
    var that = this;
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
    wx.request({
      url: (app.globalData.url + '/servicetable/addOne'),
      method: 'post',
      data: {
        served: that.value1,
        phone: that.value2,
        date: that.date + that.time,
        serve: 123,  //这里还没有搞好。
        address: that.value3
      },
      header: {
        "content-type": "application/x-www-form-urlencoded", // 默认值    
        'csrf-csrf': 'csrf-csrf'
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          serviceList: res.data.data
        })
      }
    })


  },
  changeInput(e) {
    let changed = {};
    let prop = e.currentTarget.dataset.prop
    changed[prop] = e.detail.value;
    this.setData(changed)
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  PersonChange(e) {
    console.log(e);
    var that = this;
    this.setData({
      person: e.detail.value
    })
  },
  hideModal(e) {//隐藏提示框
    this.setData({
      modalName: null
    })
  }
});
