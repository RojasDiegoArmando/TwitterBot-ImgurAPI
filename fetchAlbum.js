const imgur = require("imgur")
const fetchAlbum = async (albumId) => {
  const respuesta = await imgur
    .getAlbumInfo(albumId)
    .then((json) => {
      const ids = json.images.map((image) => {
        const obj = {
          id: image.id,
          description: image.description,
          link: image.link,
        }
        return obj
      })
      return ids
    })
    .catch((err) => {
      console.log(err.message)
    })
  return respuesta
}

module.exports = fetchAlbum
