import { Fragment, useState, useEffect } from 'react';
import Router from 'next/router';

import { isAuth, preSignup } from '../../actions/authAction';
import LoginGoogle from './LoginGoogle';

function SignupAuth() {
  const [values, setValues] = useState({
    name: 'Arie Verburgh',
    email: 'averburgh@gmail.com',
    password: 'test1234',
    error: '',
    loading: false,
    message: '',
    showForm: true,
  });

  const { name, email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && Router.push('/');
  }, []);

  const handleSubmit = event => {
    event.preventDefault();

    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };

    preSignup(user).then(data => {
      if (data && data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          loading: false,
          message: data.message,
          showForm: false,
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

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className='form-group pt-2 pb-2'>
          <input
            value={name}
            onChange={handleChange('name')}
            type='text'
            className='form-control'
            placeholder='Please enter your name!'
          />
        </div>
        <div className='form-group pb-2'>
          <input
            value={email}
            onChange={handleChange('email')}
            type='email'
            className='form-control'
            placeholder='Please enter your email address!'
          />
        </div>
        <div className='form-group pb-2'>
          <input
            value={password}
            onChange={handleChange('password')}
            type='password'
            className='form-control'
            placeholder='Please enter your password!'
          />
        </div>
        <div>
          <button className='btn btn-primary'>Sign Up</button>
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
      {showForm && signupForm()}
    </Fragment>
  );
}

export default SignupAuth;
