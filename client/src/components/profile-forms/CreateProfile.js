import React, { Fragment, useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createProfile } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import FileUpload from '../../util/FileUpload'
import { getCurrentProfile } from '../../actions/profile'

const CreateProfile = ({
    auth: { user, loading },
    profile,
    history,
    createProfile,
    getCurrentProfile,
}) => {
    const [bio, setBio] = useState('')
    const [youtube, setYoutube] = useState('')
    const [twitter, setTwitter] = useState('')
    const [instagram, setInstagram] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [facebook, setFacebook] = useState('')
    const [website, setWebsite] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const [image, setImage] = useState('')

    const uploadImage = (newImage) => {
        setImage(newImage)
    }

    useEffect(() => {
        // eslint-disable-next-line
        getCurrentProfile()
        // eslint-disable-next-line
        if (profile.profile) {
            setBio(profile.profile.bio)
            setWebsite(profile.profile.website)
            setPhoneNumber(profile.profile.phoneNumber)
            setTwitter(profile.profile.social.twitter)
            setFacebook(profile.profile.social.facebook)
            setLinkedin(profile.profile.social.linkedin)
            setYoutube(profile.profile.social.youtube)
            setInstagram(profile.profile.social.instagram)
        }
        // eslint-disable-next-line
    }, [profile.loading, getCurrentProfile])

    const onSubmit = (event) => {
        event.preventDefault(event)
        if (image === '') {
            console.log('onSubmit')
            createProfile(
                {
                    bio: bio,
                    youtube: youtube,
                    twitter: twitter,
                    linkedin: linkedin,
                    instagram: instagram,
                    facebook: facebook,
                    website: website,
                    phoneNumber: phoneNumber,
                    avatar: user.avatar,
                },
                history,
                false
            )
        } else {
            createProfile(
                {
                    bio: bio,
                    youtube: youtube,
                    twitter: twitter,
                    linkedin: linkedin,
                    instagram: instagram,
                    facebook: facebook,
                    website: website,
                    phoneNumber: phoneNumber,
                    avatar: image[0],
                },
                history,
                false
            )
        }
    }

    const tabItems = document.querySelectorAll('.tab-item')
    const tabContentItems = document.querySelectorAll('.tab-content-items')

    // select tab content item
    function selectItem() {
        addHide()
        removeBorder()
        removeShow()
        // add border to current tab
        this.classList.add('tab-border')
        // grab content item from DOM
        console.log(this.id)
        const tabContentItem = document.querySelector(`#${this.id}-content`)
        // add show class
        tabContentItem.classList.add('show')
    }

    // remove border
    function removeBorder() {
        tabItems.forEach((item) => item.classList.remove('tab-border'))
    }

    // remove show
    function removeShow() {
        tabContentItems.forEach((item) => item.classList.remove('show'))
    }

    // add hide class
    function addHide() {
        tabContentItems.forEach((item) => item.classList.add('hide'))
    }

    tabItems.forEach((item) => item.addEventListener('click', selectItem))

    return loading || profile.loading || user === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <div id='edit-profile-header'>
                <h1 className='large text-primary'>Create Your Profile</h1>
                <p className='lead'>
                    <i className='fas fa-user'></i> Let's get some information
                    to make your profile stand out
                </p>
            </div>
            <main id='edit-profile'>
                <div className='sidebar'>
                    <div id='tab-user-infor' className='tab-item tab-border'>
                        <p className='title'>User information</p>
                    </div>

                    <div id='tab-social-infor' className='tab-item'>
                        <p className='title'>Social information</p>
                    </div>

                    <div id='tab-user-password' className='tab-item'>
                        <p className='title'>Change password</p>
                    </div>
                </div>
                <div className='container'>
                    <header>
                        {image === '' || image.length === 0 ? (
                            <img
                                src={user.avatar}
                                className='image-rounded image-large'
                                alt={`${user.name} avatar`}
                            />
                        ) : (
                            <img
                                src={image[0]}
                                className='image-rounded image-large'
                                alt={`${user.name} avatar`}
                            />
                        )}
                        <label>
                            <FileUpload refreshFunction={uploadImage} />
                            <i className='fas fa-edit' />
                        </label>

                        <h3 className='edit-profile__username'>{user.name}</h3>
                    </header>
                    <form
                        onSubmit={(e) => onSubmit(e)}
                        className='edit-profile__form'
                    >
                        <div
                            className='tab-content-items show'
                            id='tab-user-infor-content'
                        >
                            <div className='form-row'>
                                <label className='title'>Website:</label>
                                <input
                                    type='text'
                                    placeholder='Website'
                                    name='website'
                                    value={website}
                                    onChange={(event) =>
                                        setWebsite(event.target.value)
                                    }
                                    className='form-input'
                                />
                            </div>

                            <div className='form-row'>
                                <label className='title'>Bio:</label>
                                <textarea
                                    placeholder='Let people know who you are.'
                                    name='bio'
                                    value={bio}
                                    onChange={(event) =>
                                        setBio(event.target.value)
                                    }
                                    className='form-input'
                                ></textarea>
                            </div>
                            <div className='form-row'>
                                <label className='title'>Phone Number:</label>
                                <input
                                    type='text'
                                    placeholder='Your phone number'
                                    name='phoneNumber'
                                    value={phoneNumber}
                                    onChange={(event) =>
                                        setPhoneNumber(event.target.value)
                                    }
                                    className='form-input'
                                />
                            </div>
                        </div>

                        <div
                            className='tab-content-items'
                            id='tab-social-infor-content'
                        >
                            <div className='form-row'>
                                <i className='fab fa-twitter fa-2x'></i>
                                <p className='title'> Twitter</p>
                                <input
                                    type='text'
                                    placeholder='Twitter URL'
                                    name='twitter'
                                    value={twitter}
                                    onChange={(event) =>
                                        setTwitter(event.target.value)
                                    }
                                    className='form-input'
                                />
                            </div>

                            <div className='form-row'>
                                <i className='fab fa-facebook fa-2x'></i>
                                <p className='title'> Facebook</p>
                                <input
                                    type='text'
                                    placeholder='Facebook URL'
                                    name='facebook'
                                    value={facebook}
                                    onChange={(event) =>
                                        setFacebook(event.target.value)
                                    }
                                    className='form-input'
                                />
                            </div>

                            <div className='form-row'>
                                <i className='fab fa-youtube fa-2x'></i>
                                <p className='title'> YouTube</p>
                                <input
                                    type='text'
                                    placeholder='YouTube URL'
                                    name='youtube'
                                    value={youtube}
                                    onChange={(event) =>
                                        setYoutube(event.target.value)
                                    }
                                    className='form-input'
                                />
                            </div>

                            <div className='form-row'>
                                <i className='fab fa-linkedin fa-2x'></i>
                                <p className='title'> Linkedin</p>
                                <input
                                    type='text'
                                    placeholder='Linkedin URL'
                                    name='linkedin'
                                    value={linkedin}
                                    onChange={(event) =>
                                        setLinkedin(event.target.value)
                                    }
                                    className='form-input'
                                />
                            </div>

                            <div className='form-row'>
                                <i className='fab fa-instagram fa-2x title'></i>
                                <p className='title'> Instagram</p>
                                <input
                                    type='text'
                                    placeholder='Instagram URL'
                                    name='instagram'
                                    value={instagram}
                                    onChange={(event) =>
                                        setInstagram(event.target.value)
                                    }
                                    className='form-input'
                                />
                            </div>
                        </div>

                        <div className='form-action'>
                            <input type='submit' className='btn btn-primary' />
                            <Link className='link-primary' to='/dashboard'>
                                Go Back
                            </Link>
                        </div>
                    </form>
                </div>
            </main>
        </Fragment>
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
}

const mapStatetoProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
})

export default connect(mapStatetoProps, { createProfile, getCurrentProfile })(
    withRouter(CreateProfile)
)
