const AV = require('../utils/av-live-query-weapp-min');

class Hero extends AV.Object {
  get name() { return this.get('NAME'); }

  get skin() { return this.get('SKIN'); }

  get lifetime() { return this.get('LIFETIME'); }

  get icon() { return this.get('ICON'); }
  set icon(val) { this.set('ICON', val); }

  get influence() { return this.get('INFLUENCE'); }

  get horner() { return this.get('HORNER'); }

  get bag() { return this.get('PACKAGE'); }


}
AV.Object.register(Hero, 'T_HERO_BASIC');

module.exports = Hero;