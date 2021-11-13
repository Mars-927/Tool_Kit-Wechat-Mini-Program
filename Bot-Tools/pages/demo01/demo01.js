// pages/demo01/demo01.js
Page({
  data: {
    inputText: '',
    text: '请输入弹幕( = _ =  )||',

    sliderValOfFontSize:50,
    fontSize: 300,
    fontColor:'white',
    backgroundColor:'black',

    animateTime:10,
    sliderValOfAnimateTime:50,

    currentTab: 0,
    textMoveAnimate:null,
    colorArr:[
      { color: 'pink' },
      { color: "red" },
      { color: "blue" },
      { color: "yellow" },
      { color: "white" },
      { color: "aqua" },
      { color: "green" },
      { color: "skyblue" },
      { color: "hotpink" },
      { color: "black" }
    ],
    access_token:'',
  },
  //改变背景颜色
  setBackGroundColor(e){
    console.log(e.target.dataset.index);
    let index = e.target.dataset.index;

    let that = this;
    let selectColor = that.data.colorArr[index].color;
    that.setData({
      backgroundColor: selectColor
    })
  },

  // 选择弹幕的字体颜色
  setColor(e){
    // console.log(e.target.dataset.index);
    let index = e.target.dataset.index;
    
    let that = this;
    let selectColor = that.data.colorArr[index].color;
    that.setData({
      fontColor:selectColor
    })
  },
  //改变弹幕滚动速度
  changeTextSpeend(e){
    console.log(e.detail.value);
    let sliderVal = e.detail.value;
    let that = this;
    //50 默认 10s
    //0 是 15s
    //100 是 5s
    that.setData({
      animateTime: sliderVal * -0.1 + 15,
      sliderValOfAnimateTime: sliderVal
    })
  },

  // 改变字号
  changeFontSize(e){
    //获取滑竿的值
    console.log(e.detail.value);
    let sliderVal = e.detail.value;
    let that = this;
    //运算边界值
    //50 对应 300rpx 的字号
    //0 对应 150rpx
    //100 对应 450rpx

    that.setData({
      fontSize: sliderVal * 3 + 150,
      sliderValOfFontSize: sliderVal
    })

  },


  // input失去焦点时获取输入的文字
  inputBlur(e) {
    let that = this;
    that.setData({
      text: e
    })
  },

  sendBtn(res) {
    this.setData({
      inputText: res.detail.value
  })
  },

  //敏感字验证
  //修改！！！
    queryRequest:function(){ 
      this.setData({
        text: this.data.inputText
    })
    },
//显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
  // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },

  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  onReady: function () {
    
  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})