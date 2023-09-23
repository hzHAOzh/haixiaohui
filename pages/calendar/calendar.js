// pages/calendar/calendar.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isshow:false,
    imgUrl:['/asset/imgs/calendar-23.jpg','/asset/imgs/calendar-24.jpg'],
    imgIndex:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  imgClick(e){
    const imgIndex=e.currentTarget.dataset.index
    this.setData({
      isshow:true,
      imgIndex
    })
  },
  onClose(){
    this.setData({
      isshow:false
    })
  }
})