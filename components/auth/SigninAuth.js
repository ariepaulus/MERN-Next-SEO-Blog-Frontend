import { Fragment, useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';

import { signin, authenticate, isAuth } from '../../actions/authAction';
import LoginGoogle from './LoginGoogle';

const SigninAuth = () => {
  //* Set and update state
  const [values, setValues] = useState({
    email: 'averburgh@gmail.com',
    password: 'test1234',
    error: '',
    loading: false,
    message: '',
    showForm: true,
  });

  const { email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && Router.push('/');
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    signin(user).then(data => {
      if (data && data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        //* Save user token to cookie
        //* Save user info to local storage
        //* Authenticate user
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push(`/admin`);
          } else {
            Router.push(`/user`);
          }
        });
      }
    });
  };

  const handleChange = val => event => {
    setValues({ ...values, error: false, [val]: event.target.value });
  };

  const showLoading = () => (loading ? <div className='alert alert-info'>Loading...</div> : '');
  const showError = () => (error ? <div className='alert alert-danger'>{error}</div> : '');
  const showMessage = () => (message ? <div className='alert alert-info'>{message}</div> : '');

  const signinForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            value={email}
            onChange={handleChange('email')}
            type='email'
            className='form-control'
            placeholder='Enter your email address, please!'
          />
        </div>
        <div className='form-group'>
          <input
            value={password}
            onChange={handleChange('password')}
            type='password'
            className='form-control'
            placeholder='Enter your password, please!'
          />
        </div>
        <div>
          <button className='btn btn-primary'>Sign In</button>
        </div>
      </form>
    );
  };
  return (
    <Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}
      <LoginGoogle />
      {showForm && signinForm()}
      <br />
      <Link href='/auth/password/forgot' className='btn btn-outline-danger btn-sm'>
        Forgot password
      </Link>
    </Fragment>
  );
};

export default SigninAuth;
