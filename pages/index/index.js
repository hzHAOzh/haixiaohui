import { getNowWeek } from "../../utils/util"

const app = getApp()
Page({
  data: {
    navList:[
      {
        title:'查课表',
        icon:'/asset/imgs/course.png',
        path:'/pages/course/course'
      },
      {
        title:'查成绩',
        icon:'/asset/imgs/score.png',
        path:'/pages/score/score'
      },
      {
        title:'查考勤',
        icon:'/asset/imgs/attendance.png',
        path:'/pages/attendance/attendance'
      },
      {
        title:'查校历',
        icon:'/asset/imgs/calendar.png',
        path:'/pages/calendar/calendar'
      },
    ],
    startDate:'2023/09/04',//开学日期
    totalWeek:20,
    weekIndexText:['日','一','二','三','四','五','六'],
    todayCourseList:[],
  },
  onLoad() {
   this.getTodayCourseList()
  },
  nav(e){
    const index=e.currentTarget.dataset.index
    const path=this.data.navList[index].path
    wx.navigateTo({
      url: path,
      fail(){
        wx.switchTab({
          url: path,
        })
      }
    })
  },
  getTodayCourseList(){
    const todayWeek=new Date().getDay()
    const todayWeeks=getNowWeek(this.data.startDate,this.data.totalWeek)
    const courseList=wx.getStorageSync('courses')
    const todayCourseList = courseList.filter(item => {
      return item.week == todayWeek && item.weeks.indexOf(todayWeeks) > -1
    })
    todayCourseList.sort((a,b)=>{
      return a.section-b.section
    })
    this.setData({
      todayWeek,
      todayWeeks,
      todayCourseList
    })
  }
})
