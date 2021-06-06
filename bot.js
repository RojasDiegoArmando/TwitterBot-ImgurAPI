const Twitter = require("twitter")
const dotenv = require("dotenv")
dotenv.config({ path: "./config.env" })
const fetchAlbum = require("./fetchAlbum")
const loadImage = require("./loadImage")

const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET,
})

const shareTweet = async (img, quote) => {
  twitterClient.post(
    "media/upload",
    { media: img },
    (error, media, response) => {
      if (!error) {
        console.log(media.media_id_string)
        const status = {
          status: `${quote}`,
          media_ids: media.media_id_string,
        }
        if (error) {
          console.log(error)
        }

        twitterClient.post(
          "statuses/update",
          status,
          (error, tweet, response) => {
            if (!error) {
              console.log(tweet)
            }
            if (error) {
              console.log(error)
            }
          }
        )
      }
    }
  )
}

const sendTweet = () => {
  fetchAlbum("YlOQEOX").then((res) => {
    const resCount = res.length
    const newTweet = res[Math.floor(Math.random() * resCount)]
    loadImage(newTweet.link, (err, img) => {
      if (err) {
        console.log(err)
      }
      shareTweet(img, newTweet.description)
    })
  })
}

setInterval(sendTweet, 1000 * 60 * 60)
