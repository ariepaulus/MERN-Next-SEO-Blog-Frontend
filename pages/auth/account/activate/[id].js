import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';

import { signup } from '../../../../actions/authAction';

const ActivateAccount = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    name: '',
    token: '',
    error: '',
    loading: false,
    success: false,
    showButton: true,
  });

  const { name, token, error, loading, success, showButton } = values;

  useEffect(() => {
    let token = router.query.id;
    if (token) {
      const { name } = jwt.decode(token);
      setValues({ ...values, name, token });
    }
  }, [router]);

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, loading: true, error: false });
    signup({ token }).then(data => {
      if (data && data.error) {
        setValues({ ...values, error: data.error, loading: false, showButton: false });
      } else {
        setValues({ ...values, loading: false, success: true, showButton: false });
      }
    });
  };

  const showLoading = () => (loading ? <h2>Loading...</h2> : '');

  return (
    <div className='container'>
      <h3 className='pb-4'>Hello {name}! Are you ready to activate your account?</h3>
      {showLoading()}
      {error && error}
      {success && 'Congratulations! You have successfully activated your account. Please sign in!'}
      {showButton && (
        <button className='btn btn-outline-primary' onClick={clickSubmit}>
          Activate Account
        </button>
      )}
    </div>
  );
};

export default ActivateAccount;
