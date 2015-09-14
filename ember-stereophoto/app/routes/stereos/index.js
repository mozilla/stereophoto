// route/stereos.js

import Ember from 'ember';

export default Ember.Route.extend({
  stereos: function() {
    return this.get('store').all('stereo');
  }
});
