//app/adapters/application.js
import LFAdapter from 'ember-localforage-adapter/adapters/localforage';

export default LFAdapter.extend({
  namespace: 'stereos',
  caching: 'model'
});
