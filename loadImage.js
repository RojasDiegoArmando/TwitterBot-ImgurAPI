const https = require("https")

const loadImage = (url, callback) => {
  https
    .get(url, (res) => {
      const bufs = []
      res.on("data", function (chunk) {
        bufs.push(chunk)
      })
      res.on("end", function () {
        const img = Buffer.concat(bufs)
        callback(null, img)
      })
    })
    .on("error", callback)
}

module.exports = loadImage
