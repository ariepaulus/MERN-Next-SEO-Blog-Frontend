import Head from 'next/head';

import SigninAuth from '../components/auth/SigninAuth';

function Signin() {
  return (
    <div>
      <Head>
        <title>SEO-Blog Signin Page</title>
        <meta name='description' content='Signin page of SEO-Blog' />
      </Head>
      <h2 className='text-center pt-4 pb-4'>Sign In</h2>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <SigninAuth />
        </div>
      </div>
    </div>
  );
}

export default Signin;
