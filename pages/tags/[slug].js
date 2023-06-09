import { Fragment } from 'react';
import Head from 'next/head';

import { DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import { singleTag } from '../../actions/tagsAction';
import Card from '../../components/blog/Card';

//* This is a server-side-rendered page
//? The props here comes from the 'getServerSideProps' function (see below)
const Tag = ({ tag, blogs, params }) => {
  const head = () => (
    <Head>
      //! Important for SEO
      <title>{`${tag.name} | ${APP_NAME}`}</title>
      <meta name='description' content={`Best programming tutorials on ${tag.name}`} />
      <link rel='canonical' href={`${DOMAIN}/categories/${params.slug}`} />
      <meta property='og:title' content={`${tag.name}| ${APP_NAME}`} />
      <meta property='og:description' content={`Best programming tutorials on ${tag.name}`} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={`${DOMAIN}/categories/${params.slug}`} />
      <meta property='og:site_name' content={`${APP_NAME}`} />
      <meta property='og:image' content={`${DOMAIN}/public/images/seoblog.jpg`} />
      <meta property='og:image:secure_url' content={`${DOMAIN}/public/images/seoblog.jpg`} />
      <meta property='og:image:type' content='image/jpg' />
      <meta property='fb:app_id' content={`${FB_APP_ID}`} />
    </Head>
  );

  return (
    <Fragment>
      {head()}

      <main>
        <div className='container-fluid text-center'>
          <header>
            <div className='col-md-12 pt-3'>
              <h1 className='display-4 font-weight-bold'>{tag.name}</h1>
              {blogs.map((b, i) => (
                <div>
                  <Card key={i} blog={b} />
                  <hr />
                </div>
              ))}
            </div>
          </header>
        </div>
      </main>
    </Fragment>
  );
};

//* SSR to ensure SEO
export async function getServerSideProps(context) {
  const { params } = context;
  const data = await singleTag(params.slug);
  if (data && data.error) {
    console.log(data.error);
  } else {
    return {
      props: { tag: data.tag, blogs: data.blogs, params },
    };
  }
}

// export async function getStaticProps({ params }) {
//   const data = await singleTag(params?.slug);
//   if (data && data.error) {
//     console.log(data.error);
//     return {
//       notFound: true, // Return a 404 page if the data fetching fails
//     };
//   } else {
//     return {
//       props: {
//         tag: data.tag,
//         blogs: data.blogs,
//         query: {
//           slug: params?.slug,
//         },
//       },
//     };
//   }
// }

export default Tag;
