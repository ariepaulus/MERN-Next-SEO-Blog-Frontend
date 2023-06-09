import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { getCookie } from '../../actions/authAction';
import { getCategories } from '../../actions/categoriesAction';
import { getTags } from '../../actions/tagsAction';
import { createBlog } from '../../actions/blogsAction';
import { QuillModules, QuillFormats } from '../../helpers/quillHelper';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const BlogCreate = () => {
  //* Getting access to parameters in the route (url) so that component reloads
  const router = useRouter();

  const BlogFromLS = () => {
    if (typeof window === undefined) {
      return false;
    }

    try {
      if (localStorage.getItem('blog')) {
        return JSON.parse(localStorage.getItem('blog'));
      }
    } catch (error) {
      console.log(error);
    }

    // if (localStorage.getItem('blog')) {
    //   return JSON.parse(localStorage.getItem('blog'));
    // } else {
    //   return false;
    // }
  };

  //* Setting various states
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checkedCat, setCheckedCat] = useState([]); //* Categories
  const [checkedTag, setCheckedTag] = useState([]); //* Tags

  const [body, setBody] = useState(BlogFromLS());
  const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    formData: new FormData(),
    title: '',
    hidePublishButton: false,
  });

  const { error, sizeError, success, formData, title, hidePublishButton } = values;
  const token = getCookie('token');

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
    initTags();
  }, [router]);

  const initCategories = () => {
    getCategories().then(data => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const initTags = () => {
    getTags().then(data => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  const publishBlog = event => {
    event.preventDefault();
    //* The token comes from cookie
    createBlog(formData, token).then(data => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: '',
          error: '',
          success: `A new blog titled "${title}" has been created!`,
        });

        setBody(''); //* Also clears local storage
        setCategories([]);
        setTags([]);
      }
    });
  };

  const handleChange = val => event => {
    const value = val === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(val, value);
    setValues({ ...values, [val]: value, formData, error: '' });
  };

  const handleBody = event => {
    setBody(event);
    formData.set('body', event);
    if (typeof window !== undefined) {
      try {
        localStorage.setItem('blog', JSON.stringify(event));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCatsToggle = category => () => {
    setValues({ ...values, error: '' });
    //* Return the first index or -1
    const clickedCategory = checkedCat.indexOf(category);
    const all = [...checkedCat];

    if (clickedCategory === -1) {
      all.push(category);
    } else {
      all.splice(clickedCategory, 1);
    }
    setCheckedCat(all);
    formData.set('categories', all);
  };

  const handleTagsToggle = tag => () => {
    setValues({ ...values, error: '' });
    //* Return the first index or -1
    const clickedTag = checkedTag.indexOf(tag);
    const all = [...checkedTag];

    if (clickedTag === -1) {
      all.push(tag);
    } else {
      all.splice(clickedTag, 1);
    }
    setCheckedTag(all);
    formData.set('tags', all);
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((category, index) => (
        <li key={index} className='list-unstyled'>
          <input onChange={handleCatsToggle(category._id)} type='checkbox' className='mr-2' />
          <label className='form-check-label'>{category.name}</label>
        </li>
      ))
    );
  };

  const showTags = () => {
    return (
      tags &&
      tags.map((tag, index) => (
        <li key={index} className='list-unstyled'>
          <input onChange={handleTagsToggle(tag._id)} type='checkbox' className='mr-2' />
          <label className='form-check-label'>{tag.name}</label>
        </li>
      ))
    );
  };

  const showError = () => (
    <div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>
      {error}
    </div>
  );

  const showSuccess = () => (
    <div className='alert alert-success' style={{ display: success ? '' : 'none' }}>
      {success}
    </div>
  );

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className='form-group'>
          <label className='text-muted'>Title</label>
          <input type='text' className='form-control' value={title} onChange={handleChange('title')} />
        </div>

        <div className='form-group'>
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={body}
            placeholder='Write something amazing...!'
            onChange={handleBody}
          />
        </div>

        <div>
          <button type='submit' className='btn btn-primary'>
            Publish blog
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className='container-fluid pb-5'>
      <div className='row'>
        <div className='col-md-8'>
          {createBlogForm()}
          <div className='pt-3'>
            {showError()}
            {showSuccess()}
          </div>
        </div>

        <div className='col-md-4'>
          <div>
            <div className='form-group pb-2'>
              <h5>Featured image</h5>
              <hr />
              <small className='text-muted'>Max size: less than 1MB</small>
              <br />
              <label className='btn btn-outline-info'>
                Upload featured image
                <input onChange={handleChange('photo')} type='file' accept='image/*' hidden />
              </label>
            </div>
          </div>

          <div>
            <h5>Categories</h5>
            <hr />
            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showCategories()}</ul>
          </div>

          <div className='pt-4'>
            <h5>Tags</h5>
            <hr />
            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showTags()}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCreate;
