import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('stereos', function() {
    //this.route('new-right-local');
    this.route('first-run');
    this.route('index');
    this.route('new');
    this.route('stereo', {path: ":id"});
  });
});

export default Router;
