// controllers/stereos/new.js
import Ember from 'ember';

export default Ember.Controller.extend({
  leftPhoto: null,
  rightPhoto: null,
  left: true,
  align: false,
  actions: {
    takeLeftPhoto: function() {
      // grab left photo from stream 
      // initiate taking the right one (from local or remote device)
      this.toggleProperty('left');
    },
    takeRightPhoto: function() {
      // stop the video stream
      this.toggleProperty('left');
      this.toggleProperty('align');
    },
    save: function() {
      this.toggleProperty('align');
      this.transitionToRoute('stereos.index');
    }
  }
});

