var fileimg2base64 = {
  reader: '',
  event: {},
  init: function () {
    var _this = this
    if (!this.reader) {
      this.reader = new FileReader();
      this.reader.onload = function (e) {
        _this.createImage(e)
      }
    }
  },
  createImage: function (readerResult) {
    var _this = this
    var img = new Image();
    img.src = readerResult.target.result;
    img.onload = function (e) {
      _this.createCanvas(this)
      document.body.removeChild(img)
    }
    document.body.appendChild(img)
  },
  createCanvas: function (img) {

    var canvas = document.createElement('canvas')
    canvas.width = img.width/2
    canvas.height = img.height/2
    var ctx = canvas.getContext('2d')
    ctx.scale(0.5,0.5)
    ctx.drawImage(img, 0, 0)
    var output = {
      _width: img.width,
      _height: img.height,
      width: img.width/2,
      height: img.height/2,
      img: img,
      base64: canvas.toDataURL("image/png")
    }
    this.event.__transform && this.event.__transform(output)
    !this.event.__transform && this.event.transform(output)
    document.body.appendChild(canvas)
  },
  transform: function (file, fn) {
    if(fn) this.event.__transform = fn
    if (this.check()) {
      this.init()
      this.reader.readAsDataURL(file)
    } else {
      console.warn('[warn] on:transform event not found')
    }
  },
  on: function (type, fn) {
    this.event[type] = fn
  },
  check: function () {
    return !!this.event.transform || !!this.event.__transform
  }
}
window.fileimg2base64 = fileimg2base64;