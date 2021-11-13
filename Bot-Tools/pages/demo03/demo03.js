// pages/demo03/demo03.js
import * as data from '../../lib/data'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ASCIIshow: data.ASCIIshow,
    decimal: '',
    hexadecimal: '',
    eightadecimal: '',
    twoadecimal: '',
    ASCIInum: '',
    ASCIInum_show: '这里显示字符含义',
  },
  
  mytoString: function (N, op) {
    if (N == '') return '';
    return N.toString(op);
  },

  myparseInt: function (S, op) {
    if (S == '') return '';
    var timp = parseInt(S, op);
    if (isNaN(timp))return '';
    else return timp;
  },
  
  KeyInput: function (e) {
    //console.log(e)
    if(e.currentTarget.id === '10'){      //10->>2 8 16
      this.data.decimal= e.detail.value;
      var timp = this.data.decimal;
      this.data.hexadecimal = this.mytoString((timp * 1.0),16);
      this.data.eightadecimal = this.mytoString((timp * 1.0), 8);
      this.data.twoadecimal = this.mytoString((timp * 1.0), 2);
      this.data.ASCIInum = String.fromCharCode(timp) == String.fromCharCode('') ? '' : String.fromCharCode(timp);
    }

    if (e.currentTarget.id === '2') {      //2->>10 8 16
      this.data.twoadecimal= e.detail.value;
      var timp = this.data.twoadecimal;
      this.data.decimal = this.myparseInt(this.mytoString(timp), 2);
	    timp = this.data.decimal;
      this.data.eightadecimal = this.mytoString((timp * 1.0), 8);
      this.data.hexadecimal = this.mytoString((timp * 1.0), 16);
      this.data.ASCIInum = String.fromCharCode(timp) == String.fromCharCode('') ? '' : String.fromCharCode(timp);
    }

    if (e.currentTarget.id === '8') {      //8->>10 2 16
      this.data.eightadecimal= e.detail.value;
      var timp = this.data.eightadecimal;
      this.data.decimal = this.myparseInt(this.mytoString(timp), 8);
	    timp = this.data.decimal;
      this.data.hexadecimal = this.mytoString((timp * 1.0), 16);
	    this.data.twoadecimal = this.mytoString((timp * 1.0), 2);
      this.data.ASCIInum = String.fromCharCode(timp) == String.fromCharCode('') ? '' : String.fromCharCode(timp);
    }

    if (e.currentTarget.id === '16') {      //16->>10 8 2
      this.data.hexadecimal= e.detail.value;
      var timp = this.data.hexadecimal;
      this.data.decimal = this.myparseInt(this.mytoString(timp), 16);
	    timp = this.data.decimal;
      this.data.eightadecimal = this.mytoString((timp * 1.0), 8);
	    this.data.twoadecimal = this.mytoString((timp * 1.0), 2);
      this.data.ASCIInum = String.fromCharCode(timp) == String.fromCharCode('') ? '' : String.fromCharCode(timp);
    }

    //输出ASCII表值
    if (e.currentTarget.id === 'ASCII') {      //A->>10 8 2 16
      this.data.ASCIInum = e.detail.value;
      var timp = this.data.ASCIInum;
      if (timp.length < 2){
        this.data.decimal = timp.charCodeAt();
        timp = this.data.decimal;
        this.data.eightadecimal = this.mytoString((timp * 1.0), 8);
        this.data.twoadecimal = this.mytoString((timp * 1.0), 2);
        this.data.hexadecimal = this.mytoString((timp * 1.0), 16);
      }else{

      }
    }
    if (this.data.decimal != '')
      if (this.data.decimal >= 0 && this.data.decimal <= 127)
        this.data.ASCIInum_show = this.data.ASCIIshow[this.data.decimal];
      else
        this.data.ASCIInum_show = '请求超出127';
    else
      this.data.ASCIInum_show = '这里显示字符含义';
    this.setData(
      {
        decimal: this.data.decimal,
        eightadecimal: this.data.eightadecimal,
        hexadecimal: this.data.hexadecimal,
        twoadecimal: this.data.twoadecimal,
        ASCIInum: this.data.ASCIInum,
        ASCIInum_show: this.data.ASCIInum_show
      }
    )
  },

  emptied: function(){
    this.setData({
    decimal: '',

    hexadecimal: '',

    eightadecimal: '',

    twoadecimal: '',

    ASCIInum: '',

    ASCIInum_show: '这里显示字符含义',

  })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})