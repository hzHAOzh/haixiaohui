// pages/attendance-detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:[],
    infoRef: [
      {
        key: 'date',
        title: '缺勤时间'
      },
      {
        key: 'reason',
        title: '缺勤原因'
      },
      {
        key: 'section',
        title: '缺勤节数'
      },
      {
        key: 'week',
        title: '缺勤周'
      },
      {
        key: 'teacher',
        title: '任课教师'
      },
      {
        key: 'teacherNum',
        title: '教师编号'
      },
      {
        key: 'mark',
        title: '备注'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let info=options.info||''
    if(info==''){
      wx.showToast({
        title: '页面不存在',
        icon:'error'
      })
      setTimeout(() => {
        wx.navigateBack({
          delta:1
        })
      }, 1500);
      return
    }
    info=JSON.parse(info)
    const week=info.week.substr(0,1)=='0'?info.week.slice(1):info.week
    const mark=info.mark==''?'暂无':info.mark
    info.week='第'+week+'周'
    info.mark=mark
    this.setData({
      info
    })
  },
})