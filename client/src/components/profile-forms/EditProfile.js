import React, { Fragment, useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    createProfile,
    getCurrentProfile,
    deleteAccount,
} from '../../actions/profile'
import Spinner from '../layout/Spinner'
import FileUpload from '../../util/FileUpload'
import ChangePassword from '../auth/ChangePassword'

const EditProfile = ({
    profile: { profile, loading },
    auth,
    createProfile,
    getCurrentProfile,
    deleteAccount,
    history,
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
        if (profile) {
            setBio(profile.bio)
            setWebsite(profile.website)
            setPhoneNumber(profile.phoneNumber)
            setTwitter(profile.social.twitter)
            setFacebook(profile.social.facebook)
            setLinkedin(profile.social.linkedin)
            setYoutube(profile.social.youtube)
            setInstagram(profile.social.instagram)
        }
        // eslint-disable-next-line
    }, [loading, getCurrentProfile])

    const onSubmit = (e) => {
        e.preventDefault(e)

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
                    avatar: auth.user.avatar,
                },
                history,
                true
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
                true
            )
        }
    }

    const tabItems = document.querySelectorAll('.tab-item')
    const tabContentItems = document.querySelectorAll('.tab-content-items')

    const formHeader = document.querySelector('.form-header')
    const formAction = document.querySelector('.form-action')

    // select tab content item
    function selectItem() {
        addHide()
        removeBorder()
        removeShow()
        // add border to current tab
        this.classList.add('tab-border')
        // grab content item from DOM
        if (this.id === 'tab-user-password') {
            formHeader.classList.remove('show')
            formHeader.classList.add('hide')
            formAction.classList.remove('show')
            formAction.classList.add('hide')
        } else {
            formHeader.classList.remove('hide')
            formHeader.classList.add('show')
            formAction.classList.remove('hide')
            formAction.classList.add('show')
        }
        const tabContentItem = document.querySelector(`#${this.id}-content`)

        // add show class
        tabContentItem.classList.add('show')

        console.log(this.id)

        
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

    return profile === null || loading || auth.loading ? (
        <Spinner></Spinner>
    ) : (
        <Fragment>
            <div id='edit-profile-header'>
                <h1 className='large text-primary'>Update Your Profile</h1>
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
                    <header className='form-header'>
                        <div className='form-header-content'>
                            {image === '' || image.length === 0 ? (
                                <img
                                    src={profile.user.avatar}
                                    className='image-rounded image-large'
                                    alt={`${profile.user.name} avatar`}
                                />
                            ) : (
                                <img
                                    src={image[0]}
                                    className='image-rounded image-large'
                                    alt={`${profile.user.name} avatar`}
                                />
                            )}
                            <label>
                                <FileUpload refreshFunction={uploadImage} />
                                <i className='fas fa-edit' />
                            </label>
                            <h3 className='edit-profile__username'>
                                {auth.user.name}
                            </h3>
                        </div>
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

                    <div
                        className='tab-content-items'
                        id='tab-user-password-content'
                    >
                        <ChangePassword />
                    </div>

                    <button
                        className='btn btn-danger'
                        onClick={() => {
                            console.log('deleteAccount')
                            deleteAccount()
                        }}
                    >
                        <i className='fas fa-user-minus' /> Delete My Account
                    </button>
                </div>
            </main>
        </Fragment>
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
})

export default connect(mapStateToProps, {
    createProfile,
    getCurrentProfile,
    deleteAccount,
})(withRouter(EditProfile))
