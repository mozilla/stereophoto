//app/adapters/stereo.js
import LFAdapter from 'ember-localforage-adapter/adapters/localforage';

export default LFAdapter.extend({
  namespace: 'stereos',
  caching: 'model' // 'model' took too much time while retrieveing icons
});
