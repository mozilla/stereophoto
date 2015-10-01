// models/stereo.js
import DS from 'ember-data';


export default DS.Model.extend({
  // id: DS.attr('string'),     // identification used in storage
  left: DS.attr('string'),      // JPG data
});
