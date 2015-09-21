import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement: function() {
    // show video stream in <video> element
    var v = document.getElementById('video-stream');
    navigator.getMedia = (navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia);
    var self = this;
    navigator.getMedia( 
      {video: true, audio: false},
      function(stream) {
        self.set('stream', stream);
        if (navigator.mozGetUserMedia) {
          v.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          v.src = vendorURL.createObjectURL(stream);
        }
        v.play();
      },
      function(err) {
        console.log("An error occured! " + err);
      }
    );

    // video.addEventListener('canplay', function(ev){
      // there might be a way to get resolution from this
    // }, false);
  },
  actions: {
    takePhoto: function() {
      console.log('DEBUG: taking the photo in component');
      var video = document.getElementById('video-stream');
      //var canvas = document.getElementById('offscreen-canvas');
      //var width = video.width;
      //console.log('DEBUG: videoElementWidth', width, 'videoWidth', video.videoWidth);
      //var data = canvas.toDataURL('image/png');
      // disable stream
      video.src = '';
      this.get('stream').stop();
      this.sendAction();
    }
  }
});

