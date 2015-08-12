import Model, { attrs, hasMany } from "ember-data/model";

export default Model.extend({
  name: attrs('string'),
  stereos: hasMany('stereo')
});
