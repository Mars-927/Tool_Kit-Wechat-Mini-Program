//main.js

var util = require('../../utils/util');
var Parser = require('../../utils/parser').Parser;

//获取应用实例
var app = getApp()
	Page({
	    data: {
	        idb: "back",
	        idc: "clear",
	        idadd: "＋",
	        id9: "9",
	        id8: "8",
	        id7: "7",
	        idj: "－",
	        id6: "6",
	        id5: "5",
	        id4: "4",
	        idx: "×",
	        id3: "3",
	        id2: "2",
	        id1: "1",
	        iddiv: "÷",
	        id0: "0",
	        idd: ".",
	        ide: "＝",
	        screenData: "0",
            calResult: 0.0,
	        operaSymbo: {
	            "＋": "+",
	            "－": "-",
	            "×": "*",
	            "÷": "/",
	            ".": "."
	        },
	        lastIsOperaSymbo: false,
	        selectCurrencyList: [],
	        highlightedId: 0,
	        rates: {},
	        arr: [],
	        logs: []
	    },
		onLoad : function (options) {

		    var rates = wx.getStorageSync('cRates');
		    this.setData({ "rates": rates });
		},
		onShow : function () {
		    // 页面显示
		    var selectCurrencyList = wx.getStorageSync('selectCurrencyList');
		    var highlightedId = wx.getStorageSync('highlightedId') ;
		    
		    this.setData({ "selectCurrencyList": selectCurrencyList });
		    this.setData({ "highlightedId": highlightedId });

		    var screenData = this.data.selectCurrencyList[this.data.highlightedId].currencyValue;
		    this.setData({ "screenData": screenData.toString() });
		    this.setData({ "calResult": screenData });
		},
		onHide : function () {
		    // 页面隐藏
		    console.log('onHide');

            //存起来，给selectCurrency页面使用
		    wx.setStorageSync('selectCurrencyList', this.data.selectCurrencyList);
		},
		onUnload : function () {
		    // 页面关闭
		    console.log('onUnload');
		    wx.setStorageSync('highlightedId', this.data.highlightedId);
		},
		currencyClick: function (event) {
		    
		    //由于点击发生在currency-group内部的view上，
		    //所以這里用event.currentTarget，而不是event.target
		    var id = parseInt(event.currentTarget.dataset.cid, 10);
		    if (id === this.data.highlightedId) {
		        return;
		    }

		    //切换当前选中的货币，同时做一些清理工作
		    this.data.selectCurrencyList[this.data.highlightedId].currencyCal = "";
		    this.setData({ "highlightedId": id });

		    var newHighlight = this.data.selectCurrencyList[this.data.highlightedId];
		    this.setData({ "screenData": newHighlight.currencyValue.toString() });
		    this.setData({ "calResult": newHighlight.currencyValue.toString() });

		    //console.log('currencyClick');
		},
		updateCurrencyList: function (event) {

		    //console.log('updated!');

		    var baseCurIndex = this.data.highlightedId;
		    var fromCur = this.data.selectCurrencyList[baseCurIndex].currencyNameEN;
		    var rates = this.data.rates;

		    var reg = /＋|－|×|÷/;

		    for (var i = 0; i < 4; i++) {
		        if (i == baseCurIndex) {
		            var obj = {};
		            obj["selectCurrencyList[" + i + "].currencyValue"] = this.data.screenData.search(reg) > -1 ? this.data.calResult : this.data.screenData;
		            obj["selectCurrencyList[" + i + "].currencyCal"] = this.data.screenData.search(reg) > -1 ? this.data.screenData : "";
		            this.setData(obj);
		        } else {
		            
		            var toCur = this.data.selectCurrencyList[i].currencyNameEN;

		            var obj = {};
		            var toValue = this.data.calResult * rates[toCur] / rates[fromCur];
		            obj["selectCurrencyList[" + i + "].currencyValue"] = util.formatCalResult(this.data.calResult, toValue);
		            obj["selectCurrencyList[" + i + "].currencyCal"] = "";

		            this.setData(obj);
		        }
		    }
		},
		clickBtn: function (event) {
		    
		    var id = event.target.id;

			if (id == this.data.idb) { //退格←
				var data = this.data.screenData;
				if (data == "0") {
					return;
				}

				data = data.substring(0, data.length - 1);
				if (data == "" || data == "－") {
					data = "0";
				}

				this.setData({
					"screenData" : data,
				    "calResult": this.cal(data)
				});
				
			}  else {
				if (this.data.operaSymbo[id]) { //如果是符号+-x*./
				    if (this.data.lastIsOperaSymbo) {
				        return;
				    }

				    if (id == this.data.idd && !this.canAppendDot(this.data.screenData)) {
				        return;
				    }
				}

				if (!this.data.operaSymbo[id] && this.isMaxDecLength()) {
				    wx.showModal({
				        title: '提示',
				        showCancel: false,
				        content: '最多只能输入4位小数。'
				    });

				    return;
				}

				var sd = this.data.screenData;
				var data;
				if (sd == "0"&&id == this.data.idd) {
				    data = sd + id;
				} else if (sd == "0") {
				    data = id;
				} else {
				    data = sd + id;
				}

				if (this.data.operaSymbo[id]) {
				    this.setData({
				        "screenData" : data,
						"lastIsOperaSymbo" : true
					});
				} else {
				    this.setData({
				        "screenData" : data,
				        "lastIsOperaSymbo": false,
				        "calResult": this.cal(data)
				    });
				}
			}

			this.updateCurrencyList();
		},
		clear: function (event) {

		    var id = event.target.id;
		    var data = this.data.screenData;

		    if (id == this.data.idb && data != "0") { //退格←
		        data = "0";

		        this.setData({
		            "screenData": data,
		            "calResult": this.cal(data)
		        });

		        this.updateCurrencyList();
		    }
		},
		cal: function (screenData) {
		    screenData = screenData.toString();

		    if (screenData == "0") {
		        return 0;
		    }

            //先移除尾部的符号
		    var regSymbolEnd = /(＋|－|×|÷|\.)$/
		    var data = screenData.replace(regSymbolEnd, "");

            //再替换中文符号为英文符号
		    data = data.replace(/＋/g, "+");
		    data = data.replace(/－/g, "-");
		    data = data.replace(/×/g, "*");
		    data = data.replace(/÷/g, "/");

            //最后计算
		    var result = Parser.evaluate(data, { x: 7 });

		    console.log("cal:" + result);

		    return util.formatCalResult(null, result);
		},
		canAppendDot: function (screenData) {
		    var regSymbol = /＋|－|×|÷/;
		    var arr = screenData.split(regSymbol);

		    if (arr[arr.length - 1].indexOf(".") > -1) {
		        return false;
		    }

		    return true;
		},
		isMaxDecLength: function () {
		    var regSymbol = /＋|－|×|÷/;
		    var arr = this.data.screenData.split(regSymbol);

		    if (arr[arr.length - 1].indexOf(".") > -1) {
		        return arr[arr.length - 1].split('.')[1].length > 3;
		    }

		    return false;
		},
		selectCurrency: function (ev) {
            //longtap处理事件
		    console.log('selectCurrency');
		    wx.navigateTo({
		        url: '../selectCurrency/selectCurrency?id=' + ev.currentTarget.dataset.cid
		    });
		}
	})