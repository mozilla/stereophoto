// controllers/stereos.js

import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ['created'],
  sortAscending: false,
  itemController: 'stereo'
});
