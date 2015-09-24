// models/stereo.js
import DS from 'ember-data';

/**
 * render a small icon and return the blob
 */
function renderIcon(photo) {
  console.log('renderIcon', photo);
}


/**
 * render a stereopair
 */
function renderImage(photos) {
  console.log('renderImage', photos);
}


export default DS.Model.extend({
  // id: DS.attr('string'),     // identification used in storage
  image: DS.attr('string'),   // JPG data
  icon: DS.attr('string'),   // JPG data
  date: DS.attr('date'),     // date of image creation
  // gallery: belongsTo('gallery'),
  render: function(photos) {
    this.set('icon', renderIcon(photos.left.image));
    this.set('image', renderImage(photos));
  }
});
