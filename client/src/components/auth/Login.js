import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

export const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const responseGoogle = (res) => {
    console.log('google', res);
  };

  const responseFacebook = (res) => {
    console.log('facebook', res);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if Loged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Sign In</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Sign in with your Account
        </p>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
              minLength='8'
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Login' />
        </form>
        <p className='my-1'>
          Don't have an Account? <Link to='/register'>Sign Up</Link>
        </p>
        <FacebookLogin
          appId='332181767747129'
          autoLoad={true}
          textButton='Facebook'
          fields='name, email, picture'
          callback={responseFacebook}
          cssClass='btn btn-primary'
        />

        <GoogleLogin
          clientId='113765765033-i4gafkqoaqmpl5qke12nrbqhh0jknd95.apps.googleusercontent.com'
          buttonText='Google'
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cssClass='btn btn-light'
        />
      </section>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStatetoProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStatetoProps, { login })(Login);
