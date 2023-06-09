import Head from 'next/head';
import { NavLink } from 'reactstrap';
import { Fragment } from 'react';

function Index() {
  return (
    <Fragment>
      <Head>
        <title>SEO-Blog Home Page</title>
        <meta name='description' content='Index page of SEO-Blog' />
      </Head>
      <article className='overflow-hidden'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 text-center'>
              <h1 className='display-4 font-weight-bold'>Language Editing & Web Development Blogs/Tutorials</h1>
              <h2>Welcome, Friend!</h2>
              <h3>This is a blog that is optimised for search engine optimisation.</h3>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 text-center pt-4 pb-5'>
              <h4>
                Please participate in writing and reading blogs on these subjects so that we can learn from each other!
              </h4>
            </div>
          </div>
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-4'>
              <div className='flip flip-horizontal'>
                <div
                  className='front'
                  style={{
                    backgroundImage: 'url(' + 'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg' + ')',
                  }}
                >
                  <h2 className='text-shadow text-center h1'>React</h2>
                </div>
                <div className='back text-center'>
                  <NavLink href='/categories/react'>
                    <h3 className='h1'>React-JS</h3>
                  </NavLink>
                  <p className='lead'>The world's most popular frontend web development library</p>
                </div>
              </div>
            </div>

            <div className='col-md-4'>
              <div className='flip flip-horizontal'>
                <div
                  className='front'
                  style={{
                    backgroundImage: 'url(' + 'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg' + ')',
                  }}
                >
                  <h2 className='text-shadow text-center h1'>Node</h2>
                </div>
                <div className='back text-center'>
                  <NavLink href='/categories/node.js'>
                    <h3 className='h1'>Node-JS</h3>
                  </NavLink>
                  <p className='lead'>The world's most popular backend development tool for JavaScript developers</p>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='flip flip-horizontal'>
                <div
                  className='front'
                  style={{
                    backgroundImage: 'url(' + 'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg' + ')',
                  }}
                >
                  <h2 className='text-shadow text-center h1'>Next</h2>
                </div>
                <div className='back text-center'>
                  <NavLink href='/categories/next.js'>
                    <h3 className='h1'>Next-JS</h3>
                  </NavLink>
                  <p className='lead'>A production-ready web framework for building SEO React apps</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Fragment>
  );
}

export default Index;
