// components/stereos/align.js
import Ember from 'ember';


function _makePhotoObject(image, element, position) {
  return {
    image: image,
    inWrapPosition: position,
    wrapSize: {
      width: element.clientWidth,
      height: element.clientHeight
    },
    naturalSize: {
      width: element.naturalWidth,
      height: element.naturalHeight
    }
  };
}


export default Ember.Component.extend({
  positionLeft: { x: 0, y: 0 },
  positionRight: { x: 0, y: 0 },

  didInsertElement: function() {
  },

  actions: {
    cancel: function() {
      this.sendAction('cancelModel');
    },
    save: function(photos, positionLeft, positionRight) {
      console.log('DEBUG: save');
      // prepare data
      var left = document.getElementById('position-left');
      var right = document.getElementById('position-right');
      var alignedPhotos = {
        left: _makePhotoObject(photos.leftPhoto, left, positionLeft),
        right: _makePhotoObject(photos.rightPhoto, right, positionRight),
      };
      var screen = {
        width: window.innerWidth,
        height: window.innerHeight
      };
       
      // send save action to the router
      this.sendAction('action', alignedPhotos, screen);
    }
  }
});
