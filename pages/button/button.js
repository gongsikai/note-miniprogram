const md5 = require('md5')

Page({
  onLoad() {
    // wx.request({  })
    wx.request({
      url: 'https://api.note.gongsikai.com/api/user/login', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        name: '1',
        pass: md5('1')
      },
      header: {
        'content-type': 'application/json', // 默认值
        token: wx.getStorageSync('token')
      },
      success (res) {
        console.log('res.data', res.data)
        wx.setStorageSync('token', res.data.data.token)
        console.log('token', wx.getStorageSync('token'))
      }
    })
  }
});
