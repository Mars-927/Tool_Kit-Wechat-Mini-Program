// pages/ramdomNum/randomNum.js
var utils = require("../../utils/utils.js");
Page({
  data: {
    num1: 1,
    num2: 100,
    result: "?",
    hideBtn: false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.timer = null;
    this.t = 50; //数字正常变化的时间间隔
    this.count = 0;// 数字正常变化的次数，大于这个次数后数字变化速度逐渐变慢

    // 读取之前设置的随机数
    if(wx.getStorageSync('num1')){
      this.setData({
        num1:wx.getStorageSync('num1')
      })
    };
    if(wx.getStorageSync('num2')){
      this.setData({
        num2:wx.getStorageSync('num2')
      })
    }

    // 摇一摇
    utils.shake(this.start);

  },
  onHide: function () {
    // 页面隐藏
    clearInterval(this.timer);
    this.t = 50;
    this.count = 0;
  },


  setNum1: function (event) {
    var num = 0;
    if(event.detail.value){
      num = parseInt(event.detail.value);
    }
    this.setData({
      num1: num
    });
    wx.setStorageSync('num1', num);
  },

  setNum2: function (event) {
    var num = 0;
    if(event.detail.value){
      num = parseInt(event.detail.value);
    }
    this.setData({
      num2: num
    });
    wx.setStorageSync('num2', num);
  },

  start: function () {
    clearTimeout(this.timer);
    this.setData({
      hideBtn: true
    })
    this.roll();
  },

  roll: function () {
    var max, min;
    if (this.data.num1 < this.data.num2) {
      min = this.data.num1;
      max = this.data.num2;
    } else {
      min = this.data.num2;
      max = this.data.num1;
    }

    var result = min + Math.round(Math.random() * (max - min));
    this.setData({
      result: result
    })
    // 让数字先每50毫秒变化一次，如此变化50次后变化间隔逐渐变大，直到停止
    this.count++;
    if (this.count < 50) {
      this.timer = setTimeout(this.roll, 50);
    } else {
      this.t *= 1.5;
      if (this.t < 1500) {
        this.timer = setTimeout(this.roll, this.t);
      } else {
        this.t = 50;
        this.count = 0;
        this.setData({
          hideBtn: false
        })
      }
    }
  },
   // 分享功能
  onShareAppMessage:function(){
   
 }
})