// pages/search/search.js
const AV = require('../../utils/av-live-query-weapp-min');
const Hero = require('../../model/hero');
const Hot = require('../../model/hot');
const ShenFen = require('../../model/shenfen');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyItems: [],
    hotItems: [],
    inputShowed: true,
    inputVal: ""
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  inputConfirm: function (e) {
    console.log(e.detail.value);
    console.log(this.data.historyItems);
    this.searchHero(e.detail.value);
  },

  queryHot: function () {
    wx.showNavigationBarLoading();
    var that = this;
    var query = new AV.Query(Hot);
    query.limit(10)
      .descending('COUNT')
      .find()
      .then(function (results) {
        that.setData({
          hotItems: results
        });
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh();
      })
      .catch(function (error) {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh();
      });
  },

  searchHero: function (item) {
    var tmp = this.data.historyItems;
    var index = tmp.indexOf(item);
    if (index >= 0) {
      tmp.splice(index, 1);
      tmp.splice(0, 0, item);
      if (tmp.length > 10) {
        tmp.pop();
      }
    }
    else {
      tmp.splice(0, 0, item);
      if (tmp.length > 10) {
        tmp.pop();
      }
    }
    console.log(item);
    var that = this;
    wx.setStorage({
      key: 'kHistorySearch',
      data: tmp,
      success: function (res) {
        that.setData({
          historyItems: tmp
        });
      }
    });

    var incrementQuery = new AV.Query(Hot);
    incrementQuery.equalTo('NAME', item);
    incrementQuery.find().then(function (results) {
      if (results.length > 0) {
        var hot = results[0];
        hot.increment('COUNT', 1);
        hot.save();
      }
      else {
        var hot = new Hot();
        hot.set('NAME', item);
        hot.set('COUNT', 0);
        hot.save().then(function (hot) {
          console.log('objectId is ' + hot.id);
        }, function (error) {
          console.error(error);
        });
      }
    });

    wx.showLoading({
      title: '搜索中...',
    });
    var heroQuery = new AV.Query(Hero);
    heroQuery.contains('NAME', item);
    // 内联查询
    var query = new AV.Query(ShenFen);
    query.matchesQuery('HERO', heroQuery);
    query.include("HERO");
    query.descending('updatedAt')
    query.limit(10);
    query.find()
      .then(function (results) {
        console.log(results);
        wx.hideLoading();
        that.hideInput();
        if (results.length > 0) {
          wx.navigateTo({
            url: '../list/list?heros=' + JSON.stringify(results),
          });
        }
        else {
          wx.showToast({
            title: '未查询到该武将相关信息',
            icon: 'none',
          });
        }
      })
      .catch(function (error) {
        that.hideInput();
        alert(JSON.stringify(error));
        wx.hideLoading();
      });
  },
  tapHotItem: function (options) {
    let item = options.currentTarget.dataset.item;
    console.log(item.NAME);
    this.searchHero(item.NAME);
  },
  tapHistoryItem: function (options) {
    let item = options.currentTarget.dataset.item;
    this.searchHero(item);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var value = wx.getStorageSync('kHistorySearch');
    if (value) {
      this.setData({
        historyItems: value
      });
    }
    this.queryHot();
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
    this.queryHot();
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
    return {
      title: '三国杀人物手册',
      desc: '发现更多的英雄~',
      path: '/pages/search/search'
    }
  }
})