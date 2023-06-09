import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';

import { API } from '../../config';

const Card = ({ blog }) => {
  const showBlogCategories = blog =>
    blog.categories.map((category, index) => (
      //* Good for SEO and UX
      <Link key={index} href={`/categories/${category.slug}`} className='btn btn-primary mr-1 ml-1 mt-3'>
        {category.name}
      </Link>
    ));

  const showBlogTags = blog =>
    blog.tags.map((tag, index) => (
      //* Good for SEO and UX
      <Link key={index} href={`/tags/${tag.slug}`} className='btn btn-outline-primary mr-1 ml-1 mt-3'>
        {tag.name}
      </Link>
    ));

  return (
    <div className='lead pb-4'>
      <header>
        <Link href={`/blogs/${blog.slug}`}>
          <h2 className='pt-3 pb-3 font-weight-bold'>{blog.title}</h2>
        </Link>
      </header>
      <section>
        <p className='mark ml-1 pt-2 pb-2'>
          Written by <Link href={`/profile/${blog.postedBy.username}`}>{blog.postedBy.username}</Link> | Created{' '}
          {moment(blog.created).fromNow()} | Modified {moment(blog.modified).fromNow()}
        </p>
      </section>
      <section>
        {showBlogCategories(blog)}
        {showBlogTags(blog)}
        <br />
        <br />
      </section>
      <div className='row'>
        <div className='col-md-4'>
          <section>
            <img
              className='img img-fluid'
              style={{ maxHeight: 'auto', width: 'auto' }}
              src={`${API}/blog/photo/${blog.slug}`}
              //* To find image via Google search (SEO)
              alt={blog.title}
            />
          </section>
        </div>
        <div className='col-md-8'>
          <section>
            <div className='pb-3'>{renderHTML(blog.excerpt)}</div>
            <Link href={`/blogs/${blog.slug}`} className='btn btn-primary pt-2'>
              Read more
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Card;
