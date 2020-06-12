const app = getApp();
Page({
  StatusBar: app.globalData.StatusBar,
  CustomBar: app.globalData.CustomBar,
  data: {
      picker: ['服务人员1', '服务人员2', '服务人员3'],
      value1: '', //称呼
      value2: '', //联系电话
      value3: '', //详细地址
      person: '',  //人员选择
      multiIndex: [0, 0, 0],
      time: '12:01', //时间
      date: '2018-12-25',  //日期
      region: ['广东省', '广州市', '海珠区'],
      imgList: [],
      modalName: null,
      textareaAValue: '',
      textareaBValue: '',
      index: null,
  },
  onLoad:function(options){
    var that = this;
    wx.request({
      url: (app.globalData.url+'/servicetable/getAllService'),
      method: 'post',
      data: {
      },
      header: {
        "content-type": "application/x-www-form-urlencoded", // 默认值    
        'csrf-csrf': 'csrf-csrf'
      },
      success:function(res){
        console.log(res.data.data)
          that.setData({
            serviceList:res.data.data
          })
      }
  })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },

  @RequestParam(value = "served") String served,
  @RequestParam(value = "phone") String phone,
  @RequestParam(value = "date") String date,
  @RequestParam(value = "serve") String serve,
  @RequestParam(value = "address") String address



  addOne(e){
    var that = this;
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
    wx.request({
      url: (app.globalData.url+'/servicetable/addOne'),
      method: 'post',
      data: {
        served:that.value1,
        phone:that.value2,
        date:that.date+that.time,
        serve:123,  //这里还没有搞好。
        address:that.value3
      },
      header: {
        "content-type": "application/x-www-form-urlencoded", // 默认值    
        'csrf-csrf': 'csrf-csrf'
      },
      success:function(res){
        console.log(res.data.data)
          that.setData({
            serviceList:res.data.data
          })
      }
  })
  

  },
  changeInput(e){
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
  PickerChange(e) {
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
