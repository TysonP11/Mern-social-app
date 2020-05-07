const express = require('express')
const router = express.Router()

const upload = require('../../middleware/fileUpload')
const auth = require('../../middleware/auth')

router.post('/', auth, (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })
})

module.exports = router