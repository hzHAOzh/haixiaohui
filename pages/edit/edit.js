// pages/edit/edit.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:defaultAvatarUrl,
    ID:'',
    userName:'',
    sex:'请点击选择',
    grade:'请点击选择',
    sexList:['男','女','保密'],
    gradeList:['大一','大二','大三','大四','研究生','毕业生','保密',],
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
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
    app.globalData.userInfo.avatarUrl = avatarUrl
  },
  handleInput(e){
    const {value}= e.detail;
    this.setData({
      userName:value
    })
  },
  pickerChange(e){
    const sex=this.data.sexList[e.detail.value]
    const grade=this.data.gradeList[e.detail.value]
    if(e.currentTarget.dataset.index==0){
      this.setData({
        sex
      })
    }else{
      this.setData({
        grade
      })
    }
  },
  comfirmChange(){
    let dataArray = {
      'avatarUrl':this.data.avatarUrl,
       'userName': this.data.userName,
       'sex': this.data.sex,
       'grade': this.data.grade};
    wx.setStorageSync("userInfo", dataArray);
    wx.showToast({
      title: '修改成功',
      icon:'success',
    })
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/mine/mine',
        success(){
          var page = getCurrentPages().pop();
          page.onLoad()
        }
      })
    }, 1500);
  },
  getUserInfo(){
    const cache = wx.getStorageSync('userInfo')
    if (cache) {
      this.setData({
        ...cache
      })
    }
  },
})