// controllers/stereos/stereo.js
import Ember from 'ember';

// pass info about display mode
export default Ember.Controller.extend({
  anaglyph: true,
  actions: {
    toggleAnaglyph: function() {
      this.set('anaglyph', !this.get('anaglyph'));
    },
    remove: function() {
      var debugTime = new Date().getTime();
      this.model.destroyRecord().then(function() {
        console.debug('DEBUG: stereo removed, execution time:', 
                      new Date().getTime() - debugTime);
      }, function() {
        console.error('ERROR: failed to remove the stereo record');
      });
      this.transitionToRoute('stereos.index');
    }
  }
});
