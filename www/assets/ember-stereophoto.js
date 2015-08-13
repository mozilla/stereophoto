"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('ember-stereophoto/acceptance-tests/main', ['exports', 'ember-cli-sri/acceptance-tests/main'], function (exports, main) {

	'use strict';



	exports['default'] = main['default'];

});
define('ember-stereophoto/adapters/stereo', ['exports', 'ember-localforage-adapter/adapters/localforage'], function (exports, LFAdapter) {

  'use strict';

  //app/adapters/application.js
  exports['default'] = LFAdapter['default'].extend({
    namespace: 'stereos',
    caching: 'model'
  });

});
define('ember-stereophoto/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'ember-stereophoto/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var StereoPhoto;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  StereoPhoto = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](StereoPhoto, config['default'].modulePrefix);

  exports['default'] = StereoPhoto;

});
define('ember-stereophoto/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'ember-stereophoto/config/environment'], function (exports, AppVersionComponent, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = AppVersionComponent['default'].extend({
    version: version,
    name: name
  });

});
define('ember-stereophoto/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('ember-stereophoto/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('ember-stereophoto/controllers/stereos', ['exports'], function (exports) {

  'use strict';

  /* global Ember */

  // controllers/stereos.js
  exports['default'] = Ember.Controller.extend({
    appName: 'Gallery'
  });

});
define('ember-stereophoto/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ember-stereophoto/config/environment'], function (exports, initializerFactory, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = {
    name: 'App Version',
    initialize: initializerFactory['default'](name, version)
  };

});
define('ember-stereophoto/initializers/export-application-global', ['exports', 'ember', 'ember-stereophoto/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  ;

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('ember-stereophoto/models/gallery', ['exports', 'ember-data/model'], function (exports, model) {

  'use strict';

  exports['default'] = model['default'].extend({
    name: model.attrs('string'),
    stereos: model.hasMany('stereo')
  });

});
define('ember-stereophoto/models/stereo', ['exports'], function (exports) {

  'use strict';

  // models/stereo.js

  /* global DS */

  exports['default'] = DS.Model.extend({
    id: DS.attr('string'), // identification used in storage
    image: DS.attr('string'), // JPG data
    icon: DS.attr('string'), // JPG data
    date: DS.attr('date'), // date of image creation
    // gallery: belongsTo('gallery'),

    // rendered: Boolean (default) false * has the image been rendered
    init: function init() {
      var id = this.get('id');
      if (!id) {
        console.log('DEBUG: creating from images');
      } else {
        this.getFromStorage();
      }
    },
    getFromStorage: function getFromStorage() {
      console.log('DEBUG: getFromStorage called');
      this.set('rendered', true);
    }
  });

});
define('ember-stereophoto/router', ['exports', 'ember', 'ember-stereophoto/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.resource('stereos');
  });

  exports['default'] = Router;

});
define('ember-stereophoto/routes/application', ['exports'], function (exports) {

    'use strict';

    /* global Ember */

    exports['default'] = Ember.Route.extend({
        redirect: function redirect() {
            this.transitionTo('stereos');
        }
    });

});
define('ember-stereophoto/routes/stereos', ['exports'], function (exports) {

  'use strict';

  /* global Ember */

  // route/stereos.js
  exports['default'] = Ember.Route.extend({
    model: function model() {
      return this.get('store').findAll('stereo');
    }
  });

});
define('ember-stereophoto/templates/stereos', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "ember-stereophoto/templates/stereos.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("interesting");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),0,0);
        morphs[1] = dom.createMorphAt(fragment,4,4,contextualElement);
        return morphs;
      },
      statements: [
        ["content","appName",["loc",[null,[1,4],[1,15]]]],
        ["content","outlet",["loc",[null,[3,0],[3,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('ember-stereophoto/tests/adapters/stereo.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/stereo.js should pass jshint', function() { 
    ok(true, 'adapters/stereo.js should pass jshint.'); 
  });

});
define('ember-stereophoto/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('ember-stereophoto/tests/controllers/stereos.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/stereos.js should pass jshint', function() { 
    ok(true, 'controllers/stereos.js should pass jshint.'); 
  });

});
define('ember-stereophoto/tests/helpers/resolver', ['exports', 'ember/resolver', 'ember-stereophoto/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('ember-stereophoto/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('ember-stereophoto/tests/helpers/start-app', ['exports', 'ember', 'ember-stereophoto/app', 'ember-stereophoto/config/environment'], function (exports, Ember, Application, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('ember-stereophoto/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('ember-stereophoto/tests/models/gallery.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/gallery.js should pass jshint', function() { 
    ok(true, 'models/gallery.js should pass jshint.'); 
  });

});
define('ember-stereophoto/tests/models/stereo.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/stereo.js should pass jshint', function() { 
    ok(true, 'models/stereo.js should pass jshint.'); 
  });

});
define('ember-stereophoto/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('ember-stereophoto/tests/routes/application.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/application.js should pass jshint', function() { 
    ok(true, 'routes/application.js should pass jshint.'); 
  });

});
define('ember-stereophoto/tests/routes/stereos.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/stereos.js should pass jshint', function() { 
    ok(true, 'routes/stereos.js should pass jshint.'); 
  });

});
define('ember-stereophoto/tests/test-helper', ['ember-stereophoto/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('ember-stereophoto/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('ember-stereophoto/config/environment', ['ember'], function(Ember) {
  var prefix = 'ember-stereophoto';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("ember-stereophoto/tests/test-helper");
} else {
  require("ember-stereophoto/app")["default"].create({"name":"ember-stereophoto","version":"0.0.0+58f253bb"});
}

/* jshint ignore:end */
//# sourceMappingURL=ember-stereophoto.map