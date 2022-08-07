import express from 'express'
import path from 'path'
import multer from 'multer'

const router = express.Router()


// router.post('/', (req, res) => {
//     const image = req.files.image
//     if(!image.mimetype.startsWith('image')) {
//             res.status(404)
//             throw new Error('file is not image')
//     }
//     if(image.size > 1000000) {
//         res.status(404)
//         throw new Error('file is too large')
//     }
//     image.mv(`./backend/utils/upload/${Date.now()}-${image.name}`, (err) => {
//         if(err) {
//             res.status(404)
//             throw new Error(err.message)
//         } else {
//             const filepath = `/${Date.now()}-${image.name}`
//             res.status(200).send(filepath)
//          }
//     })


// })

// router.get('/', (req, res) => res.send('hello'))


const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'backend/uploads/')
      // use the same path with express static _dirname in server.js
    },
    filename(req, file, cb) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      )
    },
  })
  
  function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
  
    if (extname && mimetype) {
      return cb(null, true)
    } else {
      cb('Images only!')
    }
  }
  
  const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb)
    },
  })
  
  router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
  })
  


export default router