// controllers/stereos/stereo.js
import Ember from 'ember';

// pass info about display mode
export default Ember.Controller.extend({
  anaglyphMode: false,
  actions: {
    toggleAnaglyph: function() {
      this.set('anaglyphMode', !this.get('anaglyphMode'));
    },
    remove: function() {
      var debugTime = new Date().getTime();
      this.model.stereo.remveRecordAndImages().then(function() {
        console.debug('DEBUG: stereo removed, execution time:', 
                      new Date().getTime() - debugTime);
      }, function() {
        console.error('ERROR: failed to remove the stereo record');
      });
      // go to gallery before record has been deleted from storage
      this.transitionToRoute('stereos.index');
    }
  }
});
