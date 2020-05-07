
const multer = require('multer')

const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"]

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const extend = path.extname(file.originalname)
        if (extend !== imageMimeTypes) {
            return cb(res.status(400).json({ message: 'Only jpg, png and gif are allow' }), false)
        }
        cb(null, false)
    }
})

const upload = multer({ storage: storage }).single('file')

module.exports = upload