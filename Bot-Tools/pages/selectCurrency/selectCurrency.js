//selectCurrency.js

var util = require('../../utils/util');

//获取应用实例
var app = getApp()
	Page({
	    data: {
	        allCurrencies: [],
	        selectCurrencyList:[],
	        highlightedId: 0,
	        rates: {},
	        cNames: {}
	    },
	    onLoad: function (options) {

	        console.log('selectCurrency: onLoad');

		    // 页面初始化 options为页面跳转所带来的参数
		    var rates = wx.getStorageSync('cRates');
		    var cNames = wx.getStorageSync('cNames');
		    var selected = wx.getStorageSync('selectCurrencyList');

		    this.setData({ "selectCurrencyList": selected });
		    this.setData({ "highlightedId": options.id });
		    this.setData({ "rates": rates });
		    this.setData({ "cNames": cNames });

		    var arr = [];
		    for (var n in rates) {

		        if (cNames[n]) {

		            var obj = {
		                currencyNameEN: n,
		                currencyNameCN: cNames[n]
		            };

		            obj.isSelected = this.isCurrencySelected(n);

		            arr.push(obj);
		        }
		    }

		    arr.sort(function (a, b) { return a.currencyNameCN > b.currencyNameCN; });

		    this.setData({ "allCurrencies": arr });
		},
		onReady : function () {
		    // 页面渲染完成
		},
		onShow : function () {
		    // 页面显示
		},
		onHide : function () {
			// 页面隐藏
		},
		onUnload : function () {
		    // 页面关闭
		    wx.setStorageSync('selectCurrencyList', this.data.selectCurrencyList);
		    wx.setStorageSync('highlightedId', this.data.highlightedId);
		},
		currencyClick: function (ev) {
		    var ds = ev.currentTarget.dataset;

		    if (ds.selected) {
		        wx.showModal({
		            title: '提示',
		            showCancel: false,
		            content: '该货币已经在所选列表中。'
		        });

		        return;
		    }

            //修改高亮货币的中文名、英文名
		    var baseCurIndex = this.data.highlightedId;
		    var obj = {};
		    obj["selectCurrencyList[" + baseCurIndex + "].currencyNameEN"] = ds.cid;
		    obj["selectCurrencyList[" + baseCurIndex + "].currencyNameCN"] = this.data.cNames[ds.cid];
		    this.setData(obj);

            //修改其他货币的金额
		    var fromCur = this.data.selectCurrencyList[baseCurIndex].currencyNameEN;
		    var rates = this.data.rates;
		    var fromValue = this.data.selectCurrencyList[baseCurIndex].currencyValue;

		    for (var i = 0; i < 4; i++) {
		        if (i != baseCurIndex) {
		            var toCur = this.data.selectCurrencyList[i].currencyNameEN;

		            var obj = {};
		            var toValue = fromValue * rates[toCur] / rates[fromCur];
		            obj["selectCurrencyList[" + i + "].currencyValue"] = util.formatCalResult(fromValue, toValue);
			            
		            this.setData(obj);
		        }
		    }
		    
		    wx.navigateBack();
		},

		isCurrencySelected: function (nameEN) {

		    for (var i = 0; i < 4; i++) {
		        if (this.data.selectCurrencyList[i].currencyNameEN == nameEN) {
		            return true;
		        }
		    }

            return false
		}

	})