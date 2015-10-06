// route/stereos/stereo.js

import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var self = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      self.get('store').find('stereo', params.id).then(function(stereo) {
        stereo.getImage('left').then(function(leftSrc) {
          console.log(leftSrc);
          stereo.getImage('right').then(function(rightSrc) {
            stereo.getImage('anaglyph').then(function(anaglyphSrc) {
              resolve({
                'stereo': stereo,
                'left': leftSrc,
                'right': rightSrc,
                'anaglyph': anaglyphSrc});
            }, function(e) {
              console.error('ERROR: error while getting anaglyph from storage', e);
            });
          }, function(e) {
            console.error('ERROR: error while getting right image from storage', e);
            reject();
          });
        }, function(e) {
          console.error('ERROR: error while getting left image from storage', e);
          reject();
        });
      });
    });
  },
  anaglyph: true,
  serialize: function(model){
    return {id: model.id};
  }
});

