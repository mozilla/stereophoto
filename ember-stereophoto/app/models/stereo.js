// models/stereo.js
import DS from 'ember-data';
import Ember from 'ember';
//import localforage from 'localforage';

export default DS.Model.extend({
  // id: DS.attr('string'),     // identification used in storage
  left: DS.attr('string'),      // key to left image
  right: DS.attr('string'),     // key to right image
  anaglyph: DS.attr('string'),  // key to anaglyph image
  icon: DS.attr('string'),      // JPG data
  date: DS.attr('date'),        // date of image creation
  // gallery: belongsTo('gallery'),
  
  /*
   * delete photos and remove record
   */
  remveRecordAndImages: function() {
    console.debug('DEBUG: removing images and the record itself', this.get('id'));
    localforage.removeItem(this.left);
    localforage.removeItem(this.right);
    localforage.removeItem(this.anaglyph);
    return this.destroyRecord();
  },

  getImage: function(type) {
    return localforage.getItem(this.get(type));
  },

  render: function(photos) {
    var self = this;
    this.set('left', 'images-' + this.id + '-left');
    this.set('right', 'images-' + this.id + '-right');
    this.set('anaglyph', 'images-' + this.id + '-anaglyph');
    return new Ember.RSVP.Promise(function(resolve) {
      self.set('icon', renderIcon(photos.left));
      self.assignPhotos(photos).then(function(images) {
        // photos do not have to be saved in storage yet
        self.renderAnaglyph(images.left, images.right).then(function() {
          // TODO: make the object look rendered in the gallery
        },
        function() {
          // error in saving anaglyph - delete the record
          self.deleteRecord();
        });
        resolve();
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
        localforage.setItem(self.get('left'), photos.left.image);
        console.debug('DEBUG: resizing right photo');
        resizeImage(photos.right, tW).then(function(image) {
          localforage.setItem(self.get('right'), image);
          resolve({'left': photos.left.image, 'right': image});
        });
      } else {
        localforage.setItem(self.get('right'), photos.right.image);
        console.debug('DEBUG: resizing left photo');
        resizeImage(photos.left, tW).then(function(image) {
          localforage.setItem(self.get('left'), image);
          resolve({'left': image, 'right': photos.right.image});
        });
      }
    });
  },

  /**
   * render an anaglyph
   */
  renderAnaglyph: function(leftSrc, rightSrc) {
    var self = this;
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
        
        left.src = leftSrc;
        right.src = rightSrc;

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
          localforage.setItem(self.get('anaglyph'), image);
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
    console.debug('DEBUG: creating canvase', width, height);
    var canvas = getCanvas(width, height);
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = photo.image;
    img.onload = function() {
      ctx.drawImage(img, 
          0, 0, photo.naturalSize.width, photo.naturalSize.height, 
          0, 0, width, height);
      console.debug('DEBUG: ', 
          photo.naturalSize.width, photo.naturalSize.height, 'to', width, height);
      // debugging
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
  ctx.drawImage(img, -50, -50, 150, photo.naturalSize.height*200/photo.naturalSize.width-50);
  console.debug('DEBUG: render icon finished');
  return canvas.toDataURL("image/png");
}
