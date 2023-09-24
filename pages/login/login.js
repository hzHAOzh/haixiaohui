// pages/login/login.js
import{
  loginRequest
}from "../../api/main"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    stuId:'',//学号
    password:'',//密码
    saveCount:true,//是否记住账号，默认选中
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initAccount()
  },
  //初始化账号
  initAccount(){
    const accountCache=wx.getStorageSync("account")
    if(accountCache){
      this.setData({
        ...accountCache//解构
        // 使用解构语法...accountCache直接把accountCache对象中的所有属性赋值到当前页面数据中。（ES6语法）
      })
    }
  },
  //登录逻辑
  login(){
    var that=this
    const postData={
      stuId:that.data.stuId,
      password:that.data.password
    }
    wx.showLoading({
      title: '登录中',
    })
    loginRequest(postData).then(res=>{
      wx.hideLoading()
      if(res.code==-1){
        wx.showToast({
          title: '账号或密码有误',
          icon:'error'
        })
        return
      }
      wx.setStorageSync('token', res.data.cookie)//本地存储用户登录信息
      if(that.data.saveCount){
        wx.setStorageSync('account', postData)//记住账号密码逻辑
      }else{
        wx.removeStorageSync('account')
      }
      wx.showToast({
        title: '登录成功',
        icon:'success'
      })
      var page=getCurrentPages()[0]
      page.onLoad()//刷新我的页面
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/index/index',
        })
      }, 1500);
    })
  },
  //切换复选框状态
  switchCheckStatus(){
    this.setData({
      saveCount:!this.data.saveCount
    })
  },
  fakeCallback(){}
})