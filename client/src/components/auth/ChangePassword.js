import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'

import { changePassword } from '../../actions/auth'
import { setAlert } from '../../actions/alert'

const ChangePassword = ({ changePassword, setAlert, history }) => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    })

    const { currentPassword, newPassword, confirmNewPassword } = formData

    console.log(formData)

    const onChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const onSubmit = (event) => {
        console.log('onSubmit')
        event.preventDefault()
        console.log(confirmNewPassword !== newPassword)
        if (confirmNewPassword !== newPassword) {
            console.log('not match')
            setAlert('Password do not match', 'danger')
        } else {
            changePassword({ currentPassword, newPassword }, history)
        }
    }

    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <h2>Change Password</h2>
                <div className='form-row'>
                    <label className='title'>Current Password</label>
                    <input
                        type='password'
                        placeholder='Your current password'
                        name='currentPassword'
                        className='form-input'
                        value={currentPassword}
                        onChange={onChange}
                    />
                </div>

                <div className='form-row'>
                    <label className='title'>New Password</label>
                    <input
                        type='password'
                        placeholder='Your new password'
                        name='newPassword'
                        className='form-input'
                        value={newPassword}
                        onChange={onChange}
                    />
                </div>

                <div className='form-row'>
                    <label className='title'>Confirm New Password</label>
                    <input
                        type='password'
                        placeholder='Confirm your new password'
                        name='confirmNewPassword'
                        className='form-input'
                        value={confirmNewPassword}
                        onChange={onChange}
                    />
                </div>

                <input type='submit' className='btn btn-primary' />
            </form>
        </Fragment>
    )
}

ChangePassword.propTypes = {
    changePassword: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
}

export default connect(null, { changePassword, setAlert })(
    withRouter(ChangePassword)
)
