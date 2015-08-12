import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

var StereoPhoto;

Ember.MODEL_FACTORY_INJECTIONS = true;

StereoPhoto = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

loadInitializers(StereoPhoto, config.modulePrefix);

export default StereoPhoto;
