// pages/Good/Good.js
Page({
  data: {
    output:{},
    css:"",
    count:"null",
    output1:true
  },
  Submit:function(e){
    if(e.detail.value.input.length!=0){
      this.search(e.detail.value.input)
    }
  },
  setda:function(e){
    this.setData({
      output1:false,
      css:'concent',
      output:e,
      count:"count",
    })
    if(this.data.output==null){
      wx.showToast({
          title: '无查询结果',
          icon:"none",
          duration: 2000,      //停留时间
        })
      }
      else if(this.data.output.length==0){
        wx.showToast({
          title: '无查询结果',
          icon:"none",
          duration: 2000,      //停留时间
        })
      }
  },

  search:function(target){ 
    var that=this
      wx.request({
      url: '——————'+target,
      method: 'GET',
      success: function (res) {
        that.setda(res.data.result)
      },
      fail: function() {
        wx.showToast({
          title: '加载失败,请检查网络', // 标题
          icon: 'none',  // 图标类型，默认success
          duration: 1500  // 提示窗停留时间，默认1500ms
        })
      }
    })
  }
})