import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement: function() {
    console.log('DEBUG: didInsertElement in component', this.$('hey'));
  },
  actions: {
    takePhoto: function() {
      console.log('action from component');
      // disable stream
      this.sendAction();
    }
  }
});

