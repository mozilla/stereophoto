// route/stereos/index.js

import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var stereos = this.get('store').all('stereo');
    console.log('DEBUG index route', stereos);
    return stereos;
  }
});
