const express = require('express')
const auth = require('../../middleware/auth')
const router = express.Router()
const { validationResult } = require('express-validator')
const gravatar = require('gravatar')

const Profile = require('../../models/Profile')
const User = require('../../models/Users')
const Post = require('../../models/Post')

// @route       POST api/profile/upload-image
// @ desc       Post profile image
// @access      Private
router.post('/upload-image', auth, async (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No image uploaded' })
    }

    const file = req.files.file

    const fileName = `${Date.now()}-${file.name}`

    file.mv(`./uploads/${fileName}`, (err) => {
        if (err) {
            console.error(err)
            return res.status(500).send(err.msg)
        }

        res.json({ fileName: fileName, filePath: `/uploads/${fileName}` })
    })
})

// @route       GET api/profile/me
// @ desc       Get current user profile
// @access      Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id,
        }).populate('user', ['name', 'avatar'])

        if (!profile) {
            return res
                .status(400)
                .json({ msg: 'There is no profile for this user.' })
        }
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private

router.post('/', auth, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {
        bio,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook,
        website,
        phoneNumber,
        avatar,
    } = req.body

    console.log(website)

    const profileFields = {}
    profileFields.user = req.user.id
    profileFields.bio = bio
    profileFields.website = website
    profileFields.phoneNumber = phoneNumber

    // Build social object and add to profileFields
    profileFields.social = {}
    profileFields.social.youtube = youtube
    profileFields.social.twitter = twitter
    profileFields.social.facebook = facebook
    profileFields.social.linkedin = linkedin
    profileFields.social.instagram = instagram

    try {
        await User.findByIdAndUpdate(
            { _id: req.user.id },
            { avatar: avatar.toString() }
        )

        let profile = await Profile.findOne({ user: req.user.id })
        if (profile) {
            //Update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields }
            )

            return res.json(profile)
        }

        // Create
        profile = new Profile(profileFields)
        await profile.save()
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// @route       GET api/profile/
// @ desc       Get all users profile
// @access      Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', [
            'name',
            'avatar',
        ])
        res.json(profiles)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// @route       GET api/followedprofile
// @ desc       Get all followed profile
// @access      Public
router.get('/followedprofile', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id,
        }).populate('user', ['name', 'avatar'])

        const following = profile.following

        const profiles = []

        async function asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array)
            }
        }
        const start = async () => {
            await asyncForEach(following, async (element) => {
                let f = await Profile.findOne({
                    user: element.user,
                }).populate('user', ['name', 'avatar'])

                profiles.unshift(f)
            })
            res.json(profiles)
        }
        start()
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// @route       GET api/profile/user/:user_id
// @ desc       Get profile by user id
// @access      Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.user_id,
        }).populate('user', ['name', 'avatar'])

        if (!profile) return res.status(400).json({ msg: 'Profile not Found!' })

        res.json(profile)
    } catch (err) {
        console.error(err.message)
        if (err.kind == 'ObjectID') {
            return res.status(400).json({ msg: 'Profile not Found!' })
        }
        res.status(500).send('Server Error')
    }
})

// @route       DELETE api/profile/
// @ desc       delete profile, user and post
// @access      Private
router.delete('/', auth, async (req, res) => {
    try {
        //@todo - remove user's posts
        await User.findOneAndRemove({ _id: req.user.id })
        await Profile.findOneAndRemove({ user: req.user.id })
        res.json({ msg: 'user deleted' })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// @route       PUT api/profile/follow/:id
// @ desc       follow an user
// @access      Private
router.put('/follow/:id', auth, async (req, res) => {
    try {
        const followedProfile = await Profile.findById(req.params.id)
        const followingProfile = await Profile.findOne({ user: req.user.id })

        if (!followedProfile) {
            return res.status(404).json({ msg: 'Profile not Found' })
        }

        if (
            followedProfile.followers.filter(
                (follower) => follower.user.toString() === req.user.id
            ).length > 0
        ) {
            return res
                .status(400)
                .json({ msg: 'You are already following this Profile' })
        }

        followedProfile.followers.unshift({ user: req.user.id })

        followingProfile.following.unshift({ user: followedProfile.user._id })

        await followingProfile.save()
        await followedProfile.save()

        res.json({ followedProfile, followingProfile })
    } catch (err) {
        console.error(err.message)
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not Found.' })
        }
        res.status(500).send('Server Error')
    }
})

// @route       PUT api/profile/unfollow/:id
// @ desc       unfollow an user
// @access      Private

router.put('/unfollow/:id', auth, async (req, res) => {
    try {
        const followedProfile = await Profile.findById(req.params.id)
        const followingProfile = await Profile.findOne({ user: req.user.id })

        if (!followedProfile) {
            return res.status(404).json({ msg: 'Profile not Found' })
        }

        if (
            followedProfile.followers.filter(
                (follower) => follower.user.toString() === req.user.id
            ).length === 0
        ) {
            return res
                .status(400)
                .json({ msg: 'You are not following this Profile' })
        }

        const removeFollowerIndex = followedProfile.followers
            .map((follower) => follower.user.toString())
            .indexOf(req.user.id)

        followedProfile.followers.splice(removeFollowerIndex, 1)

        const followedUserId = followedProfile.user._id

        const removeFollowedIndex = followingProfile.following
            .map((following) => following.user)
            .indexOf(followedUserId)

        followingProfile.following.splice(removeFollowedIndex, 1)

        await followingProfile.save()
        await followedProfile.save()

        res.json({ followedProfile, followingProfile })
    } catch (err) {
        console.error(err.message)
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not Found.' })
        }
        res.status(500).send('Server Error')
    }
})

// @route GET api/profile/:user_id
// @desc See all posts made by an user
// @access Public

router.get('/:user_id', async (req, res) => {
    try {
        const posts = await Post.find({ user: req.params.user_id }).sort({
            date: -1,
        })

        res.json(posts)
    } catch (err) {
        console.error(err.message)
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not Found.' })
        }
        res.status(500).send('Server Error')
    }
})

module.exports = router
