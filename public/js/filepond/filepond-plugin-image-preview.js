/*
 * FilePondPluginImagePreview 3.1.4
 * Licensed under MIT, https://opensource.org/licenses/MIT
 * Please visit https://pqina.nl/filepond for details.
 */

/* eslint-disable */
(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
      ? define(factory)
      : (global.FilePondPluginImagePreview = factory());
})(this, function() {
  'use strict';

  // test if file is of type image and can be viewed in canvas
  var isPreviewableImage = function isPreviewableImage(file) {
    return /^image/.test(file.type);
  };

  var cloneCanvas = function cloneCanvas(origin, target) {
    target = target || document.createElement('canvas');
    target.width = origin.width;
    target.height = origin.height;
    var ctx = target.getContext('2d');
    ctx.drawImage(origin, 0, 0);
    return target;
  };

  var IMAGE_SCALE_SPRING_PROPS = {
    type: 'spring',
    stiffness: 0.5,
    damping: 0.45,
    mass: 10
  };

  var createVector = function createVector(x, y) {
    return { x: x, y: y };
  };

  var vectorDot = function vectorDot(a, b) {
    return a.x * b.x + a.y * b.y;
  };

  var vectorSubtract = function vectorSubtract(a, b) {
    return createVector(a.x - b.x, a.y - b.y);
  };

  var vectorDistanceSquared = function vectorDistanceSquared(a, b) {
    return vectorDot(vectorSubtract(a, b), vectorSubtract(a, b));
  };

  var vectorDistance = function vectorDistance(a, b) {
    return Math.sqrt(vectorDistanceSquared(a, b));
  };

  var getOffsetPointOnEdge = function getOffsetPointOnEdge(length, rotation) {
    var a = length;

    var A = 1.5707963267948966;
    var B = rotation;
    var C = 1.5707963267948966 - rotation;

    var sinA = Math.sin(A);
    var sinB = Math.sin(B);
    var sinC = Math.sin(C);
    var cosC = Math.cos(C);
    var ratio = a / sinA;
    var b = ratio * sinB;
    var c = ratio * sinC;

    return createVector(cosC * b, cosC * c);
  };

  var getRotatedRectSize = function getRotatedRectSize(rect, rotation) {
    var w = rect.width;
    var h = rect.height;

    var hor = getOffsetPointOnEdge(w, rotation);
    var ver = getOffsetPointOnEdge(h, rotation);

    var tl = createVector(rect.x + Math.abs(hor.x), rect.y - Math.abs(hor.y));

    var tr = createVector(
      rect.x + rect.width + Math.abs(ver.y),
      rect.y + Math.abs(ver.x)
    );

    var bl = createVector(
      rect.x - Math.abs(ver.y),
      rect.y + rect.height - Math.abs(ver.x)
    );

    return {
      width: vectorDistance(tl, tr),
      height: vectorDistance(tl, bl)
    };
  };

  var getImageRectZoomFactor = function getImageRectZoomFactor(
    imageRect,
    cropRect,
    rotation,
    center
  ) {
    // calculate available space round image center position
    var cx = center.x > 0.5 ? 1 - center.x : center.x;
    var cy = center.y > 0.5 ? 1 - center.y : center.y;
    var imageWidth = cx * 2 * imageRect.width;
    var imageHeight = cy * 2 * imageRect.height;

    // calculate rotated crop rectangle size
    var rotatedCropSize = getRotatedRectSize(cropRect, rotation);

    // calculate scalar required to fit image
    return Math.max(
      rotatedCropSize.width / imageWidth,
      rotatedCropSize.height / imageHeight
    );
  };

  var getCenteredCropRect = function getCenteredCropRect(
    container,
    aspectRatio
  ) {
    var width = container.width;
    var height = width * aspectRatio;
    if (height > container.height) {
      height = container.height;
      width = height / aspectRatio;
    }
    var x = (container.width - width) * 0.5;
    var y = (container.height - height) * 0.5;

    return {
      x: x,
      y: y,
      width: width,
      height: height
    };
  };

  // does horizontal and vertical flipping
  var createBitmapView = function createBitmapView(_) {
    return _.utils.createView({
      name: 'image-bitmap',
      tag: 'canvas',
      ignoreRect: true,
      mixins: {
        styles: ['scaleX', 'scaleY']
      },
      create: function create(_ref) {
        var root = _ref.root,
          props = _ref.props;

        cloneCanvas(props.image, root.element);
      }
    });
  };

  // shifts and rotates image
  var createImageCanvasWrapper = function createImageCanvasWrapper(_) {
    return _.utils.createView({
      name: 'image-canvas-wrapper',
      tag: 'div',
      ignoreRect: true,
      mixins: {
        apis: ['crop', 'width', 'height'],
        styles: [
          'originX',
          'originY',
          'translateX',
          'translateY',
          'scaleX',
          'scaleY',
          'rotateZ'
        ],
        animations: {
          originX: IMAGE_SCALE_SPRING_PROPS,
          originY: IMAGE_SCALE_SPRING_PROPS,
          scaleX: IMAGE_SCALE_SPRING_PROPS,
          scaleY: IMAGE_SCALE_SPRING_PROPS,
          translateX: IMAGE_SCALE_SPRING_PROPS,
          translateY: IMAGE_SCALE_SPRING_PROPS,
          rotateZ: IMAGE_SCALE_SPRING_PROPS
        }
      },
      create: function create(_ref2) {
        var root = _ref2.root,
          props = _ref2.props;

        props.width = props.image.width;
        props.height = props.image.height;
        root.ref.image = root.appendChildView(
          root.createChildView(createBitmapView(_), { image: props.image })
        );
      },
      write: function write(_ref3) {
        var root = _ref3.root,
          props = _ref3.props;
        var flip = props.crop.flip;
        var image = root.ref.image;

        image.scaleX = flip.horizontal ? -1 : 1;
        image.scaleY = flip.vertical ? -1 : 1;
      }
    });
  };

  // clips canvas to correct aspect ratio
  var createClipView = function createClipView(_) {
    return _.utils.createView({
      name: 'image-clip',
      tag: 'div',
      ignoreRect: true,
      mixins: {
        apis: ['crop', 'width', 'height'],
        styles: ['width', 'height']
      },
      create: function create(_ref4) {
        var root = _ref4.root,
          props = _ref4.props;

        root.ref.image = root.appendChildView(
          root.createChildView(
            createImageCanvasWrapper(_),
            Object.assign({}, props)
          )
        );

        // set up transparency grid
        var transparencyIndicator = root.query(
          'GET_IMAGE_PREVIEW_TRANSPARENCY_INDICATOR'
        );
        if (transparencyIndicator === null) {
          return;
        }

        // grid pattern
        if (transparencyIndicator === 'grid') {
          root.element.dataset.transparencyIndicator = transparencyIndicator;
        } else {
          // basic color
          root.element.dataset.transparencyIndicator = 'color';
        }
      },
      write: function write(_ref5) {
        var root = _ref5.root,
          props = _ref5.props;
        var crop = props.crop,
          width = props.width,
          height = props.height;

        root.ref.image.crop = crop;

        var stage = {
          x: 0,
          y: 0,
          width: width,
          height: height,
          center: {
            x: width * 0.5,
            y: height * 0.5
          }
        };

        var image = {
          width: root.ref.image.width,
          height: root.ref.image.height
        };

        var origin = {
          x: crop.center.x * image.width,
          y: crop.center.y * image.height
        };

        var translation = {
          x: stage.center.x - image.width * crop.center.x,
          y: stage.center.y - image.height * crop.center.y
        };

        var rotation = Math.PI * 2 + crop.rotation % (Math.PI * 2);

        var cropAspectRatio = crop.aspectRatio || image.height / image.width;

        var stageZoomFactor = getImageRectZoomFactor(
          image,
          getCenteredCropRect(stage, cropAspectRatio),
          rotation,
          crop.center
        );

        var scale = crop.zoom * stageZoomFactor;

        var imageView = root.ref.image;

        imageView.originX = origin.x;
        imageView.originY = origin.y;
        imageView.translateX = translation.x;
        imageView.translateY = translation.y;
        imageView.rotateZ = rotation;
        imageView.scaleX = scale;
        imageView.scaleY = scale;
      }
    });
  };

  var createImageView = function createImageView(_) {
    return _.utils.createView({
      name: 'image-preview',
      tag: 'div',
      ignoreRect: true,
      mixins: {
        apis: ['crop'],
        styles: ['translateY', 'scaleX', 'scaleY', 'opacity'],
        animations: {
          scaleX: IMAGE_SCALE_SPRING_PROPS,
          scaleY: IMAGE_SCALE_SPRING_PROPS,
          translateY: IMAGE_SCALE_SPRING_PROPS,
          opacity: { type: 'tween', duration: 500 }
        }
      },
      create: function create(_ref6) {
        var root = _ref6.root,
          props = _ref6.props;

        root.ref.clip = root.appendChildView(
          root.createChildView(createClipView(_), {
            image: props.image,
            crop: props.crop
          })
        );
      },
      write: function write(_ref7) {
        var root = _ref7.root,
          props = _ref7.props;
        var clip = root.ref.clip;
        var crop = props.crop,
          image = props.image;

        clip.crop = crop;

        // calculate scaled preview image size
        var imageAspectRatio = image.height / image.width;
        var aspectRatio = crop.aspectRatio || imageAspectRatio;

        // calculate container size
        var containerWidth = root.rect.inner.width;
        var previewWidth = containerWidth;

        var fixedPreviewHeight = root.query('GET_IMAGE_PREVIEW_HEIGHT');
        var minPreviewHeight = root.query('GET_IMAGE_PREVIEW_MIN_HEIGHT');
        var maxPreviewHeight = root.query('GET_IMAGE_PREVIEW_MAX_HEIGHT');

        var panelAspectRatio = root.query('GET_PANEL_ASPECT_RATIO');
        var allowMultiple = root.query('GET_ALLOW_MULTIPLE');

        if (panelAspectRatio && !allowMultiple) {
          fixedPreviewHeight = containerWidth * panelAspectRatio;
          aspectRatio = panelAspectRatio;
        }

        // determine clip width and height
        var clipHeight =
          fixedPreviewHeight !== null
            ? fixedPreviewHeight
            : Math.max(
                minPreviewHeight,
                Math.min(containerWidth * aspectRatio, maxPreviewHeight)
              );

        var clipWidth = clipHeight / aspectRatio;
        if (clipWidth > previewWidth) {
          clipWidth = previewWidth;
          clipHeight = clipWidth * aspectRatio;
        }

        clip.width = clipWidth;
        clip.height = clipHeight;
      }
    });
  };

  /**
   * Create gradient and mask definitions, we use these in each overlay so we can define them once
   * Turns out this also helps Safari to render the gradient on time
   */
  var definitions =
    "<radialGradient id=\"filepond--image-preview-radial-gradient\" cx=\".5\" cy=\"1.25\" r=\"1.15\">\n<stop offset='50%' stop-color='#000000'/>\n<stop offset='56%' stop-color='#0a0a0a'/>\n<stop offset='63%' stop-color='#262626'/>\n<stop offset='69%' stop-color='#4f4f4f'/>\n<stop offset='75%' stop-color='#808080'/>\n<stop offset='81%' stop-color='#b1b1b1'/>\n<stop offset='88%' stop-color='#dadada'/>\n<stop offset='94%' stop-color='#f6f6f6'/>\n<stop offset='100%' stop-color='#ffffff'/>\n</radialGradient>\n\n<mask id=\"filepond--image-preview-masking\">\n<rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" fill=\"url(#filepond--image-preview-radial-gradient)\"></rect>\n</mask>";

  var appendDefinitions = function appendDefinitions() {
    if (document.readyState === 'interactive') {
      var defs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      defs.style.cssText = 'position:absolute;width:0;height:0';
      defs.innerHTML = definitions;
      document.body.appendChild(defs);
    }
  };

  var hasNavigator = typeof navigator !== 'undefined';
  if (hasNavigator) {
    appendDefinitions();
    document.addEventListener('readystatechange', appendDefinitions);
  }

  // need to know if this is IE11 so we can render the definitions with each overlay
  var isEdgeOrIE = hasNavigator
    ? document.documentMode || /Edge/.test(navigator.userAgent)
    : false;

  var createImageOverlayView = function createImageOverlayView(fpAPI) {
    return fpAPI.utils.createView({
      name: 'image-preview-overlay',
      tag: 'div',
      ignoreRect: true,
      create: function create(_ref) {
        var root = _ref.root,
          props = _ref.props;

        root.element.classList.add(
          'filepond--image-preview-overlay-' + props.status
        );
        root.element.innerHTML =
          '<svg width="500" height="200" viewBox="0 0 500 200" preserveAspectRatio="none">\n                ' +
          (isEdgeOrIE ? '<defs>' + definitions + '</defs>' : '') +
          '\n                <rect x="0" width="500" height="200" fill="currentColor" mask="url(#filepond--image-preview-masking)"></rect>\n            </svg>\n            ';
      },
      mixins: {
        styles: ['opacity'],
        animations: {
          opacity: { type: 'spring', mass: 25 }
        }
      }
    });
  };

  /**
   * Bitmap Worker
   */
  var BitmapWorker = function BitmapWorker() {
    self.onmessage = function(e) {
      createImageBitmap(e.data.message.file).then(function(bitmap) {
        self.postMessage({ id: e.data.id, message: bitmap }, [bitmap]);
      });
    };
  };

  var getImageSize = function getImageSize(url, cb) {
    var image = new Image();
    image.onload = function() {
      var width = image.naturalWidth;
      var height = image.naturalHeight;
      image = null;
      cb(width, height);
    };
    image.src = url;
  };

  var toConsumableArray = function(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++)
        arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  var transforms = {
    1: function _() {
      return [1, 0, 0, 1, 0, 0];
    },
    2: function _(width) {
      return [-1, 0, 0, 1, width, 0];
    },
    3: function _(width, height) {
      return [-1, 0, 0, -1, width, height];
    },
    4: function _(width, height) {
      return [1, 0, 0, -1, 0, height];
    },
    5: function _() {
      return [0, 1, 1, 0, 0, 0];
    },
    6: function _(width, height) {
      return [0, 1, -1, 0, height, 0];
    },
    7: function _(width, height) {
      return [0, -1, -1, 0, height, width];
    },
    8: function _(width) {
      return [0, -1, 1, 0, 0, width];
    }
  };

  var fixImageOrientation = function fixImageOrientation(
    ctx,
    width,
    height,
    orientation
  ) {
    // no orientation supplied
    if (orientation === -1) {
      return;
    }

    ctx.transform.apply(
      ctx,
      toConsumableArray(transforms[orientation](width, height))
    );
  };

  // draws the preview image to canvas
  var createPreviewImage = function createPreviewImage(
    data,
    width,
    height,
    orientation
  ) {
    // can't draw on half pixels
    width = Math.round(width);
    height = Math.round(height);

    // draw image
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');

    // if is rotated incorrectly swap width and height
    if (orientation >= 5 && orientation <= 8) {
      var _ref = [height, width];
      width = _ref[0];
      height = _ref[1];
    }

    // correct image orientation
    fixImageOrientation(ctx, width, height, orientation);

    // draw the image
    ctx.drawImage(data, 0, 0, width, height);

    return canvas;
  };

  var isBitmap = function isBitmap(file) {
    return /^image/.test(file.type) && !/svg/.test(file.type);
  };

  var MAX_WIDTH = 10;
  var MAX_HEIGHT = 10;

  var calculateAverageColor = function calculateAverageColor(image) {
    var scalar = Math.min(MAX_WIDTH / image.width, MAX_HEIGHT / image.height);

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var width = (canvas.width = Math.ceil(image.width * scalar));
    var height = (canvas.height = Math.ceil(image.height * scalar));
    ctx.drawImage(image, 0, 0, width, height);
    var data = null;
    try {
      data = ctx.getImageData(0, 0, width, height).data;
    } catch (e) {
      return null;
    }
    var l = data.length;

    var r = 0;
    var g = 0;
    var b = 0;
    var i = 0;

    for (; i < l; i += 4) {
      r += data[i] * data[i];
      g += data[i + 1] * data[i + 1];
      b += data[i + 2] * data[i + 2];
    }

    r = averageColor(r, l);
    g = averageColor(g, l);
    b = averageColor(b, l);

    return { r: r, g: g, b: b };
  };

  var averageColor = function averageColor(c, l) {
    return Math.floor(Math.sqrt(c / (l / 4)));
  };

  var loadImage = function loadImage(url) {
    return new Promise(function(resolve, reject) {
      var img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function() {
        resolve(img);
      };
      img.onerror = function(e) {
        reject(e);
      };
      img.src = url;
    });
  };

  var createImageWrapperView = function createImageWrapperView(_) {
    // create overlay view
    var overlay = createImageOverlayView(_);

    var removeImageView = function removeImageView(root, imageView) {
      root.removeChildView(imageView);
      imageView._destroy();
    };

    // remove an image
    var imageViewBin = [];
    var shiftImage = function shiftImage(_ref) {
      var root = _ref.root;

      var image = root.ref.images.shift();
      image.opacity = 0;
      image.translateY = -15;
      imageViewBin.push(image);
    };

    var ImageView = createImageView(_);

    // add new image
    var pushImage = function pushImage(_ref2) {
      var root = _ref2.root,
        props = _ref2.props;

      var id = props.id;
      var item = root.query('GET_ITEM', { id: id });
      if (!item) return;

      var image = props.preview;
      var crop = item.getMetadata('crop') || {
        center: {
          x: 0.5,
          y: 0.5
        },
        flip: {
          horizontal: false,
          vertical: false
        },
        zoom: 1,
        rotation: 0,
        aspectRatio: null
      };

      // append image presenter
      var imageView = root.appendChildView(
        root.createChildView(ImageView, {
          image: image,
          crop: crop,
          opacity: 0,
          scaleX: 1.15,
          scaleY: 1.15,
          translateY: 15
        }),
        root.childViews.length
      );
      root.ref.images.push(imageView);

      // reveal
      imageView.opacity = 1;
      imageView.scaleX = 1;
      imageView.scaleY = 1;
      imageView.translateY = 0;

      // the preview is now ready to be drawn
      setTimeout(function() {
        root.dispatch('DID_IMAGE_PREVIEW_SHOW', { id: id });
      }, 250);
    };

    var updateImage = function updateImage(_ref3) {
      var root = _ref3.root,
        props = _ref3.props;

      var item = root.query('GET_ITEM', { id: props.id });
      if (!item) return;

      var imageView = root.ref.images[root.ref.images.length - 1];
      imageView.crop = item.getMetadata('crop');
    };

    // replace image preview
    var didUpdateItemMetadata = function didUpdateItemMetadata(_ref4) {
      var root = _ref4.root,
        props = _ref4.props,
        action = _ref4.action;

      if (action.change.key !== 'crop' || !root.ref.images.length) {
        return;
      }

      var item = root.query('GET_ITEM', { id: props.id });
      if (!item) return;

      var crop = item.getMetadata('crop');
      var image = root.ref.images[root.ref.images.length - 1];

      // if aspect ratio has changed, we need to create a new image
      if (Math.abs(crop.aspectRatio - image.crop.aspectRatio) > 0.00001) {
        shiftImage({ root: root });
        pushImage({ root: root, props: props });
      } else {
        // if not, we can update the current image
        updateImage({ root: root, props: props });
      }
    };

    var canCreateImageBitmap = function canCreateImageBitmap(file) {
      return 'createImageBitmap' in window && isBitmap(file);
    };

    /**
     * Write handler for when preview container has been created
     */
    var didCreatePreviewContainer = function didCreatePreviewContainer(_ref5) {
      var root = _ref5.root,
        props = _ref5.props;
      var utils = _.utils;
      var createWorker = utils.createWorker;
      var id = props.id;

      // we need to get the file data to determine the eventual image size

      var item = root.query('GET_ITEM', id);
      if (!item) return;

      // get url to file (we'll revoke it later on when done)
      var fileURL = URL.createObjectURL(item.file);

      // fallback
      var loadPreviewFallback = function loadPreviewFallback() {
        // let's scale the image in the main thread :(
        loadImage(fileURL).then(previewImageLoaded);
      };

      // image is now ready
      var previewImageLoaded = function previewImageLoaded(data) {
        // the file url is no longer needed
        URL.revokeObjectURL(fileURL);

        // draw the scaled down version here and use that as source so bitmapdata can be closed
        // orientation info
        var exif = item.getMetadata('exif') || {};
        var orientation = exif.orientation || -1;

        // get width and height from action, and swap if orientation is incorrect
        var width = data.width,
          height = data.height;

        if (orientation >= 5 && orientation <= 8) {
          var _ref6 = [height, width];
          width = _ref6[0];
          height = _ref6[1];
        }

        // scale canvas based on pixel density
        var pixelDensityFactor = window.devicePixelRatio;

        // the max height of the preview container
        var fixedPreviewHeight = root.query('GET_IMAGE_PREVIEW_HEIGHT');
        var minPreviewHeight = root.query('GET_IMAGE_PREVIEW_MIN_HEIGHT');
        var maxPreviewHeight = root.query('GET_IMAGE_PREVIEW_MAX_HEIGHT');

        // calculate scaled preview image size
        var previewImageRatio = height / width;

        // calculate image preview height and width
        var imageHeight =
          fixedPreviewHeight !== null
            ? fixedPreviewHeight
            : Math.max(minPreviewHeight, Math.min(height, maxPreviewHeight));
        var imageWidth = imageHeight / previewImageRatio;

        // we want as much pixels to work with as possible,
        // this multiplies the minimum image resolution
        var resolutionScaleFactor = 4;

        // transfer to image tag so no canvas memory wasted on iOS
        props.preview = createPreviewImage(
          data,
          Math.min(
            width,
            imageWidth * pixelDensityFactor * resolutionScaleFactor
          ),
          Math.min(
            height,
            imageHeight * pixelDensityFactor * resolutionScaleFactor
          ),
          orientation
        );

        // calculate average image color, disabled for now
        var averageColor = root.query(
          'GET_IMAGE_PREVIEW_CALCULATE_AVERAGE_IMAGE_COLOR'
        )
          ? calculateAverageColor(data)
          : null;
        item.setMetadata('color', averageColor, true);

        // data has been transferred to canvas ( if was ImageBitmap )
        if ('close' in data) {
          data.close();
        }

        // show the overlay
        root.ref.overlayShadow.opacity = 1;

        // create the first image
        pushImage({ root: root, props: props });
      };

      // determine image size of this item
      getImageSize(fileURL, function(width, height) {
        // we can now scale the panel to the final size
        root.dispatch('DID_IMAGE_PREVIEW_CALCULATE_SIZE', {
          id: id,
          width: width,
          height: height
        });

        // if we support scaling using createImageBitmap we use a worker
        if (canCreateImageBitmap(item.file)) {
          // let's scale the image in a worker
          var worker = createWorker(BitmapWorker);

          worker.post(
            {
              file: item.file
            },
            function(imageBitmap) {
              // destroy worker
              worker.terminate();

              // no bitmap returned, must be something wrong,
              // try the oldschool way
              if (!imageBitmap) {
                loadPreviewFallback();
                return;
              }

              // yay we got our bitmap, let's continue showing the preview
              previewImageLoaded(imageBitmap);
            }
          );
        } else {
          // create fallback preview
          loadPreviewFallback();
        }
      });
    };

    /**
     * Write handler for when the preview image is ready to be animated
     */
    var didDrawPreview = function didDrawPreview(_ref7) {
      var root = _ref7.root;

      // get last added image
      var image = root.ref.images[root.ref.images.length - 1];
      image.translateY = 0;
      image.scaleX = 1.0;
      image.scaleY = 1.0;
      image.opacity = 1;
    };

    /**
     * Write handler for when the preview has been loaded
     */
    var restoreOverlay = function restoreOverlay(_ref8) {
      var root = _ref8.root;

      root.ref.overlayShadow.opacity = 1;
      root.ref.overlayError.opacity = 0;
      root.ref.overlaySuccess.opacity = 0;
    };

    var didThrowError = function didThrowError(_ref9) {
      var root = _ref9.root;

      root.ref.overlayShadow.opacity = 0.25;
      root.ref.overlayError.opacity = 1;
    };

    var didCompleteProcessing = function didCompleteProcessing(_ref10) {
      var root = _ref10.root;

      root.ref.overlayShadow.opacity = 0.25;
      root.ref.overlaySuccess.opacity = 1;
    };

    /**
     * Constructor
     */
    var create = function create(_ref11) {
      var root = _ref11.root;

      // image view
      root.ref.images = [];

      // image overlays
      root.ref.overlayShadow = root.appendChildView(
        root.createChildView(overlay, {
          opacity: 0,
          status: 'idle'
        })
      );

      root.ref.overlaySuccess = root.appendChildView(
        root.createChildView(overlay, {
          opacity: 0,
          status: 'success'
        })
      );

      root.ref.overlayError = root.appendChildView(
        root.createChildView(overlay, {
          opacity: 0,
          status: 'failure'
        })
      );
    };

    return _.utils.createView({
      name: 'image-preview-wrapper',
      create: create,
      styles: ['height'],
      write: _.utils.createRoute(
        {
          // image preview stated
          DID_IMAGE_PREVIEW_DRAW: didDrawPreview,
          DID_IMAGE_PREVIEW_CONTAINER_CREATE: didCreatePreviewContainer,
          DID_UPDATE_ITEM_METADATA: didUpdateItemMetadata,

          // file states
          DID_THROW_ITEM_LOAD_ERROR: didThrowError,
          DID_THROW_ITEM_PROCESSING_ERROR: didThrowError,
          DID_THROW_ITEM_INVALID: didThrowError,
          DID_COMPLETE_ITEM_PROCESSING: didCompleteProcessing,
          DID_START_ITEM_PROCESSING: restoreOverlay,
          DID_REVERT_ITEM_PROCESSING: restoreOverlay
        },
        function(_ref12) {
          var root = _ref12.root;

          var panelAspectRatio = root.query('GET_PANEL_ASPECT_RATIO');
          if (panelAspectRatio) {
            root.height = panelAspectRatio * root.rect.width;
          }

          // views on death row
          var viewsToRemove = imageViewBin.filter(function(imageView) {
            return imageView.opacity === 0;
          });

          // views to retain
          imageViewBin = imageViewBin.filter(function(imageView) {
            return imageView.opacity > 0;
          });

          // remove these views
          viewsToRemove.forEach(function(imageView) {
            return removeImageView(root, imageView);
          });
          viewsToRemove.length = 0;
        }
      )
    });
  };

  /**
   * Image Preview Plugin
   */
  var plugin$1 = function(fpAPI) {
    var addFilter = fpAPI.addFilter,
      utils = fpAPI.utils;
    var Type = utils.Type,
      createRoute = utils.createRoute,
      isFile = utils.isFile;

    // imagePreviewView

    var imagePreviewView = createImageWrapperView(fpAPI);

    // called for each view that is created right after the 'create' method
    addFilter('CREATE_VIEW', function(viewAPI) {
      // get reference to created view
      var is = viewAPI.is,
        view = viewAPI.view,
        query = viewAPI.query;

      // only hook up to item view and only if is enabled for this cropper

      if (!is('file') || !query('GET_ALLOW_IMAGE_PREVIEW')) {
        return;
      }

      // create the image preview plugin, but only do so if the item is an image
      var didLoadItem = function didLoadItem(_ref) {
        var root = _ref.root,
          props = _ref.props;
        var id = props.id;

        var item = query('GET_ITEM', id);

        // item could theoretically have been removed in the mean time
        if (!item || !isFile(item.file) || item.archived) {
          return;
        }

        // get the file object
        var file = item.file;

        // exit if this is not an image
        if (!isPreviewableImage(file)) {
          return;
        }

        // exit if image size is too high and no createImageBitmap support
        // this would simply bring the browser to its knees and that is not what we want
        var supportsCreateImageBitmap = 'createImageBitmap' in (window || {});
        var maxPreviewFileSize = query('GET_IMAGE_PREVIEW_MAX_FILE_SIZE');
        if (
          !supportsCreateImageBitmap &&
          maxPreviewFileSize &&
          file.size > maxPreviewFileSize
        ) {
          return;
        }

        // set preview view
        root.ref.imagePreview = view.appendChildView(
          view.createChildView(imagePreviewView, { id: id })
        );

        // now ready
        root.dispatch('DID_IMAGE_PREVIEW_CONTAINER_CREATE', { id: id });
      };

      var scaleItemBackground = function scaleItemBackground(root, props) {
        if (!root.ref.imagePreview) {
          return;
        }

        var id = props.id;

        // get item

        var item = root.query('GET_ITEM', { id: id });
        if (!item) return;

        // no data!
        var _root$ref = root.ref,
          width = _root$ref.imageWidth,
          height = _root$ref.imageHeight;

        if (!width || !height) {
          return;
        }

        // orientation info
        var exif = item.getMetadata('exif') || {};
        var orientation = exif.orientation || -1;

        // get width and height from action, and swap of orientation is incorrect
        if (orientation >= 5 && orientation <= 8) {
          var _ref2 = [height, width];
          width = _ref2[0];
          height = _ref2[1];
        }

        // stylePanelAspectRatio
        var panelAspectRatio = root.query('GET_PANEL_ASPECT_RATIO');
        var allowMultiple = root.query('GET_ALLOW_MULTIPLE');

        // we need the item to get to the crop size
        var crop = item.getMetadata('crop') || {
          center: {
            x: 0.5,
            y: 0.5
          },
          flip: {
            horizontal: false,
            vertical: false
          },
          rotation: 0,
          zoom: 1,
          aspectRatio: height / width
        };

        // set image aspect ratio as fallback
        var shouldForcePreviewSize = !allowMultiple && panelAspectRatio;
        var previewAspectRatio = shouldForcePreviewSize
          ? panelAspectRatio
          : crop.aspectRatio || height / width;

        // get height min and max
        var fixedPreviewHeight = root.query('GET_IMAGE_PREVIEW_HEIGHT');
        var minPreviewHeight = root.query('GET_IMAGE_PREVIEW_MIN_HEIGHT');
        var maxPreviewHeight = root.query('GET_IMAGE_PREVIEW_MAX_HEIGHT');

        // force to panel aspect ratio
        if (shouldForcePreviewSize) {
          fixedPreviewHeight = root.rect.element.width * panelAspectRatio;
        }

        // scale up width and height when we're dealing with an SVG
        if (!isBitmap(item.file)) {
          var scalar = 2048 / width;
          width *= scalar;
          height *= scalar;
        }

        // const crop width
        height =
          fixedPreviewHeight !== null
            ? fixedPreviewHeight
            : Math.max(minPreviewHeight, Math.min(height, maxPreviewHeight));

        width = height / previewAspectRatio;
        if (width > root.rect.element.width || shouldForcePreviewSize) {
          width = root.rect.element.width;
          height = width * previewAspectRatio;
        }

        // set height
        root.ref.imagePreview.element.style.cssText =
          'height:' + Math.round(height) + 'px';
      };

      var didUpdateItemMetadata = function didUpdateItemMetadata(_ref3) {
        var root = _ref3.root,
          props = _ref3.props,
          action = _ref3.action;

        if (action.change.key !== 'crop') {
          return;
        }

        scaleItemBackground(root, props);
      };

      var didCalculatePreviewSize = function didCalculatePreviewSize(_ref4) {
        var root = _ref4.root,
          props = _ref4.props,
          action = _ref4.action;

        // remember dimensions
        root.ref.imageWidth = action.width;
        root.ref.imageHeight = action.height;

        // let's scale the preview pane
        scaleItemBackground(root, props);
      };

      // start writing
      view.registerWriter(
        createRoute({
          DID_LOAD_ITEM: didLoadItem,
          DID_IMAGE_PREVIEW_CALCULATE_SIZE: didCalculatePreviewSize,
          DID_UPDATE_ITEM_METADATA: didUpdateItemMetadata
        })
      );
    });

    // expose plugin
    return {
      options: {
        // Enable or disable image preview
        allowImagePreview: [true, Type.BOOLEAN],

        // Fixed preview height
        imagePreviewHeight: [null, Type.INT],

        // Min image height
        imagePreviewMinHeight: [44, Type.INT],

        // Max image height
        imagePreviewMaxHeight: [256, Type.INT],

        // Max size of preview file for when createImageBitmap is not supported
        imagePreviewMaxFileSize: [null, Type.INT],

        // Style of the transparancy indicator used behind images
        imagePreviewTransparencyIndicator: [null, Type.STRING],

        // Enables or disables reading average image color
        imagePreviewCalculateAverageImageColor: [false, Type.BOOLEAN]
      }
    };
  };

  var isBrowser =
    typeof window !== 'undefined' && typeof window.document !== 'undefined';

  if (isBrowser && document) {
    document.dispatchEvent(
      new CustomEvent('FilePond:pluginloaded', { detail: plugin$1 })
    );
  }

  return plugin$1;
});
