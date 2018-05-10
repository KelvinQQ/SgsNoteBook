const AV = require('../utils/av-live-query-weapp-min');

class Hot extends AV.Object {
  get name() { return this.get('NAME'); }

  get count() { return this.get('COUNT'); }
}
AV.Object.register(Hot, 'T_HOT_SEARCH');

module.exports = Hot;