import { Fragment, useState, useEffect } from 'react';

import { getCookie, updateUser } from '../../actions/authAction';
import { getProfile, update } from '../../actions/userAction';
import { API } from '../../config';

const ProfileUpdateAuth = () => {
  const [values, setValues] = useState({
    username: '',
    username_for_photo: '',
    name: '',
    email: '',
    about: '',
    photo: '',
    password: '',
    error: false,
    success: false,
    loading: false,
    userData: '',
  });

  const token = getCookie('token');

  const { username, username_for_photo, name, email, about, photo, password, error, success, loading, userData } =
    values;

  const init = async () => {
    let data;
    try {
      data = await getProfile(token);
    } catch (error) {
      console.log('Error: ', error);
    }

    if (data && data.error) {
      // console.log('components/auth/ProfileUpdateAuth - data: ', data);
      setValues({ ...values, error: data.error });
    } else {
      setValues({
        ...values,
        username: data.username,
        username_for_photo: data.username,
        name: data.name,
        email: data.email,
        about: data.about,
        photo: data.photo,
      });
    }
  };

  //* Loading stored user profile information into the state for populating the form
  useEffect(() => {
    init();
    setValues({ ...values, userData: new FormData() });
  }, []);

  const handleChange = val => event => {
    const value = val === 'photo' ? event.target.files[0] : event.target.value;
    let userFormData = new FormData();
    userFormData.set(val, value);
    setValues({ ...values, [val]: value, userData: userFormData, error: false, success: false });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setValues({ ...values, loading: true });
    update(token, userData).then(data => {
      if (data && data.error) {
        setValues({ ...values, error: data.error, success: false, loading: false });
      } else {
        updateUser(data, () => {
          setValues({
            ...values,
            username: data.username,
            name: data.name,
            email: data.email,
            about: data.about,
            photo: data.photo,
            password: '',
            success: true,
            loading: false,
          });
        });
      }
    });
  };

  const profileUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label className='btn btn-outline-info'>
          Upload profile photo
          <input onChange={handleChange('photo')} type='file' accept='image/*' hidden />
        </label>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Username</label>
        <input onChange={handleChange('username')} type='text' value={username || ''} className='form-control' />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input onChange={handleChange('name')} type='text' value={name || ''} className='form-control' />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input onChange={handleChange('email')} type='text' value={email || ''} className='form-control' />
      </div>
      <div className='form-group'>
        <label className='text-muted'>About</label>
        <textarea onChange={handleChange('about')} type='text' value={about || ''} className='form-control' />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input onChange={handleChange('password')} type='password' value={password} className='form-control' />
      </div>
      <div>
        {showSuccess()}
        {showError()}
        {showLoading()}
      </div>
      <div>
        <button type='submit' className='btn btn-primary'>
          Submit updated profile
        </button>
      </div>
    </form>
  );

  const showError = () => (
    <div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>
      {error}
    </div>
  );

  const showSuccess = () => {
    <div className='alert alert-success' style={{ display: success ? '' : 'none' }}>
      Profile updated
    </div>;
  };

  const showLoading = () => {
    <div className='alert alert-info' style={{ display: loading ? '' : 'none' }}>
      Loading...
    </div>;
  };

  return (
    <Fragment>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <img
              src={`${API}/user/photo/${username_for_photo}`}
              className='img img-fluid img-thumbnail mb-3'
              style={{ maxHeight: 'auto', maxWidth: '100%' }}
              alt='User profile photo'
            />
          </div>
          <div className='col-md-8 mb-5'>{profileUpdateForm()}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileUpdateAuth;
