// models/stereo.js
import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  // id: DS.attr('string'),     // identification used in storage
  left: DS.attr('string'),      // JPG data
  right: DS.attr('string'),     // JPG data
  anaglyph: DS.attr('string'),  // JPG data
  icon: DS.attr('string'),      // JPG data
  date: DS.attr('date'),        // date of image creation
  // gallery: belongsTo('gallery'),

  render: function(photos) {
    var self = this;
    return new Ember.RSVP.Promise(function(resolve) {
      self.set('icon', renderIcon(photos.left));
      self.assignPhotos(photos).then(function() {
        self.renderAnaglyph().then(function() {
          resolve();
        });
      });
    });
  },

  assignPhotos(photos) {
    var self = this;
    return new Ember.RSVP.Promise(function(resolve) {
      var lW = photos.left.naturalSize.width;
      var rW = photos.right.naturalSize.width;
      // XXX assuming both images are in portrait mode
      // TODO rotate image if not in portrait mode
      // TODO calculate and store the shift based on alignment
      // target width
      var tW = Math.min(lW, rW);
      // which image is the ratio one
      if (lW === tW) {
        self.set('left', photos.left.image);
        console.debug('DEBUG: resizing right photo');
        resizeImage(photos.right, tW).then(function(image) {
          self.set('right', image);
          resolve();
        });
      } else {
        self.set('right', photos.right.image);
        console.debug('DEBUG: resizing left photo');
        resizeImage(photos.left, tW).then(function(image) {
          self.set('left', image);
          resolve();
        });
      }
    });
  },

  /**
   * render an anaglyph
   */
  renderAnaglyph: function() {
    var self = this;
    // XXX Promise only because it's gonna be used as serviceWorker in the
    // future
    return new Ember.RSVP.Promise(function(resolve, reject) {
      // XXX this currently does not allow to align the pictures!!!
      // Images are already resized
      console.debug('DEBUG: rendering the anaglyph');
      // TODO render the anaglyph only if it's needed (export or display)
      var left = new Image();
      var right = new Image();
      new Ember.RSVP.Promise(function(resolveImgLoad, rejectImgLoad) {
        var leftLoaded = false,
            rightLoaded = false;
        
        left.src = self.get('left');
        right.src = self.get('right');

        function resolveIfAllLoaded() {
          if (leftLoaded && rightLoaded) {
            resolveImgLoad();
          }
        }
        left.onload = function() {
          leftLoaded = true;
          resolveIfAllLoaded();
        };
        right.onload = function() {
          rightLoaded = true;
          resolveIfAllLoaded();
        };
        left.onerror = rejectImgLoad;
        right.onerror = rejectImgLoad;
      }).then(function() {
        console.debug('DEBUG: render anaglyph finished');
        renderAnaglyph(left, right).then(function(image) {
          self.set('anaglyph', image);
          resolve();
        });
      }, function(e) {
        console.debug('DEBUG: FAILED!! anaglyph', e);
        reject();
      });
    });
  }

});

// ----------- helper functions

function getCanvas(w, h) {
  var c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}


function renderAnaglyph(left, right) {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    // XXX min is only needed as for some reason resizeImage is not
    // working
    // fixing landscape should happen in assignPhotos
    var w = Math.min(left.naturalWidth, right.naturalWidth);
    var h = Math.min(left.naturalHeight, right.naturalHeight);

    var canvas = getCanvas(w, h);

    try {
      //Left image in temporary canvas
      var canvasLeft = getCanvas(w, h);
      var ctxLeft = canvasLeft.getContext('2d');
      ctxLeft.drawImage(left, 0, 0, w, h);
      var dataLeft = ctxLeft.getImageData(0,0, w, h);
      //Right image in result canvas
      var ctx = canvas.getContext('2d');
      ctx.drawImage(right, 0, 0, w, h);
      var data = ctx.getImageData(0,0, w, h);
      for (var i=0,l=dataLeft.data.length/4; i<l; i++) {
        data.data[i * 4 + 0] = dataLeft.data[i * 4 + 0];
      }
      ctx.putImageData(data, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    } catch (e) {
      console.debug('ERROR:', e);
      reject(e);
    }
  });
}


function resizeImage(photo, width) {
  return new Ember.RSVP.Promise(function(resolve) {
    if (photo.naturalSize.width === width) {
      console.debug('DEBUG: not really');
      resolve(photo.image);
      return;
    }
    var height = Math.floor(photo.naturalSize.height * width / photo.naturalSize.width);
    var canvas = getCanvas(width, height);
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = photo.image;
    img.onload = function() {
      ctx.drawImage(img, 0, 0, width, height);
      ctx.restore();
      console.debug('DEBUG: ', 
          photo.naturalSize.width, photo.naturalSize.height, 'to', width, height);
      resolve(canvas.toDataURL("image/png"));
    };
  });
}

/**
 * render a small icon and return the blob
 */
function renderIcon(photo) {
  var canvas = getCanvas(100, 100);
  var ctx = canvas.getContext('2d');
  var img = new Image();
  img.src = photo.image;
  ctx.drawImage(img, 0, 0, 200, photo.naturalSize.height*200/photo.naturalSize.width);
  console.debug('DEBUG: render icon finished');
  return canvas.toDataURL("image/png");
}


/**
 * render a stereopair
 * XXX: this code is not used for now
 */
function renderImage(photos, screen) {
  // XXX this currently does not allow to align the pictures!!!
  // calculate the size of target image )canvas width and height)
  var lW = photos.left.naturalSize.width;
  var lH = photos.left.naturalSize.height;
  var rW = photos.right.naturalSize.width;
  var rH = photos.right.naturalSize.height;
  // XXX assuming both images are in portrait mode
  // TODO rotate image if not in portrait mode
  // half canvas width
  var hCW = Math.min(lW, rW);
  // which image is the ratio one
  var rI = (lW === hCW) ? photos.left : photos.right;
  // canvas size
  var cW = 2 * hCW;
  var cH = 2 * hCW * screen.height / screen.width;
  // resized heights
  var rLH = (lW === hCW && lH === rI.naturalSize.height) ? lH : Math.floor(hCW * lH / lW);
  var rRH = (rW === hCW && rH === rI.naturalSize.height) ? rH : Math.floor(hCW * rH / rW);
  // create a black canvas
  var canvas = getCanvas(cW, cH);
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  // draw images on the canvas
  var left = new Image();
  left.src = photos.left.image;
  ctx.drawImage(left, 
                photos.left.inWrapPosition.x, photos.left.inWrapPosition.y,
                hCW, rLH);
  var right = new Image();
  right.src = photos.right.image;
  ctx.drawImage(right, 
                hCW + photos.right.inWrapPosition.x, photos.right.inWrapPosition.y,
                hCW, rRH);
  ctx.restore();
  return canvas.toDataURL("image/png");
}


