import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('stereo', 'Unit | Model | stereo', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

test('it saves and finds', function(assert) {
  var store = this.store();  
  Ember.run(function() {
    store.push('stereo', {
      'id': 1,
      'image': 'test image',
      'icon': 'test icon'
    });
    var stereos = store.all('stereo');
    assert.equal(stereos.getEach('id').length, 1);

    store.findRecord('stereo', 1).then(function(record) {
      assert.equal(record.get('image'), 'test image');
    });
  });
});

test('it saves more than one', function(assert) {
  var store = this.store();  
  Ember.run(function() {
    store.push('stereo', {
      'id': 1,
      'image': 'test image',
      'icon': 'test icon'
    });
    store.push('stereo', {
      'id': 2,
      'image': 'test image',
      'icon': 'test icon'
    });
    var stereos = store.all('stereo');
    assert.equal(stereos.getEach('id').length, 2);
  });
});
