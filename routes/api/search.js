const express = require('express')
const router = express.Router()
const { performance } = require('perf_hooks')

const Profile = require('../../models/Profile')
const User = require('../../models/Users')
const auth = require('../../middleware/auth')

router.post('/', auth, async (req, res) => {
    const { input } = req.body
    let result = []

    try {
        if (input !== '') {
            let users = await User.find({ name: new RegExp(input, 'i') }).limit(
                20
            )

            if (users.length === 0) {
                res.json([])
            } else {
                const asyncForEach = async (array, callback) => {
                    for (let index = 0; index < array.length; index++) {
                        await callback(array[index], index, array)
                    }
                }

                const search = async () => {
                    await asyncForEach(users, async (item) => {
                        let profile = await Profile.findOne({
                            user: item._id
                        }).populate('user', ['name', 'avatar'])
                        result.unshift(profile)
                    })
                    res.json(result)
                }

                search()
            }
        } else {
            res.json([])
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router
