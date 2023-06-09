import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { getCookie, isAuth } from '../../actions/authAction';
import { getCategories } from '../../actions/categoriesAction';
import { getTags } from '../../actions/tagsAction';
import { singleBlog, updateBlog } from '../../actions/blogsAction';
import { QuillModules, QuillFormats } from '../../helpers/quillHelper';
import { API } from '../../config';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const BlogUpdate = () => {
  //* Using router to access the slug in the route
  const router = useRouter();

  //* Setting various states
  const [body, setBody] = useState('');

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checkedCat, setCheckedCat] = useState([]); //* Categories
  const [checkedTag, setCheckedTag] = useState([]); //* Tags

  const [values, setValues] = useState({
    title: '',
    error: '',
    success: '',
    formData: new FormData(),
    body: '',
  });

  const { error, success, formData, title } = values;
  const token = getCookie('token');

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initBlog();
    initCategories();
    initTags();
  }, [router]);

  const initBlog = () => {
    if (router.query.slug) {
      singleBlog(router.query.slug).then(data => {
        if (data && data.error) {
          console.log(data.error);
        } else {
          setValues({ ...values, title: data.title });
          setBody(data.body);
          setCategoriesArray(data.categories);
          setTagsArray(data.tags);
        }
      });
    }
  };

  const setCategoriesArray = blogCategories => {
    let categories = [];
    // blogCategories.map((category, index) => {
    //   categories.push(category._id);
    // });
    for (let i = 0; i < blogCategories.length; i++) {
      categories.push(blogCategories[i]._id);
    }
    setCheckedCat(categories);
  };

  const setTagsArray = blogTags => {
    let tags = [];
    // blogTags.map((tag, index) => {
    //   tags.push(tag._id);
    // });
    for (let i = 0; i < blogTags.length; i++) {
      tags.push(blogTags[i]._id);
    }
    setCheckedTag(tags);
  };

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

  const handleCatsToggle = category => () => {
    setValues({ ...values, error: '' });
    // return the first index or -1
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
    // return the first index or -1
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

  const findOutCategory = category => {
    const result = checkedCat.indexOf(category);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const findOutTag = tag => {
    const result = checkedTag.indexOf(tag);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((category, index) => (
        <li key={index} className='list-unstyled'>
          <input
            onChange={handleCatsToggle(category._id)}
            checked={findOutCategory(category._id)}
            type='checkbox'
            className='mr-2'
          />
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
          <input onChange={handleTagsToggle(tag._id)} checked={findOutTag(tag._id)} type='checkbox' className='mr-2' />
          <label className='form-check-label'>{tag.name}</label>
        </li>
      ))
    );
  };

  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: '' });
  };

  const handleBody = event => {
    setBody(event);
    if (typeof event === undefined) {
      return;
    }
    formData.set('body', event);
  };

  const editBlog = event => {
    event.preventDefault();
    updateBlog(formData, token, router.query.slug).then(data => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, title: '', success: `Blog titled "${data.title}" has been successfully updated!` });
        if (isAuth() && isAuth().role === 1) {
          // Router.replace(`/admin/crud/${router.query.slug}`);
          Router.replace(`/admin`);
        } else if (isAuth() && isAuth().role === 0) {
          // Router.replace(`/user/crud/${router.query.slug}`);
          Router.replace(`/user`);
        }
      }
    });
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

  const updateBlogForm = () => {
    return (
      <form onSubmit={editBlog}>
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
            Update
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className='container-fluid pb-5'>
      <div className='row'>
        <div className='col-md-8'>
          {updateBlogForm()}

          <div className='pt-3'>
            {showSuccess()}
            {showError()}
          </div>

          {body && <img src={`${API}/blog/photo/${router.query.slug}`} alt={title} style={{ width: '100%' }} />}
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
          <div>
            <h5>Tags</h5>
            <hr />

            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showTags()}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogUpdate;
