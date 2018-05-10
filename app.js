//app.js

const AV = require('./utils/av-live-query-weapp-min');

AV.init({
  appId: 'GzYb4gy2KjPj6i9aBDGTi8ks-gzGzoHsz',
  appKey: 'sNd4nb0SFiXcWVsVHSgNNlNR',
});


App({
  globalData: {
    userInfo: null
  },

  login: function () {
    return AV.Promise.resolve(AV.User.current()).then(user =>
      user ? (user.isAuthenticated().then(authed => authed ? user : null)) : null
    ).then(user => user ? user : AV.User.loginWithWeapp()).catch(error => console.error(error.message));
  },

  onLaunch: function () {
    this.login();
  }
})