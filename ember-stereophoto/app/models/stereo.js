// models/stereo.js

/* global DS */

export default DS.Model.extend({
  id: DS.attr('string'),     // identification used in storage
  image: DS.attr('string'),   // JPG data
  icon: DS.attr('string'),   // JPG data
  date: DS.attr('date'),     // date of image creation
  // gallery: belongsTo('gallery'),
  
  // rendered: Boolean (default) false * has the image been rendered
  init() {
    var id = this.get('id');
    if (!id) {
      console.log('DEBUG: creating from images');
    } else {
      this.getFromStorage();
    }
  }, 
  getFromStorage() {
    console.log('DEBUG: getFromStorage called');
    this.set('rendered', true);
  }
});
