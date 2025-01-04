const md5 = require('md5')
const moment = require('moment')
const app = getApp()


Page({
  onLoad() {
    // wx.request({  })
    this.setData({
      // app.globalData.token
      token: wx.getStorageSync('token'),
      name: '',
      pass: ''
    })
    this.methodsNoteList()
    console.log('data token', this.data.token)
  },
  token: wx.getStorageSync('token'),
  name: '',
  pass: '',
  noteContent: '',
  noteList: [],
  bindTapAdd(event) {
    this.add()
    console.log('event', event)
  },
  bindTapLogin(event) {
    this.login()
    console.log('event', event)
  },
  bindTabLogout(event) {
    this.logout()
    console.log('event', event)
  },
  // bindTapSave(event) {
  //   // this.save()
  //   this.noteSave()
  //   console.log('event', event)
  // },
  bindTabSave(event) {
    // this.save()
    this.noteSave()
    console.log('event', event)
  },
  bindTabDelete(event) {
    // this.delete()
    this.noteDelete(event)
    console.log('event', event)
  },
  add() {
    const that = this;
    wx.request({
      url: 'https://api.note.gongsikai.com/api/user/add', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        // name: '1',
        name: this.data.name,
        // pass: md5('1'),
        pass: md5(this.data.pass)
      },
      header: {
        'content-type': 'application/json', // 默认值
        token: wx.getStorageSync('token')
      },
      success (res) {
        console.log('res.data', res.data)
        // wx.setStorageSync('token', res.data.data.token)
        // console.log('token', wx.getStorageSync('token'))
        // this.setData({
        //   name: '',
        //   pass: ''
        // })
        that.setData({
          name: '',
          pass: ''
        })
      }
    })
  },
  login() {
    const that = this;
    wx.request({
      url: 'https://api.note.gongsikai.com/api/user/login', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        // name: '1',
        name: this.data.name,
        // pass: md5('1'),
        pass: md5(this.data.pass)
      },
      header: {
        'content-type': 'application/json', // 默认值
        token: wx.getStorageSync('token')
      },
      success (res) {
        console.log('res.data', res.data)
        wx.setStorageSync('token', res.data.data.token)
        // this.setData({
        //   token: res.data.data.token
        // })
        that.setData({
          token: res.data.data.token,
        })
        console.log('token', wx.getStorageSync('token'))
        that.methodsNoteList()
      }
    })
  },
  logout() {
    wx.setStorageSync('token', '')
    this.setData({
      token: '',
      name: '',
      pass: ''
    })
  },
  noteSave(event) {
    console.log('event', event)
    const that = this;
    wx.request({
      url: 'https://api.note.gongsikai.com/api/note/add', //仅为示例，并非真实的接口地址
      // method: 'POST',
      // method: 'GET',
      method: 'POST',
      // data: {
      //   // name: '1',
      //   name: this.data.name,
      //   // pass: md5('1'),
      //   pass: md5(this.data.pass)
      // },
      data: {
        // uuid: 'uuid',
        content: that.data.noteContent
      },
      header: {
        'content-type': 'application/json', // 默认值
        token: wx.getStorageSync('token')
      },
      success (res) {
        console.log('res.data', res.data)
        that.setData({
          noteContent: '',
        })
        that.methodsNoteList()
        // wx.setStorageSync('token', res.data.data.token)
        // this.setData({
        //   token: res.data.data.token
        // })
        // that.setData({
        //   // noteList: res.data.data.token,
        //   // noteList: res.data.data.map(item => ({ ...item, content: decodeURIComponent(item.content) })),
        //   // noteList: res.data.data.map(item => ({ 
        //   //   ...item,
        //   //   content: decodeURIComponent(item.content),
        //   //   create_time: moment(item.create_time).parse('YYYY DD MM HH:mm:SS')
        //   // })),
        //   noteList: res.data.data.map(item => ({ 
        //     ...item,
        //     content: decodeURIComponent(item.content),
        //     create_time: moment(item.create_time).format('YYYY年MM月DD日 hh时mm分ss秒'),
        //     eidtable: false
        //   }))
        // })
        // console.log('token', wx.getStorageSync('token'))
      }
    })
  },
  noteDelete(event) {
    console.log('event', event)
    const that = this;
    wx.request({
      url: 'https://api.note.gongsikai.com/api/note/del', //仅为示例，并非真实的接口地址
      // method: 'POST',
      // method: 'GET',
      method: 'POST',
      // data: {
      //   // name: '1',
      //   name: this.data.name,
      //   // pass: md5('1'),
      //   pass: md5(this.data.pass)
      // },
      data: {
        // uuid: 'uuid',
        uuid: event.currentTarget.dataset.uuid
      },
      header: {
        'content-type': 'application/json', // 默认值
        token: wx.getStorageSync('token')
      },
      success (res) {
        console.log('res.data', res.data)
        that.methodsNoteList()
        // wx.setStorageSync('token', res.data.data.token)
        // this.setData({
        //   token: res.data.data.token
        // })
        // that.setData({
        //   // noteList: res.data.data.token,
        //   // noteList: res.data.data.map(item => ({ ...item, content: decodeURIComponent(item.content) })),
        //   // noteList: res.data.data.map(item => ({ 
        //   //   ...item,
        //   //   content: decodeURIComponent(item.content),
        //   //   create_time: moment(item.create_time).parse('YYYY DD MM HH:mm:SS')
        //   // })),
        //   noteList: res.data.data.map(item => ({ 
        //     ...item,
        //     content: decodeURIComponent(item.content),
        //     create_time: moment(item.create_time).format('YYYY年MM月DD日 hh时mm分ss秒'),
        //     eidtable: false
        //   }))
        // })
        // console.log('token', wx.getStorageSync('token'))
      }
    })
  },
  methodsNoteList() {
    const that = this;
    wx.request({
      url: 'https://api.note.gongsikai.com/api/note/list', //仅为示例，并非真实的接口地址
      // method: 'POST',
      method: 'GET',
      // data: {
      //   // name: '1',
      //   name: this.data.name,
      //   // pass: md5('1'),
      //   pass: md5(this.data.pass)
      // },
      header: {
        'content-type': 'application/json', // 默认值
        token: wx.getStorageSync('token')
      },
      success (res) {
        console.log('res.data', res.data)
        // wx.setStorageSync('token', res.data.data.token)
        // this.setData({
        //   token: res.data.data.token
        // })
        that.setData({
          // noteList: res.data.data.token,
          // noteList: res.data.data.map(item => ({ ...item, content: decodeURIComponent(item.content) })),
          // noteList: res.data.data.map(item => ({ 
          //   ...item,
          //   content: decodeURIComponent(item.content),
          //   create_time: moment(item.create_time).parse('YYYY DD MM HH:mm:SS')
          // })),
          noteList: res.data.data.map(item => ({ 
            ...item,
            content: decodeURIComponent(item.content),
            create_time: moment(item.create_time).format('YYYY年MM月DD日 hh时mm分ss秒'),
            eidtable: false
          }))
        })
        // console.log('token', wx.getStorageSync('token'))
      }
    })
  },
  methodsDecodeURIComponent(data) {
    console.log('decodeURIComponent(data)', decodeURIComponent(data))
    return decodeURIComponent(data)
  }
});
