import Router from 'next/router';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

import { authenticate, isAuth, loginWithGoogle } from '../../actions/authAction';
import { GOOGLE_CLIENT_ID } from '../../config';

const LoginGoogle = () => {
  const clientId = GOOGLE_CLIENT_ID;

  const credentialResponse = response => {
    // console.log(response);
    const tokenId = response.credential;
    // console.log(tokenId);
    const user = { tokenId };

    loginWithGoogle(user).then(data => {
      if (data && data.error) {
        console.log(data.error);
      } else {
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

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        clientId={clientId}
        onSuccess={credentialResponse}
        onFailure={() => {
          console.log('Login failed!');
        }}
        theme='dark'
      />
    </GoogleOAuthProvider>
  );
};

export default LoginGoogle;
