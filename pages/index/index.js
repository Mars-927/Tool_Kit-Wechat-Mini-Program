// pages/index/index.js
Page({
data: {
},
onReady:function(){
  wx.showLoading({
    title: '加载中',
  })
  setTimeout(function () {
    wx.hideLoading()
  }, 2000)
  wx.showToast({
    title: '初始化完成',     
    duration: 1000,    
    mask:true    
  })
  
},
toone:function(){
  wx.navigateTo({
    url: '../demo01/demo01'
  })

},
totwo:function(){
  wx.navigateTo({
    url: '../demo02/demo02'
  })
},
tothree:function(){
  wx.navigateTo({
    url: '../demo03/demo03'
  })
},
tofour:function(){
  wx.navigateTo({
    url: '../demo04/demo04'
  })
},
tofive:function(){
  wx.navigateTo({
    url: '../jiugongeindex/jiugongeindex'
  })
},
tosix:function(){
  wx.navigateTo({
    url: '../write/index'
})
},
toseven:function(){
  wx.navigateTo({
    url:'../joke/joke'
  })
},
toeight:function(){
  wx.navigateTo({
    url:'../Good/Good'
  })
},
tonine:function(){
  wx.navigateTo({
    url:'../TouZi/TouZi'
  })
},
toten:function(){
  wx.navigateTo({
    url:'../randomNum/randomNum'
  })
}
})
