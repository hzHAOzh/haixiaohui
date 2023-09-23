// pages/score/score.js
import{
  getScoreListRequest,
  getRawScoreListRequest
}from '../../api/main'
const scoreCacheKey="scores"//有效成绩缓存
const rawScoreCacheKey="rawScores"//原始成绩缓存
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:1,//1为有效成绩，2为原始成绩
    scoreList:[],//成绩列表
    termIndex:0,//当前学期索引
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getList()
  },
  //获取成绩列表
  getList(){
    const cache=wx.getStorageSync(this.data.type == 1?scoreCacheKey:rawScoreCacheKey)
    if(cache){
      this.setData({
        scoreList:cache
      })
      return
    } 
    this.update()
  },
  //更新成绩列表
  update(){
    var that=this
    let p=null
    if(that.data.type==1){
      p=getScoreListRequest()
    }else{
      p=getRawScoreListRequest()
    }
    p.then(res=>{
      that.setData({
        scoreList:res.data
      })
      wx.showToast({
        title: '更新成功',
        icon:'success'
      })
      wx.setStorageSync(that.data.type == 1 ? scoreCacheKey : rawScoreCacheKey , res.data)
    })
  },
  //切换成绩类型
  changeScoreType(e){
    const type=e.currentTarget.dataset.type
    this.setData({
      type:type
    })
    this.getList()
  },
  //切换学期
  changeTerm(e){
    const termIndex=e.detail.value
    this.setData({
      termIndex:termIndex
    })
  },
})