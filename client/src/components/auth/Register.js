import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'
import PropTypes from 'prop-types'

export const Register = ({
    setAlert,
    register,
    auth: { isAuthenticated, loading },
}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const { name, email, password, password2 } = formData

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== password2) {
            setAlert('Password do not match', 'danger')
        } else {
            register({ name, email, password })
        }
    }

    if (isAuthenticated) {
        return <Redirect to='/create-profile' />
    }
    return (
        <Fragment>
          
            <section className='container non-hide'>
                <h1 className='large text-primary'>Sign Up</h1>
                <div className='auth-form'>
                    <i className='fas fa-user-circle fa-5x i-light' />
                    <form className='form' onSubmit={(e) => onSubmit(e)}>
                        <h3>Create your account</h3>
                        <div className='form-group'>
                            <input
                                type='text'
                                placeholder='Username'
                                name='name'
                                value={name}
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                type='email'
                                placeholder='Email Address'
                                name='email'
                                value={email}
                                onChange={(e) => onChange(e)}
                            />
                            <small className='form-text'>
                                This site uses Gravatar so if you want a profile
                                image, use a Gravatar email
                            </small>
                        </div>
                        <div className='form-group'>
                            <input
                                type='password'
                                placeholder='Password'
                                name='password'
                                value={password}
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                type='password'
                                placeholder='Confirm Password'
                                name='password2'
                                value={password2}
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                        <div className='form-group'>
                          <Link to='#' className='btn social-auth' id='google-link'>
                            <i className='fab fa-google' /> Register with Gmail
                          </Link>
                          <Link to='#' className='btn social-auth' id='facebook-link'>
                          <i className='fab fa-facebook' /> Register with Facebook
                          </Link>
                        </div>
                        <div className='form-group'>
                            <input
                                type='submit'
                                className='btn btn-primary'
                                value='Register'
                            />
                            <small className='form-text'>
                                Already have an account?
                                <Link to='/login'> Sign In</Link>
                            </small>
                        </div>
                    </form>
                </div>
            </section>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    auth: PropTypes.object,
}

const mapStatetoProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStatetoProps, { setAlert, register })(Register)
