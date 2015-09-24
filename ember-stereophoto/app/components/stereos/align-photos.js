// components/stereos/align.js
import Ember from 'ember';


function _makePhotoObject(image, element, position) {
  return {
    image: image,
    inWrapPosition: position,
    wrapSize: {
      width: element.get('width'),
      height: element.get('hight')
    }
  };
}


export default Ember.Component.extend({
  positionLeft: { x: 0, y: 0 },
  positionRight: { x: 0, y: 0 },

  didInsertElement: function() {
  },

  actions: {
    save: function(photos, positionLeft, positionRight) {
      var left = this.$('position-left');
      var right = this.$('position-right');
      var alignedPhotos = {
        left: _makePhotoObject(photos.leftPhoto, left, positionLeft),
        right: _makePhotoObject(photos.rightPhoto, right, positionRight),
      };
      var screen;
      // send action to the router
      this.sendAction('action', alignedPhotos, screen);
    }
  }
});
