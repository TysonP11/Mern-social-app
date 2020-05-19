const express = require('express')
const router = express.Router()
const gravatar = require('gravatar-url')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')

const User = require('../../models/Users')
const auth = require('../../middleware/auth')

// @route       POST api/users
// @ desc       Register user
// @access      Public
router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 8 or more characters'
        ).isLength({ min: 8 }),
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, email, password } = req.body

        try {
            //See if the user exists
            let user = await User.findOne({ email })
            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'User already exists' }] })
            }

            //Get user's gravatar
            const avatar = gravatar(email, { size: 200 })

            user = new User({
                name,
                email,
                avatar,
                password,
            })

            //ENcrypt password
            const salt = await bcrypt.genSalt(10)

            user.password = await bcrypt.hash(password, salt)

            await user.save()

            //return jsonwebtoken

            const payload = {
                user: {
                    id: user.id,
                },
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err
                    res.json({ token })
                }
            )
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server error')
        }
    }
)

// @route       GET api/users
// @ desc       Get user information
// @access      Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// @route       PUT api/users/change-password
// @ desc       Put change user password
// @access      Private
router.put(
    '/change-password',
    auth,
    [
        check('currentPassword', 'Current password is required')
            .not()
            .isEmpty(),
        check('newPassword', 'Please enter a password with 8 or more characters').isLength({ min: 8 })
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const currentPassword = req.body.currentPassword
        let newPassword = req.body.newPassword
        try {
          let user = await User.findById(req.user.id)

          console.log(user)
          console.log(currentPassword)

          const isMatched = await bcrypt.compare(currentPassword, user.password)

          if (!isMatched) {
            return res.status(400).json({ msg: 'Invalid credentials' })
          }

          
          const salt = await bcrypt.genSalt(10)
          newPassword = await bcrypt.hash(newPassword, salt)
          console.log(newPassword)

          user = await User.findOneAndUpdate({ _id: req.user.id }, { password: newPassword })          

          res.json(user)
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server error')
        }
    }
)

module.exports = router
