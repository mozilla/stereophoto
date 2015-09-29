// controllers/stereos.js

import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ['date'],
  sortAscending: false,
  itemController: 'stereo'
});
