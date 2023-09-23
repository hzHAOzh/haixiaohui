// pages/mine/mine.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:defaultAvatarUrl,
    userName:'',
    ID:'',
    listItem:['问题反馈','用户协议','清除缓存','检查新版本'],
    show: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   this.getUserInfo()
   this.getId()
  },
  getId(){
    const that=this
    wx.getStorage({
      key: 'account',
      success (res) {
        that.setData({
          ID:res.data.stuId
        })
      }
    })
  },
  toEdit(){
    wx.navigateTo({
      url: '/pages/edit/edit',
    })
  },
  removeLogin(){
    wx.showModal({
      title: '提示',
      content: '您确定要退出吗？',
      success (res) {
        if (res.confirm) {
          wx.removeStorageSync('token')
          wx.navigateTo({
            url: '../login/login',
          })
        }
      }
    })
  },
  getUserInfo(){
    const cache = wx.getStorageSync('userInfo')
    if (cache) {
      this.setData({
        ...cache
      })
    }
  },
  mineNav(e) {
    if(e.currentTarget.dataset.index==0){
      this.setData({ show: true })
    }else if(e.currentTarget.dataset.index==1){
      wx.navigateTo({
        url: '/pages/agreement/agreement',
      })
    }else if(e.currentTarget.dataset.index==2){
     wx.showModal({
       title: '您确定要清除缓存吗',
       content: '清除缓存后本地数据将全部清空！',
       success(res){
         if (res.confirm) {
          wx.clearStorage()
          wx.showToast({
            title: '清除成功',
            icon:'success'
          })
         }
       }
     })
    }
  },
  onClickHide() {
    this.setData({ show: false });
  },
})