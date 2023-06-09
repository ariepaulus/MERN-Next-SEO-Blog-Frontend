import Head from 'next/head';
import Link from 'next/link';
import { Fragment, useState, useEffect } from 'react';
import renderHTML from 'react-render-html';
import moment from 'moment';

import { singleBlog, listRelated } from '../../actions/blogsAction';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import DisqusThread from '../../components/layout/DisqusThread';

import SmallCard from '../../components/blog/SmallCard';

//* This is a server-side-rendered page
//? The props here comes from the 'getServerSideProps' function (see below)
const SingleBlog = ({ blog, query }) => {
  const [related, setRelated] = useState([]);

  const loadRelated = () => {
    listRelated({ blog }).then(data => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setRelated(data);
      }
    });
  };

  useEffect(() => {
    loadRelated();
  }, []);

  const head = () => (
    <Head>
      //! Important for SEO
      <title>{`${blog.title} | ${APP_NAME}`}</title>
      <meta name='description' content={blog.mdesc} />
      <link rel='canonical' href={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property='og:title' content={`${blog.title} | ${APP_NAME}`} />
      <meta property='og:description' content={blog.mdesc} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property='og:site_name' content={`${APP_NAME}`} />
      <meta property='og:image' content={`${API}/blog/photo/${blog.slug}`} />
      <meta property='og:image:secure_url' content={`${API}/blog/photo/${blog.slug}`} />
      <meta property='og:image:type' content='image/jpg' />
      <meta property='fb:app_id' content={`${FB_APP_ID}`} />
    </Head>
  );

  const showBlogCategories = blog =>
    blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`} className='btn btn-primary mr-1 ml-1 mt-3'>
        {c.name}
      </Link>
    ));

  const showBlogTags = blog =>
    blog.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`} className='btn btn-outline-primary mr-1 ml-1 mt-3'>
        {t.name}
      </Link>
    ));

  const showRelatedBlog = () => {
    return related.map((blog, i) => (
      <div className='col-md-4' key={i}>
        <article key={i}>
          <SmallCard blog={blog} />
        </article>
      </div>
    ));
  };

  const showComments = () => {
    return (
      <div>
        <DisqusThread id={blog._id} title={blog.title} path={`/blog/${blog.slug}`} />
      </div>
    );
  };

  return (
    <Fragment>
      {head()}
      <main>
        <article>
          <div className='container-fluid'>
            <section>
              <div className='row' style={{ marginTop: '-30px' }}>
                <img src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} className='img img-fluid featured-image' />
              </div>
            </section>

            <section>
              <div className='container'>
                <h1 className='display-2 pb-3 pt-3 text-center font-weight-bold'>{blog.title}</h1>
                <p className='lead mt-3 mark'>
                  Written by <Link href={`/profile/${blog.postedBy.username}`}>{blog.postedBy.username}</Link> | Created{' '}
                  {moment(blog.created).fromNow()} | Modified {moment(blog.modified).fromNow()}
                </p>

                <div className='pb-3'>
                  {showBlogCategories(blog)}
                  {showBlogTags(blog)}
                  <br />
                  <br />
                </div>
              </div>
            </section>
          </div>

          <div className='container'>
            <section>
              <div className='col-md-12 lead'>{renderHTML(blog.body)}</div>
            </section>
          </div>

          <div className='container'>
            <h4 className='text-center pt-5 pb-5 h2'>Related blogs</h4>
            <div className='row'>{showRelatedBlog()}</div>
          </div>

          <div className='container pb-5 pt-5'>{showComments()}</div>
        </article>
      </main>
    </Fragment>
  );
};

//* SSR to ensure SEO
export async function getServerSideProps(context) {
  const { query } = context;
  const data = await singleBlog(query.slug);
  if (data && data.error) {
    console.log(data.error);
  } else {
    return {
      props: {
        blog: data,
        query,
      },
    };
  }
}

//* Deprecated code
// SingleBlog.getInitialProps = async ({ query }) => {
//   const data = await singleBlog(query.slug);
//   if (data && data.error) {
//     console.log(data.error);
//   } else {
//     return { blog: data, query };
//   }
// };

export default SingleBlog;
