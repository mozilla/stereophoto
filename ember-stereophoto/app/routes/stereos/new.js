// route/stereos/new.js

import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    // take left and right photo
    return new Ember.RSVP.Promise(function(resolve) {
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
            console.log('DEBUG: right', err);
          }, {destinationType: navigator.camera.DestinationType.FILE_URI});
        }, 500);
      }, function(err) {
        console.log('DEBUG: left', err);
      }, {destinationType: navigator.camera.DestinationType.FILE_URI});
    });
  },

  actions: {
    saveModel: function(photos, screen) {
      var stereo = this.store.createRecord('stereo', {
        'date': new Date()
      });
      // render 
      stereo.render(photos, screen);
      // save stereo model in localforage
      stereo.save();
      // this.store.push({
      //   'type': 'stereo',
      //   'id': 1,
      //   'attributes': {
      //     'image': stereo.image,
      //     'icon': stereo.icon,
      //     'date': stereo.date
      //   }});
      // go to gallery
      this.transitionTo('stereos.index');
    }
  }
});

