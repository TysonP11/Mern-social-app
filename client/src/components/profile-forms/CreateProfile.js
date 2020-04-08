import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ auth: { user }, createProfile, history }) => {
  const [formData, setFormData] = useState({
    bio: '',
    youtube: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    facebook: '',
    website: '',
    phoneNumber: '',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    bio,
    website,
    phoneNumber,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault(e);
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <main id='edit-profile'>
        <div className='edit-profile__container'>
          <header className='edit-profile__header'>
            <div className='edit-profile__avatar-container'>
              <img src={user.avatar} className='edit-profile__avatar' />
            </div>
            <h4 className='edit-profile__username'>{user.name}</h4>
          </header>
          <form onSubmit={(e) => onSubmit(e)} className='edit-profile__form'>
            <div className='form__row'>
              <label className='form__label'>Website:</label>
              <input
                type='text'
                placeholder='Website'
                name='website'
                value={website}
                onChange={(e) => onChange(e)}
                className='form__input'
              />
            </div>

            <div className='form__row'>
              <label for='bio' className='form__label'>
                Bio:
              </label>
              <textarea
                placeholder='Let people know who you are.'
                name='bio'
                value={bio}
                onChange={(e) => onChange(e)}
              ></textarea>
            </div>
            <div className='form__row'>
              <label className='form__label'>Phone Number:</label>
              <input
                type='text'
                placeholder='Your phone number'
                name='phoneNumber'
                value={phoneNumber}
                onChange={(e) => onChange(e)}
                className='form__input'
              />
            </div>
            <div className='my-2'>
              <button
                onClick={() => toggleSocialInputs(!displaySocialInputs)}
                type='button'
                className='btn btn-light'
              >
                Add Social Network Links
              </button>
              <span>Optional</span>
            </div>
            {displaySocialInputs && (
              <Fragment>
                <div className='form-group social-input'>
                  <i className='fab fa-twitter fa-2x'></i>
                  <input
                    type='text'
                    placeholder='Twitter URL'
                    name='twitter'
                    value={twitter}
                    onChange={(e) => onChange(e)}
                    className='form__input'
                  />
                </div>

                <div className='form-group social-input'>
                  <i className='fab fa-facebook fa-2x'></i>
                  <input
                    type='text'
                    placeholder='Facebook URL'
                    name='facebook'
                    value={facebook}
                    onChange={(e) => onChange(e)}
                    className='form__input'
                  />
                </div>

                <div className='form-group social-input'>
                  <i className='fab fa-youtube fa-2x'></i>
                  <input
                    type='text'
                    placeholder='YouTube URL'
                    name='youtube'
                    value={youtube}
                    onChange={(e) => onChange(e)}
                    className='form__input'
                  />
                </div>

                <div className='form-group social-input'>
                  <i className='fab fa-linkedin fa-2x'></i>
                  <input
                    type='text'
                    placeholder='Linkedin URL'
                    name='linkedin'
                    value={linkedin}
                    onChange={(e) => onChange(e)}
                    className='form__input'
                  />
                </div>

                <div className='form-group social-input'>
                  <i className='fab fa-instagram fa-2x'></i>
                  <input
                    type='text'
                    placeholder='Instagram URL'
                    name='instagram'
                    value={instagram}
                    onChange={(e) => onChange(e)}
                    className='form__input'
                  />
                </div>
              </Fragment>
            )}
            <input type='submit' className='btn btn-primary my-1' />
            <Link className='btn btn-light my-1' to='/dashboard'>
              Go Back
            </Link>
          </form>
        </div>
      </main>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStatetoProps, { createProfile })(
  withRouter(CreateProfile)
);
