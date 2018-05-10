const AV = require('../utils/av-live-query-weapp-min');

class ShenFen extends AV.Object {
  get hero() { return this.get('HERO'); }

  get skill() { return this.get('SKILL'); }

  get feature() { return this.get('FEATURE'); }

  get health() { return this.get('HEALTH'); }

  get influence() { return this.get('INFLUENCE'); }

}
AV.Object.register(ShenFen, 'T_SHENFEN_HERO');

module.exports = ShenFen;