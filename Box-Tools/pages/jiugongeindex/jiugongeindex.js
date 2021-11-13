// pages/Lottery/Lottery.js
Page({
  data: {
    last_index: 0,//上一回滚动的位置
    amplification_index: 0,//轮盘的当前滚动位置
    roll_flag: true,//是否允许滚动
    max_number: 8,//轮盘的全部数量
    speed: 300,//速度，速度值越大，则越慢 初始化为300
    finalindex: 5,//最终的奖励距离当前的位置！不是最后的几等奖！
    myInterval: "",//定时器
    max_speed: 40,//滚盘的最大速度
    minturns: 8,//最小的圈数为2
    runs_now: 0//当前已跑步数
  },
  //开始滚动
  startrolling: function () {
    let _this = this;
    //初始化步数
    _this.data.runs_now = 0;
    //当前可以点击的状态下
    if (_this.data.roll_flag) {
      _this.data.roll_flag = false;
      //启动滚盘，注，若是最终后台无返回就不好意思里
      _this.rolling();
    }
  },
  onShow: function () {
    this.setData(this.data);
  },
  //滚动轮盘的动画效果
  rolling: function (amplification_index) {
    var _this = this;
    this.data.myInterval = setTimeout(function () { _this.rolling(); }, this.data.speed);
    this.data.runs_now++;//已经跑步数加一
    this.data.amplification_index++;//当前的加一
    //获取总步数，接口延迟问题，所以最后还是设置成1s以上
    var count_num = this.data.minturns * this.data.max_number + this.data.finalindex - this.data.last_index;
    //上升期间
    if (this.data.runs_now <= (count_num / 3) * 2) {
      this.data.speed -= 30;//加速
      if (this.data.speed <= this.data.max_speed) {
        this.data.speed = this.data.max_speed;//最高速度为40；
      }
    }
    //抽奖结束
    else if (this.data.runs_now >= count_num) {
      clearInterval(this.data.myInterval);
      this.data.roll_flag = true;
    }
    //下降期间
    else if (count_num - this.data.runs_now <= 10) {
      this.data.speed += 20;
    }
    //缓冲区间
    else {
      this.data.speed += 10;
      if (this.data.speed >= 100) {
        this.data.speed = 100;//最低速度为100；
      }
    }
    if (this.data.amplification_index > this.data.max_number) {//判定！是否大于最大数
      this.data.amplification_index = 1;
    }
    this.setData(this.data);
 
  }
})