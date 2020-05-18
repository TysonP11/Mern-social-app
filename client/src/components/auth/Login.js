import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

export const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

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
      <section className='container non-hide'>
                <h1 className='large text-primary'>Sign In</h1>
                <div className='auth-form'>
                    <i className='fas fa-user-circle fa-5x i-light' />
                    <form className='form' onSubmit={(e) => onSubmit(e)}>
                        <h3>Enter your account</h3>
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
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                type='submit'
                                className='btn btn-primary'
                                value='Login'
                            />
                            <small className='form-text'>
                                Don't have an account?
                                <Link to='/register'> Sign Up</Link>
                            </small>
                        </div>
                    </form>
                </div>
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
