// models/stereo.js

import DS from 'ember-data';

export default DS.Model.extend({
  // id: DS.attr('string'),     // identification used in storage
  image: DS.attr('string'),   // JPG data
  icon: DS.attr('string'),   // JPG data
  date: DS.attr('date'),     // date of image creation
  // gallery: belongsTo('gallery'),
  
});
