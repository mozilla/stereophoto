// controllers/stereos/stereo.js
import Ember from 'ember';

// pass info about display mode
export default Ember.Controller.extend({
  anaglyph: true,
  actions: {
    toggleAnaglyph: function() {
      this.set('anaglyph', !this.get('anaglyph'));
    }
  }
});
