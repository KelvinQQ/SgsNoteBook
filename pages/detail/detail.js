// pages/detail/detail.js
const Hero = require('../../model/hero');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hero: null,
  },

  tapImage: function () {
    var that = this;
    wx.navigateTo({
      url: '../share/share?hero=' + JSON.stringify(that.data.hero),
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      hero: JSON.parse(options.hero)
    })
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
      desc: this.data.hero.HERO.NAME + this.data.hero.HERO.HORNER,
      path: '/pages/detail/detail?hero=' + JSON.stringify(this.data.hero)
    }
  }
})