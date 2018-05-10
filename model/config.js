const AV = require('../utils/av-live-query-weapp-min');

class Config extends AV.Object {
  get packages() { return this.get('CATEGORY_PACKAGE'); }

}
AV.Object.register(Config, 'T_CONFIG');

module.exports = Config;