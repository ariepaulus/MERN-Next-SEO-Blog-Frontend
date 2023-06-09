import Link from 'next/link';
import { Fragment, useState, useEffect } from 'react';
import moment from 'moment';

import { getCookie, isAuth } from '../../actions/authAction';
import { list, removeBlog } from '../../actions/blogsAction';

const BlogRead = ({ username }) => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState('');
  //* The token is required to update or delete a blog
  const token = getCookie('token');

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    try {
      list(username).then(data => {
        if (data && data.error) {
          console.log(data.error);
        } else {
          setBlogs(data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = slug => {
    removeBlog(slug, token).then(data => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setMessage(data.message);
        loadBlogs();
      }
    });
  };

  const deleteConfirm = slug => {
    let answer = window.confirm('Are you sure you want to delete this blog?');
    if (answer) {
      deleteBlog(slug);
    }
  };

  const showUpdateButton = blog => {
    if (isAuth() && isAuth().role === 0) {
      return (
        <Link href={`/user/crud/${blog.slug}`} className='btn btn-sm btn-warning'>
          Update
        </Link>
      );
    } else if (isAuth() && isAuth().role === 1) {
      return (
        <Link href={`/admin/crud/${blog.slug}`} className='btn btn-sm btn-warning'>
          Update
        </Link>
      );
    }
  };

  const showAllBlogs = () => {
    return blogs.map((blog, index) => {
      return (
        <div key={index} className='pb-5'>
          <h3>{blog.title}</h3>
          <p className='mark'>
            Written by {blog.postedBy.username} | Created {moment(blog.created).fromNow()} | Modified{' '}
            {moment(blog.modified).fromNow()}
          </p>
          {showUpdateButton(blog)}
          <button className='ml-2 btn btn-sm btn-danger' onClick={() => deleteConfirm(blog.slug)}>
            Delete
          </button>
        </div>
      );
    });
  };

  return (
    <Fragment>
      <div className='row'>
        <div className='col-md-12'>
          {message && <div className='alert alert-warning'>{message}</div>}
          {showAllBlogs()}
        </div>
      </div>
    </Fragment>
  );
};

export default BlogRead;
