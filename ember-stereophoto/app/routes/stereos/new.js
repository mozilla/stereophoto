// route/stereos/new.js

import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    // take left and right photo
    return new Ember.RSVP.Promise(function(resolve) {
      navigator.camera.getPicture(function(dataURL) {
        var left = dataURL;
        // XXX For some reason without timeout an error is returned
        Ember.run.later(function(){
          navigator.camera.getPicture(function(dataURL) {
            var right = dataURL;
            Ember.run.later(resolve, {
              'leftPhoto': left,
              'rightPhoto': right
            }, 500);
          }, function(err) {
            console.log('DEBUG: right', err);
          }, {destinationType: navigator.camera.DestinationType.FILE_URI});
        }, 500);
      }, function(err) {
        console.log('DEBUG: left', err);
      }, {destinationType: navigator.camera.DestinationType.FILE_URI});
    });
  },
  actions: {
    saveModel: function(photos) {
      console.log('aligned - saveModel now');
      var stereo = this.store.createRecord('stereo', {
        'date': new Date()
      });
      // render 
      stereo.render(photos);
      this.transitionTo('stereos.index');
    }
  }
});

