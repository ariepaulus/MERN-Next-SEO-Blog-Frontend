import { useState } from 'react';

import { forgotPassword } from '../../../actions/authAction';

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: '',
    message: '',
    error: '',
    showForm: true,
  });

  const { email, message, error, showForm } = values;

  const handleChange = val => event => {
    setValues({ ...values, message: '', error: '', [val]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setValues({ ...values, message: '', error: '' });
    forgotPassword({ email }).then(data => {
      if (data & data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, message: data.message, email: '', showForm: false });
      }
    });
  };

  const showError = () => (error ? <div className='alert alert-danger'>{error}</div> : '');
  const showMessage = () => (message ? <div className='alert alert-success'>{message}</div> : '');

  const passwordForgotForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group pt-5'>
        <input
          type='email'
          onChange={handleChange('email')}
          className='form-control'
          value={email}
          placeholder='Please provide your email address!'
          required
        />
      </div>
      <div>
        <button className='btn btn-primary'>Send password reset link</button>
      </div>
    </form>
  );

  return (
    <div className='container'>
      <h2>Forgot password</h2>
      <hr />
      {showError()}
      {showMessage()}
      {showForm && passwordForgotForm()}
    </div>
  );
};

export default ForgotPassword;
