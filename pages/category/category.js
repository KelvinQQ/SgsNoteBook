// pages/category/category.js
const AV = require('../../utils/av-live-query-weapp-min');
const Hero = require('../../model/hero');
const ShenFen = require('../../model/shenfen');
const Config = require('../../model/config');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    influenceItems: ['魏', '蜀', '吴', '群', '神'],
    packageItems: ['标准', '风', '火', '山', '林']
  },

  queryPackage: function () {
    wx.showNavigationBarLoading();
    let that = this;
    var query = new AV.Query(Config);
    query.descending('updatedAt')
    query.get('5af30cb117d009744e6a8ccd').then(function (config) {
      wx.hideNavigationBarLoading();
      that.setData({
        packageItems: config.packages
      })
    }, function (error) {
      wx.hideNavigationBarLoading();
    });
  },

  queryHero: function (key, value) {
    wx.showLoading({
      title: '搜索中...',
    });
    var heroQuery = new AV.Query(Hero);
    heroQuery.equalTo(key, value);
    // 内联查询
    var query = new AV.Query(ShenFen);
    query.matchesQuery('HERO', heroQuery);
    query.include("HERO");
    query.descending('updatedAt')
    query.limit(100);
    query.find()
      .then(function (results) {
        console.log(results);
        wx.hideLoading();
        if (results.length > 0) {
          wx.navigateTo({
            url: '../list/list?heros=' + JSON.stringify(results),
          });
        }
        else {
          wx.showToast({
            title: '未查询到相关信息',
            icon: 'none',
          });
        }
      })
      .catch(function (error) {
        alert(JSON.stringify(error));
        wx.hideLoading();
      });
  },

  tapPackageItem: function (options) {
    let item = options.currentTarget.dataset.item;
    this.queryHero('PACKAGE', item);

  },

  tapInfluenceItem: function (options) {
    let item = options.currentTarget.dataset.item;
    this.queryHero('INFLUENCE', item);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryPackage();
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
      path: '/pages/index/index'
    }
  }
})