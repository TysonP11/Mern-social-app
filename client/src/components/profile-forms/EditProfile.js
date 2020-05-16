import React, { Fragment, useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    createProfile,
    getCurrentProfile,
    deleteAccount
} from '../../actions/profile'
import Spinner from '../layout/Spinner'
import FileUpload from '../../util/FileUpload'

const EditProfile = ({
    profile: { profile, loading },
    createProfile,
    getCurrentProfile,
    deleteAccount,
    history
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

    const [displaySocialInputs, toggleSocialInputs] = useState(false)

    const uploadImage = newImage => {
      setImage(newImage)
    }

    useEffect(() => {
        if (!profile) getCurrentProfile()

        if (profile) {
            setBio(profile.bio)
            setWebsite(profile.website)
            setPhoneNumber(profile.phoneNumber)
            setTwitter(profile.twitter)
            setFacebook(profile.facebook)
            setLinkedin(profile.linkedin)
            setYoutube(profile.youtube)
            setInstagram(profile.instagram)
        }
    }, [loading, getCurrentProfile, profile])

    const onSubmit = (e) => {
        e.preventDefault(e)
        createProfile({
          bio: bio,
          youtube: youtube,
          twitter: twitter,
          linkedin: linkedin,
          instagram: instagram,
          facebook: facebook,
          website: website,
          phoneNumber: phoneNumber,
          avatar: image,
        }, history, true)

        console.log(profile)
    }

    return profile === null || loading ? (
        <Spinner></Spinner>
    ) : (
        <Fragment>
            <h1 className='large text-primary'>Create Your Profile</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Let's get some information to
                make your profile stand out
            </p>
            <small>* = required field</small>
            <main id='edit-profile'>
                <div className='edit-profile__container'>
                    <header className='edit-profile__header'>
                        {image === '' || image.length === 0 ? (<img src={profile.user.avatar} className='image-rounded large' />) : (<img src={image} className='image-rounded large' />)}
                        <label>
                          <FileUpload refreshFunction={uploadImage} />
                          <i className='fas fa-edit' />
                        </label>
                        <h4 className='edit-profile__username'>
                            {profile.user.name}
                        </h4>
                    </header>
                    <form
                        onSubmit={(e) => onSubmit(e)}
                        className='edit-profile__form'
                    >
                        <div className='form__row'>
                            <label className='form__label'>Website:</label>
                            <input
                                type='text'
                                placeholder='Website'
                                name='website'
                                value={website}
                                onChange={(event) => setWebsite(event.target.value)}
                                className='form__input'
                            />
                        </div>

                        <div className='form__row'>
                            <label className='form__label'>Bio:</label>
                            <textarea
                                placeholder='Let people know who you are.'
                                name='bio'
                                value={bio}
                                onChange={(event) => setBio(event.target.value)}
                            ></textarea>
                        </div>
                        <div className='form__row'>
                            <label className='form__label'>Phone Number:</label>
                            <input
                                type='text'
                                placeholder='Your phone number'
                                name='phoneNumber'
                                value={phoneNumber}
                                onChange={(event) => setPhoneNumber(event.target.value)}
                                className='form__input'
                            />
                        </div>
                        <div className='my-2'>
                            <button
                                onClick={() =>
                                    toggleSocialInputs(!displaySocialInputs)
                                }
                                type='button'
                                className='btn btn-light'
                            >
                                Add Social Network Links
                            </button>
                            <span>Optional</span>
                        </div>
                        {displaySocialInputs && (
                            <Fragment>
                                <div className='form__row'>
                                    <i className='fab fa-twitter fa-2x'></i>
                                    <input
                                        type='text'
                                        placeholder='Twitter URL'
                                        name='twitter'
                                        value={twitter}
                                        onChange={(event) => setTwitter(event.target.value)}
                                        className='form__input__social'
                                    />
                                </div>

                                <div className='form__row'>
                                    <i className='fab fa-facebook fa-2x'></i>
                                    <input
                                        type='text'
                                        placeholder='Facebook URL'
                                        name='facebook'
                                        value={facebook}
                                        onChange={(event) => setFacebook(event.target.value)}
                                        className='form__input__social'
                                    />
                                </div>

                                <div className='form__row'>
                                    <i className='fab fa-youtube fa-2x'></i>
                                    <input
                                        type='text'
                                        placeholder='YouTube URL'
                                        name='youtube'
                                        value={youtube}
                                        onChange={(event) => setYoutube(event.target.value)}
                                        className='form__input__social'
                                    />
                                </div>

                                <div className='form__row'>
                                    <i className='fab fa-linkedin fa-2x'></i>
                                    <input
                                        type='text'
                                        placeholder='Linkedin URL'
                                        name='linkedin'
                                        value={linkedin}
                                        onChange={(event) => setLinkedin(event.target.value)}
                                        className='form__input__social'
                                    />
                                </div>

                                <div className='form__row'>
                                    <i className='fab fa-instagram fa-2x'></i>
                                    <input
                                        type='text'
                                        placeholder='Instagram URL'
                                        name='instagram'
                                        value={instagram}
                                        onChange={(event) => setInstagram(event.target.value)}
                                        className='form__input__social'
                                    />
                                </div>
                            </Fragment>
                        )}
                        <input type='submit' className='btn btn-primary my-1' />
                        <Link className='btn btn-light my-1' to='/dashboard'>
                            Go Back
                        </Link>
                        <button
                            className='btn btn-danger'
                            onClick={() => deleteAccount()}
                        >
                            <i className='fas fa-user-minus'>
                                {' '}
                                Delete My Account{' '}
                            </i>
                        </button>
                    </form>
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
    profile: state.profile
})

export default connect(mapStateToProps, {
    createProfile,
    getCurrentProfile,
    deleteAccount
})(withRouter(EditProfile))
