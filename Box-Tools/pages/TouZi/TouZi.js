
var mytimer =null;
Page({
  data: {
    avatarUrl: '6.png',
    opacity:0,
    threshold:50,
    isDisabled:false,
    winH:50,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  yaoyiyao:function(){
    var idx = 0;
    var that = this;
    mytimer = setInterval(function () {
      idx++;
      var tmp = that.randomNum(1, 6);
      var opacity = that.data.opacity + 0.1;
      if (opacity > 0.5) {
        opacity = 0;
      }
      console.log("idx=" + idx + ",opacity=" + opacity);

      // debugger
      that.setData({
        avatarUrl: tmp + ".png",
        opacity: opacity
      });
      if (idx >= 10) {
        clearInterval(mytimer);
        mytimer=null;
        console.log("...mytimer="+mytimer) ;
        that.setData({
          isDisabled:false
        })
      }
    }, 100);
    
  },
  clickMe: function() {
    this.setData({
      isDisabled:true
    })
    this.yaoyiyao();
  },
  //生成从minNum到maxNum的随机数
  randomNum: function (minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10);
        break;
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        break;
      default:
        return 0;
    }
  }
});

