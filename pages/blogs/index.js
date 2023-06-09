import { Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { listBlogsWithCategoriesAndTags } from '../../actions/blogsAction';
import Card from '../../components/blog/Card';
import { DOMAIN, APP_NAME, FB_APP_ID } from '../../config';

//* This is a server-side-rendered page
const Blogs = ({ blogs, categories, tags, totalBlogs, blogsLimit, blogSkip }) => {
  //* Getting the path for the current route file that comes after /pages
  const router = useRouter();

  //! Setting up head section for SEO
  const head = () => (
    <Head>
      <title>{`Programming Blogs | ${APP_NAME}`}</title>
      <meta
        name='description'
        content='Programming blogs and tutorials on React, Node, Next, Vue, PHP, Laravel, and Web Development'
      />
      <link rel='canonical' href={`${DOMAIN}${router.pathname}`} />
      <meta property='og:title' content={`Latest web development tutorials | ${APP_NAME}`} />
      <meta
        property='og:description'
        content='Programming blogs and tutorials on React Node Next Vue PHP Laravel and Web Development'
      />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={`${DOMAIN}${router.pathname}`} />
      <meta property='og:site_name' content={`${APP_NAME}`} />
      <meta property='og:image' content={`${DOMAIN}/public/images/seoblog.jpg`} />
      <meta property='og:image:secure_url' content={`${DOMAIN}/public/images/seoblog.jpg`} />
      <meta property='og:image:type' content='image/jpg' />
      <meta property='fb:app_id' content={`${FB_APP_ID}`} />
    </Head>
  );

  //* Setting up key state values
  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const loadMore = () => {
    let toSkip = skip + limit;
    //* If any undefined result, consider using a try...catch block
    listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
      // console.log('pages/blogs/index - Blogs - listBlogsWithCategoriesAndTags: ', data);
      if (data && data.error) {
        console.log(data.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className='btn btn-primary btn-lg'>
          Load more
        </button>
      )
    );
  };

  const showAllBlogs = () => {
    return blogs.map((blog, index) => {
      return (
        <article key={index}>
          <Card blog={blog} />
          <hr />
        </article>
      );
    });
  };

  const showAllCategories = () => {
    return categories.map((category, index) => (
      <Link href={`/categories/${category.slug}`} key={index} className='btn btn-primary mr-1 ml-1 mt-3'>
        {category.name}
      </Link>
    ));
  };

  const showAllTags = () => {
    return tags.map((tag, index) => (
      <Link href={`/tags/${tag.slug}`} key={index} className='btn btn-outline-primary mr-1 ml-1 mt-3'>
        {tag.name}
      </Link>
    ));
  };

  const showLoadedBlogs = () => {
    return loadedBlogs.map((blog, index) => (
      <article key={index}>
        <Card blog={blog} />
      </article>
    ));
  };

  return (
    <Fragment>
      {head()}
      <main>
        <div className='container-fluid'>
          <header>
            <div className='col-md-12 pt-3'>
              <h1 className='display-4 font-weight-bold text-center'>Programming blogs and tutorials</h1>
            </div>
            <section>
              <div className='pb-5 text-center'>
                {showAllCategories()}
                <br />
                {showAllTags()}
              </div>
            </section>
          </header>
        </div>
        <div className='container-fluid'>{showAllBlogs()}</div>
        <div className='container-fluid'>{showLoadedBlogs()}</div>
        <div className='text-center pt-5 pb-5'>{loadMoreButton()}</div>
      </main>
    </Fragment>
  );
};

//* To server-side-render our page (SSR)
//? This is good for SEO as the true code is available the very first time the page loads, unlike with React SPAs
export async function getServerSideProps() {
  //* When there are more blogs, the limit can/should be increased
  let skip = 0;
  let limit = 5;
  const data = await listBlogsWithCategoriesAndTags(skip, limit);
  if (data && data.error) {
    console.log(data.error);
  } else {
    return {
      props: {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size,
        blogsLimit: limit,
        blogSkip: skip,
      },
    };
  }
}

//! This is deprecated code - replace by either getStaticProps or getServerSideProps
// Blogs.getInitialProps = async () => {
//   //* When there are more blogs, the limit can/should be increased
//   let skip = 0;
//   let limit = 2;
//   const data = await listBlogsWithCategoriesAndTags(skip, limit);
//   if (data && data.error) {
//     console.log(data.error);
//   } else {
//     return {
//       blogs: data.blogs,
//       categories: data.categories,
//       tags: data.tags,
//       totalBlogs: data.size,
//       blogsLimit: limit,
//       blogSkip: skip,
//     };
//   }
// };

export default Blogs;
