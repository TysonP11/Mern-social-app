import React, { Fragment, useState } from "react"
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { createProfile } from "../../actions/profile"
import Spinner from "../layout/Spinner"
import FileUpload from "../../util/FileUpload"

function CreateProfile(props) {
    // const [formData, setFormData] = useState({
    //   bio: '',
    //   youtube: '',
    //   twitter: '',
    //   instagram: '',
    //   linkedin: '',
    //   facebook: '',
    //   website: '',
    //   phoneNumber: '',
    // });

    const { auth: { user, loading } } = props

    const [bio, setBio] = useState("")
    const [youtube, setYoutube] = useState("")
    const [twitter, setTwitter] = useState("")
    const [instagram, setInstagram] = useState("")
    const [linkedin, setLinkedin] = useState("")
    const [facebook, setFacebook] = useState("")
    const [website, setWebsite] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const [displaySocialInputs, toggleSocialInputs] = useState(false)

    const [Image, setImage] = useState([])

    const uploadImage = (newImage) => {
        setImage(newImage)
    }

    // const {
    //   bio,
    //   website,
    //   phoneNumber,
    //   youtube,
    //   twitter,
    //   instagram,
    //   linkedin,
    //   facebook,
    // } = formData;

    // const onChange = (e) =>
    //   setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault(e)
        props.createProfile({
            bio: bio,
            youtube: youtube,
            twitter: twitter,
            linkedin: linkedin,
            instagram: instagram,
            facebook: facebook,
            website: website,
            phoneNumber: phoneNumber,
            avatar: Image,
        })
        props.history.push("/dashboard")
    }

    return loading ? (
        <Spinner></Spinner>
    ) : (
        <Fragment>
            <h1 className="large text-primary">Create Your Profile</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to
                make your profile stand out
            </p>
            <small>* = required field</small>
            <main id="edit-profile">
                <div className="edit-profile__container">
                    <header className="edit-profile__header">
                        <div className="edit-profile__avatar-container">
                            <FileUpload refreshFunction={uploadImage} />
                        </div>
                        <h4 className="edit-profile__username">{user.name}</h4>
                    </header>
                    <form onSubmit={onSubmit} className="edit-profile__form">
                        <div className="form__row">
                            <label className="form__label">Website:</label>
                            <input
                                type="text"
                                placeholder="Website"
                                name="website"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                className="form__input"
                            />
                        </div>

                        <div className="form__row">
                            <label className="form__label">Bio:</label>
                            <textarea
                                placeholder="Let people know who you are."
                                name="bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="form__row">
                            <label className="form__label">Phone Number:</label>
                            <input
                                type="text"
                                placeholder="Your phone number"
                                name="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="form__input"
                            />
                        </div>
                        <div className="my-2">
                            <button
                                onClick={() =>
                                    toggleSocialInputs(!displaySocialInputs)
                                }
                                type="button"
                                className="btn btn-light"
                            >
                                Add Social Network Links
                            </button>
                            <span>Optional</span>
                        </div>
                        {displaySocialInputs && (
                            <Fragment>
                                <div className="form-group social-input">
                                    <i className="fab fa-twitter fa-2x"></i>
                                    <input
                                        type="text"
                                        placeholder="Twitter URL"
                                        name="twitter"
                                        value={twitter}
                                        onChange={(e) =>
                                            setTwitter(e.target.value)
                                        }
                                        className="form__input"
                                    />
                                </div>

                                <div className="form-group social-input">
                                    <i className="fab fa-facebook fa-2x"></i>
                                    <input
                                        type="text"
                                        placeholder="Facebook URL"
                                        name="facebook"
                                        value={facebook}
                                        onChange={(e) =>
                                            setFacebook(e.target.value)
                                        }
                                        className="form__input"
                                    />
                                </div>

                                <div className="form-group social-input">
                                    <i className="fab fa-youtube fa-2x"></i>
                                    <input
                                        type="text"
                                        placeholder="YouTube URL"
                                        name="youtube"
                                        value={youtube}
                                        onChange={(e) =>
                                            setYoutube(e.target.value)
                                        }
                                        className="form__input"
                                    />
                                </div>

                                <div className="form-group social-input">
                                    <i className="fab fa-linkedin fa-2x"></i>
                                    <input
                                        type="text"
                                        placeholder="Linkedin URL"
                                        name="linkedin"
                                        value={linkedin}
                                        onChange={(e) =>
                                            setLinkedin(e.target.value)
                                        }
                                        className="form__input"
                                    />
                                </div>

                                <div className="form-group social-input">
                                    <i className="fab fa-instagram fa-2x"></i>
                                    <input
                                        type="text"
                                        placeholder="Instagram URL"
                                        name="instagram"
                                        value={instagram}
                                        onChange={(e) =>
                                            setInstagram(e.target.value)
                                        }
                                        className="form__input"
                                    />
                                </div>
                            </Fragment>
                        )}
                        <input type="submit" className="btn btn-primary my-1" />
                    </form>
                </div>
            </main>
        </Fragment>
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStatetoProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStatetoProps, { createProfile })(
    withRouter(CreateProfile)
)
