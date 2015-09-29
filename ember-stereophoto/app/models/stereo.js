// models/stereo.js
import DS from 'ember-data';


export default DS.Model.extend({
  // id: DS.attr('string'),     // identification used in storage
  image: DS.attr('string'),   // JPG data
  icon: DS.attr('string'),   // JPG data
  date: DS.attr('date'),     // date of image creation
  // gallery: belongsTo('gallery'),

  render: function(photos, screen) {
    this.set('icon', renderIcon(photos.left));
    console.log('DEBUG: render icon finished');
    this.set('image', renderImage(photos, screen));
    console.log('DEBUG: render image finished');
  }
});


// ----------- helper functions

function getCanvas(w, h) {
  var c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
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
  return canvas.toDataURL("image/png");
}


/**
 * render a stereopair
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


