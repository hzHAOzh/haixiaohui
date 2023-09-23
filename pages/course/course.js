// pages/course/course.js
import{
  getCourseListRequest
}from '../../api/main'
import{
  getNowWeek
}from '../../utils/util'
const courseCacheKey="courses"
const courseColorKey="courseColor"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowWeek:1,//当前周数
    totalWeek:20,//总周数
    showSwitchWeek:false,//显示周数弹窗变量
    weekDayCount:7,
    startDate:'2023/09/04',//开学日期
    weekIndexText:['一','二','三','四','五','六','日'],
    nowMonth:1,//当前周的月份
    courseList:[],
    colorList:[
      "#116A7B",
      "#DD58D6",
      "#30A2FF",
      "#0079FF",
      "#F79327",
      "#47A992",
      "#7A3E3E",
      "#FF55BB",
      "#A0D8B3",
      "#539165",
      "#3A98B9",
      "#609966",
    ],
    courseColor:{},
    weekCalendar:[1,2,3,4,5,6,7],
    firstEntry:true,
    courseTimeList:[
        "08:10 08:55",
        "09:00 09:45",
        "10:15 11:00",
        "11:05 11:50",
        "14:30 15:15",
        "15:20 16:05",
        "16:30 17:15",
        "17:20 18:05",
        "19:30 20:15",
        "20:25 21:10",
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getWeekDates()
    this.getNowWeek()
    this.getData()
    this.getTodayDate()
  },
  selectWeek(){
    this.setData({
      showSwitchWeek:true
    })
  },
  switchWeek(e){
    const week=e.currentTarget.dataset.index
    this.setData({
      showSwitchWeek:false
    })
    this.switchWeekFn(week)
  },
  switchWeekFn(week){
    this.setData({
      nowWeek:week
    })
    this.getWeekDates()
  },
  hideSwitchWeek(){
    this.setData({
      showSwitchWeek:false
    })
  },
  //获取日期
  getWeekDates(){
    const startDate=new Date(this.data.startDate)
    const addTime=(this.data.nowWeek-1)*7*24*60*60*1000//毫秒
    const firstDate=startDate.getTime()+addTime//时间戳
    const { month }=this.getDateObject(new Date(firstDate))
    const weekCalendar=[]
    for (let i = 0; i < this.data.weekDayCount; i++) {
      const date=new Date(firstDate+i*24*60*60*1000)
      const { day }=this.getDateObject(date)
      weekCalendar.push(day)  
    }
    this.setData({
      weekCalendar,
      nowMonth:month
    })
  },
  getDateObject(date=new Date()){
    const year=date.getFullYear()
    const month=date.getMonth()+1
    const day=date.getDate()
    return{
      year,
      month,
      day
    }
  },
  getNowWeek(){
    const nowWeek=getNowWeek(this.data.startDate,this.data.totalWeek)
    this.setData({
      nowWeek
    })
    this.getWeekDates()
  },
  getData(){
    const that=this
    const cache=wx.getStorageSync(courseCacheKey)
    const courseColor=wx.getStorageSync(courseColorKey)
    if(cache){
      that.setData({
        courseList:cache,
        courseColor
      })
      return
    }
    this.update()
  },
  update(){
    const that=this
    getCourseListRequest().then(res=>{
      const courseColor={}
      var colorIndex=0
      res.data.map(item=>{
        if(courseColor[item.name]===undefined){
          courseColor[item.name]=that.data.colorList[colorIndex]
          colorIndex++
        }
      })
      that.setData({
        courseList:res.data,
        courseColor
      })
      wx.showToast({
        title: '更新成功',
        icon:'success'
      })
      wx.setStorageSync(courseCacheKey, res.data)
      wx.setStorageSync(courseColorKey, courseColor)
    })
  },
  swiperSwitch(e){
    if(e.detail.source==''){
      this.setData({
        firstEntry:false
      })
      return
    }
    const index=e.detail.current
    this.switchWeekFn(index+1)
  },
  //获取今天日期
  getTodayDate(){
    const {
      month:todayMonth,
      day:todayDay
    }=this.getDateObject()
    this.setData({
      todayMonth,
      todayDay
    })
  },
  navCourseDetail(e){
    const index=e.currentTarget.dataset.index
    wx.navigateTo({
      url: `/pages/course-detail/detail?info=${JSON.stringify(this.data.courseList[index])}`,
    })
  }
})