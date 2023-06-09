import { useState } from 'react';
import { useRouter } from 'next/router';

import { resetPassword } from '../../../../actions/authAction';

const ResetPassword = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    name: '',
    newPassword: '',
    error: '',
    message: '',
    showForm: true,
  });

  const { showForm, name, newPassword, error, message } = values;

  const handleSubmit = event => {
    event.preventDefault();
    resetPassword({
      newPassword,
      resetPasswordLink: router.query.id, //* It is 'id' because the filename is [id].js
    }).then(data => {
      if (data && data.error) {
        setValues({ ...values, error: data.error, showForm: false, newPassword: '' });
      } else {
        setValues({ ...values, message: data.message, showForm: false, newPassword: '', error: false });
      }
    });
  };

  const passwordResetForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group pt-5'>
        <input
          type='password'
          onChange={event => setValues({ ...values, newPassword: event.target.value })}
          className='form-control'
          value={newPassword}
          placeholder='Please provide a new password!'
          required
        />
      </div>
      <div>
        <button className='btn btn-primary'>Change password</button>
      </div>
    </form>
  );

  const showError = () => (error ? <div className='alert alert-danger'>{error}</div> : '');
  const showMessage = () => (message ? <div className='alert alert-success'>{message}</div> : '');

  return (
    <div className='container'>
      <h2>Reset password</h2>
      <hr />
      {showError()}
      {showMessage()}
      {passwordResetForm()}
    </div>
  );
};

export default ResetPassword;
