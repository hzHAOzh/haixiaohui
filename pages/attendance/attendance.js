// pages/attendance/attendance.js
import{
  getAttendanceListRequest
}from '../../api/main'
const attendanceCacheKey='attendance'//考勤缓存
Page({

  /**
   * 页面的初始数据
   */
  data: {
    attendanceList:[],
    termIndex:'',//当前学期索引
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getList()
  },
  getList(){
    const cache=wx.getStorageSync(attendanceCacheKey)
    if(cache){
      this.setData({
        attendanceList:cache
      })
      return
    }
    this.update()
  },
  update(){
    const that=this
    getAttendanceListRequest().then(res=>{
      that.setData({
        attendanceList:res.data
      })
      wx.showToast({
        title: '更新成功',
        icon:'success'
      })
      wx.setStorageSync(attendanceCacheKey, res.data)
    })
  },
  changeTerm(e){
    const termIndex=e.detail.value
    this.setData({
      termIndex:termIndex
    })
  },
  navAttendanceDetail(e){
    const index=e.currentTarget.dataset.index
    wx.navigateTo({
      url: `/pages/attendance-detail/detail?info=${JSON.stringify(this.data.attendanceList[this.data.termIndex].attendanceList[index])}`,
    })
  },
})