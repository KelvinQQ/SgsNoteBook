// pages/list/list.js

const AV = require('../../utils/av-live-query-weapp-min');
const Hero = require('../../model/hero');
const ShenFen = require('../../model/shenfen');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    heros: [],
    page: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.heros);
    var list = JSON.parse(options.heros);
    this.setData({
      heros: list
    });
  },

  tapHeroItem: function (options) {
    let item = options.currentTarget.dataset.choose_item
    console.log(JSON.stringify(item));
    wx.navigateTo({
      url: '../detail/detail?hero=' + JSON.stringify(item),
    });
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
    return {
      title: '三国杀人物手册',
      desc: '卧龙凤雏，得一可得天下~',
      path: '/pages/list/list?heros=' + JSON.stringify(this.data.heros)
    }
  }
})