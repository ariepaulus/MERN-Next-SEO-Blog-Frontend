import { Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import moment from 'moment';

import { userPublicProfile } from '../../actions/userAction';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import ContactForm from '../../components/form/ContactForm';

//* This page is server-side rendered through ServerSideProps to ensure optimal SEO
const userProfile = ({ user, blogs, params }) => {
  // console.log('pages/blogs/[slug]/userProfile - params: ', params, 'user: ', user, 'blogs: ', blogs);
  const head = () => (
    <Head>
      //! Important for SEO
      <title>{`${user.username} | ${APP_NAME}`}</title>
      <meta name='description' content={`Blogs by ${user.username}`} />
      <link rel='canonical' href={`${DOMAIN}/profile/${params.username}`} />
      <meta property='og:title' content={`${user.username}| ${APP_NAME}`} />
      <meta property='og:description' content={`Blogs by ${user.username}`} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={`${DOMAIN}/profile/${params.username}`} />
      <meta property='og:site_name' content={`${APP_NAME}`} />
      <meta property='og:image' content={`${DOMAIN}/public/images/seoblog.jpg`} />
      <meta property='og:image:secure_url' content={`${DOMAIN}/public/images/seoblog.jpg`} />
      <meta property='og:image:type' content='image/jpg' />
      <meta property='fb:app_id' content={`${FB_APP_ID}`} />
    </Head>
  );

  const showUserBlogs = () => {
    return blogs.map((blog, index) => {
      return (
        <div className='mt-4 mb-4' key={index}>
          <Link href={`/blogs/${blog.slug}`} className='lead'>
            {blog.title}
          </Link>
        </div>
      );
    });
  };
  return (
    <Fragment>
      {head()}
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-md-8'>
                    <h5>{user.name}</h5>
                    <p className='text-muted'>{`Joined ${moment(user.created).fromNow()}`}</p>
                  </div>
                  <div className='col-md-4'>
                    <img
                      src={`${API}/user/photo/${user.username}`}
                      className='img img-fluid img-thumbnail mb-3'
                      style={{ maxHeight: '100px', maxWidth: '100%' }}
                      alt='User profile photo'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className='container pb-5'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-light'>
                  {`Recent blogs written by ${user.name}`}
                </h5>
                {showUserBlogs()}
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-light'>{`Send message to ${user.name}`}</h5>
                <br />
                <ContactForm authorEmail={user.email} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

//* SSR to ensure SEO
//? On the server-side the dynamic parameter is available as 'params'
export async function getServerSideProps(context) {
  // console.log('pages/blogs/[slug]/userProfile - getServerSideProps - context: ', context);
  const { params } = context;
  const data = await userPublicProfile(params.username);
  if (data && data.error) {
    console.log(data.error);
  } else {
    return {
      props: { user: data.user, blogs: data.blogs, params },
    };
  }
}

export default userProfile;
