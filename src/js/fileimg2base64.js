var fileimg2base64 = {
  reader: '',
  event: {},
  init: function (options) {
    var _this = this
    var reader = new FileReader()
    reader.onload = function (e) {
      _this.createImage(e, options)
    }
    reader.readAsDataURL(options.file)
    // if (!this.reader) {
    //   this.reader = new FileReader();
    //   this.reader.onload = function (e) {
    //     _this.createImage(e)
    //   }
    // }
  },
  createImage: function (readerResult, options) {
    var _this = this
    var img = new Image();
    img.src = readerResult.target.result;
    img.onload = function (e) {
      _this.createCanvas(this, options)
      // document.body.removeChild(img)
    }
    // document.body.appendChild(img)
  },
  createCanvas: function (img, options) {
    // var width = options.width || img.width
    // var height = options.height || img.height
    var canvas = document.createElement('canvas')
    canvas.width = img.width/2
    canvas.height = img.height/2
    var ctx = canvas.getContext('2d')
    ctx.scale(0.5,0.5)
    ctx.drawImage(img, 0, 0)
    var base64 = canvas.toDataURL("image/png")
    var output = {
      _width: img.width,
      _height: img.height,
      width: img.width/2,
      height: img.height/2,
      img: img,
      base64: base64,
      url: base64
    }
    this.event.__transform && this.event.__transform(output)
    !this.event.__transform && this.event.transform(output)
    // document.body.appendChild(canvas)
  },
  transform: function (options, fn) {
    options = options || {}
    if(fn) this.event.__transform = fn
    if (this.check(options)) {
      this.init(options)
    }
  },
  on: function (type, fn) {
    this.event[type] = fn
  },
  check: function (options) {
    if (!options.file) {
      return console.warn('[error] param-file not found')
    }
    if (!this.event.transform && !this.event.__transform) {
      return console.warn('[warn] on:transform event not found')
    }
    return true
  }
}
window.fileimg2base64 = fileimg2base64;