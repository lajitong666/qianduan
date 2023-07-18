Page({
  data: {
    scrollLeft: 0,
    TabCur: 0,
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  phoneUs(){
    wx.makePhoneCall({
      phoneNumber: '17320047318'
  })
  }
})
