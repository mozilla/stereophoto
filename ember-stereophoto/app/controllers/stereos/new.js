// controllers/stereos/new.js
import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save: function() {
      this.toggleProperty('align');
      this.transitionToRoute('stereos.index');
    }
  }
});

