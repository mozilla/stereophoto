// controllers/stereos.js

import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['created'],
  sortAscending: false,
  itemController: 'stereo'
});
