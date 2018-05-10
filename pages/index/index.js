//index.js

const AV = require('../../utils/av-live-query-weapp-min');
const Hero = require('../../model/hero');
const ShenFen = require('../../model/shenfen');

Page({
  data: {
    heros: [],
    page: 0,
  },

  onLoad: function () {
    this.queryHero();
  },
  tapHeroItem: function (options) {
    // var that = this;
    // var query = new AV.Query(Hero);
    // query.limit(1);
    // query.skip(21);
    // query.equalTo("ICON", "");
    // query.find()
    //   .then(function (results) {
    //     console.log(results);
    //     var item = results[0];
    //     console.log(item.name);
    //     var tt = new AV.Query(AV.File);
    //     if (item.bag == "界限突破") {
    //       tt.startsWith('name', '界' + item.name);
    //     }
    //     else {
    //       tt.startsWith('name', item.name);
    //     }
    //     tt.find().then(function (results) {
    //       console.log(results[0].url());
    //       item.set('ICON', results[0].url());
    //       console.log(item);
    //       item.save();
    //     }).catch(function (error) {
    //       alert(JSON.stringify(error));
    //     });
    //   })
    //   .catch(function (error) {
    //     alert(JSON.stringify(error));
    //     wx.hideNavigationBarLoading()
    //     wx.stopPullDownRefresh();
    //   });
    // return;
    let item = options.currentTarget.dataset.choose_item
    console.log(JSON.stringify(item));
    wx.navigateTo({
      url: '../detail/detail?hero=' + JSON.stringify(item),
    });
  },
  queryHero: function () {
    var that = this;
    wx.showNavigationBarLoading();
    var query = new AV.Query(ShenFen);
    query.include("HERO");
    query.descending('updatedAt')
    query.limit(10);
    query.skip(this.data.page * 10);
    query.find()
      .then(function (results) {
        console.log(results);
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh();
        if (that.data.page == 0) {
          console.log(results);
          that.setData({ heros: results });
        }
        else {
          var tmp = that.data.heros.concat(results);
          console.log(tmp);
          that.setData({ heros: tmp });
        }
      })
      .catch(function (error) {
        alert(JSON.stringify(error));
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh();
      });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      page: 0
    });
    this.queryHero();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let page = ++this.data.page;
    this.setData({
      page: page
    })
    this.queryHero();
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
