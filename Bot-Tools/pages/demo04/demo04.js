// pages/demo04/demo04.js
const util = require('../../utils/util.js'); //引入时间函数
Page({

  /**
 1. 页面的初始数据
   */
  data: {
    time:0,
    days: 0,   //记录天数
    months:0,  //记录月份
    years:0,   //记录年份
  },

  /**
 2. 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  //按键响应按钮获取当前的天数
  btnGetDays:function(){
    var that = this;
    //获取开始的毫秒数
    let date = new Date(this.data.date.replace(/-/g, '/')).getTime();
    //获取结束的毫秒数
    let dateNow = new Date(this.data.dateEnd.replace(/-/g, '/'))
    .getTime();
    //计算中间间隔时间
    let days = (dateNow - date)/(1000 * 3600 * 24); 
    let months = (days/30).toFixed(1);
    let years = (days / 365).toFixed(1);
    //判断是否是正数，如果是负数则返回失败
    if(days < 0){
      wx.showToast({
        title:'输入错误',
        image:'../../image/wrong.png', //这是要用到的“错误”图片
        duration:2000
      })
    } else{
      that.setData({
        days:days,
        months:months,
        years:years
      })
      //成功
      wx.showToast({
        title: '成功',
        image:'../../image/right.png', //这是要用到的“成功”图片
        duration: 1000
      })
    }
  },
  //结束时间选择函数
  bindDateChangeEnd:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log('数组的长度为', e.detail.value.replace(/-/g, '/'))
    let a = e.detail.value.replace(/-/g, '/');
    this.setData({
      dateEnd: e.detail.value,
      time: (new Date(a)).toString(),
    })
  },
  //开始时间选择函数
  bindDateChangeStart: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log('数组的长度为', e.detail.value.replace(/-/g,'/'))
    let a = e.detail.value.replace(/-/g, '/');
    this.setData({
      date: e.detail.value,
      time: (new Date(a)).toString(),
    })
  },
  //程序初始化时运行
  datetime:function(){
    var that = this;  
    let dateNow = new Date(); //获取当前时间
    let year = dateNow.getFullYear();
    let month = dateNow.getMonth() + 1;
    if(month < 10){
      month = `0${month}`;
    }
    let day = dateNow.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    let timeNow = `${year}-${month}-${day}`;
    console.log("当前时间为=>" ,`${year}-${month}-${day}`);
    that.setData({
      date: timeNow,
      dateEnd: timeNow
    })
  },
  /**
 3. 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      this.datetime();
  },

  /**
 4. 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
 5. 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
 6. 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
 7. 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
 8. 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
 9. 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
