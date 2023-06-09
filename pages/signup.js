import Head from 'next/head';

import SignupAuth from '../components/auth/SignupAuth';

function Signup() {
  return (
    <div>
      <Head>
        <title>SEO-Blog Signup Page</title>
        <meta name='description' content='Signup page of SEO-Blog' />
      </Head>
      <h2 className='text-center pt-4 pb-4'>Sign Up</h2>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <SignupAuth />
        </div>
      </div>
    </div>
  );
}

export default Signup;
