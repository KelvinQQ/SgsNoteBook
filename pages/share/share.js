// pages/share/share.js
const Hero = require('../../model/hero');
let Canvas = require('../../utils/canvas.js');

const BaseHeight = 320;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasWidth: 0,
    canvasHeight: BaseHeight,
    imageWidth: 0,
    imageHeight: 0,
    offsetY: 20,
    offsetX: 0,
    hero: null,
    showSave: false,
  },

  drawInfluence: function (ctx, text) {
    ctx.setFontSize(26);
    ctx.setFillStyle("#000000");
    let x = this.data.imageWidth + 35;
    this.setData({
      offsetX: x,
    });
    let y = this.data.offsetY + 10;
    console.log('drawName' + text);
    console.log(x);
    console.log(y);
    Canvas.drawTextVertical(ctx, text, x, y);
  },

  drawName: function (ctx, text) {
    ctx.setFontSize(26);
    ctx.setFillStyle("#000000");
    let x = this.data.offsetX;
    let y = this.data.offsetY + 50;
    console.log('drawName' + text);
    console.log(x);
    console.log(y);
    Canvas.drawTextVertical(ctx, text, x, y);
  },

  drawHorner: function (ctx, text) {
    ctx.setFontSize(26);
    ctx.setFillStyle("#000000");
    let x = this.data.offsetX + 35;
    let y = this.data.offsetY + 10;
    console.log('drawHorner' + text);
    console.log(x);
    console.log(y);
    Canvas.drawTextVertical(ctx, text, x, y);
  },

  downloadHeroImage: function () {
    wx.showLoading({
      title: '正在生成图片...',
    });

    let url = this.data.hero.HERO.ICON.replace(/http/, "https");
    var that = this;
    wx.downloadFile({
      url: url,
      success: function (res) {
        var path = res.tempFilePath;
        that.drawHeroImage(path);
      }, fail: function (res) {
        console.log(res)
      }
    });
  },
  drawHeroImage: function (path) {
    var that = this;
    let ctx = wx.createCanvasContext('share_canvas');
    wx.getImageInfo({
      src: path,
      success: function (res) {

        let maxWidth = Math.min(res.width, that.data.canvasWidth * 0.65);
        let radio = maxWidth / res.width;

        let offsetY = (that.data.canvasHeight - res.height * radio) / 2;
        console.log('offsetY=' + offsetY);
        that.setData({
          imageWidth: res.width * radio,
          imageHeight: res.height * radio,
          offsetY: offsetY,
        });

        ctx.setFillStyle('white')
        ctx.fillRect(0, 0, that.data.canvasWidth, that.data.canvasHeight);

        ctx.drawImage(path, 10, offsetY, res.width * radio, res.height * radio)
        that.drawQrCodeImage(ctx);
        that.drawInfluence(ctx, that.data.hero.HERO.INFLUENCE);
        that.drawName(ctx, that.data.hero.HERO.NAME);
        that.drawHorner(ctx, that.data.hero.HERO.HORNER);
        ctx.draw();
      }
    });
  },

  drawQrCodeImage: function (ctx) {
    console.log('drawQrCodeImage');
    let QRCodeWidth = 60;
    ctx.drawImage('../../resource/qr_code.jpg', this.data.imageWidth + 20, this.data.imageHeight + this.data.offsetY - QRCodeWidth, QRCodeWidth, QRCodeWidth);
    wx.hideLoading();
    this.setData({
      showSave: true
    });
  },

  saveShareImage: function () {
    wx.showLoading({
      title: '正在保存图片..',
    });
    let that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: that.data.canvasWidth,
      height: that.data.canvasHeight,
      canvasId: 'share_canvas',
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            console.log(res);
            wx.showToast({
              title: '保存到相册成功',
              duration: 1500,
            })
            setTimeout(function () {
              wx.navigateBack({
              });
            }, 1800);
          },
          fail(res) {
            console.log(res)
            wx.showToast({
              title: '保存到相册失败',
              icon: 'fail'
            })
          },
          complete(res) {
            console.log(res)
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hero: JSON.parse(options.hero)
    });

    try {
      var res = wx.getSystemInfoSync();
      this.setData({
        canvasWidth: res.windowWidth,
        canvasHeight: 320 / BaseHeight * res.windowWidth,
      })
      console.log(res);
    } catch (e) {
      // Do something when catch error
    }

    this.downloadHeroImage();
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

})