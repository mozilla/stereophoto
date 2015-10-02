// route/stereos/new.js

import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    // take left and right photo
    return new Ember.RSVP.Promise(function(resolve, reject) {
      navigator.camera.getPicture(function(dataURL) {
        var left = dataURL;
        // XXX For some reason an error is returned if no timeout 
        Ember.run.later(function(){
          navigator.camera.getPicture(function(dataURL) {
            var right = dataURL;
            // XXX no image from camera if no timeout
            Ember.run.later(resolve, {
              'leftPhoto': left,
              'rightPhoto': right
            }, 500);
          }, function(err) {
            console.error('DEBUG: right', err);
            reject();
          }, {destinationType: navigator.camera.DestinationType.FILE_URI});
        }, 500);
      }, function(err) {
        console.error('DEBUG: left', err);
        reject();
      }, {destinationType: navigator.camera.DestinationType.FILE_URI});
    });
  },

  actions: {
    saveModel: function(photos, screen) {
      console.log('DEBUG: saveModel');
      var self = this;
      var stereo = this.store.createRecord('stereo', {
        'date': new Date()
      });
      // render 
      stereo.render(photos, screen).then(function() {
        // save stereo model in localforage
        console.debug('DEBUG: stereo save');
        stereo.save().then(function (){
          console.debug('DEBUG: stereo saved, id:', stereo.id);
        }, function() {
          console.error('DEBUG: FAILED saving stereo');
        });
        // go to gallery after rendering, but before actual save
        self.transitionTo('stereos.index');
      });
    },
    cancelModel: function() {
      this.transitionTo('stereos.index');
    }
  }
});

