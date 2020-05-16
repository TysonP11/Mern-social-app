import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'

export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul>
            <li>
                <Link to='/home'>
                    <i className='fa fa-home fa-2x'></i>
                </Link>
            </li>
            <li>
                <Link to='/profiles'>
                    <i className='fas fa-users fa-2x'></i>
                </Link>
            </li>
            <li>
                <Link to='/posts'>
                    <i className='fas fa-hamburger fa-2x'></i>
                </Link>
            </li>
            <li>
                <Link to='/dashboard'>
                    <i className='fas fa-user fa-2x'></i>
                </Link>
            </li>
            <li>
                <a onClick={logout} href='/register'>
                    <i className='fas fa-sign-out-alt fa-2x'></i>
                </a>
            </li>
        </ul>
    )

    const guestLinks = (
        <ul>
            <li>
                <Link to='/profiles'>
                    <i className='fas fa-search fa-2x'></i>
                </Link>
            </li>
            <li>
                <Link to='/register'>
                    <i className='fas fa-user-plus fa-2x'></i>
                </Link>
            </li>
            <li>
                <Link to='/login'>
                    <i className='fas fa-sign-in-alt fa-2x'></i>
                </Link>
            </li>
        </ul>
    )

    return (
        <nav className='navbar'>
            <div className='container'>
                <h1>
                    <Link to='/'>
                        <i className='fas fa-search-location'></i> Hapi
                    </Link>
                </h1>
                {!loading && (
                    <Fragment>
                        {isAuthenticated ? authLinks : guestLinks}
                    </Fragment>
                )}
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { logout })(Navbar)
