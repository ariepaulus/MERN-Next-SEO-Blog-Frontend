import { Fragment, useState, useEffect } from 'react';
import { getCookie } from '../../actions/authAction';
import { create, getTags, removeTag } from '../../actions/tagsAction';

const TagCRUD = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    tags: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, tags, removed, reload } = values;
  const token = getCookie('token');

  useEffect(() => {
    loadTags();
  }, [reload]);

  const loadTags = () => {
    getTags().then(data => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, tags: data });
      }
    });
  };

  const showTags = () => {
    return tags.map((tag, index) => {
      return (
        <button
          onDoubleClick={() => deleteConfirm(tag.slug)}
          title='Double click to delete'
          key={index}
          className='btn btn-outline-primary mr-1 ml-1 mt-3'
        >
          {tag.name}
        </button>
      );
    });
  };

  const deleteConfirm = slug => {
    let answer = window.confirm('Are you sure you want to delete this tag?');
    if (answer) {
      deleteTag(slug);
    }
  };

  const deleteTag = slug => {
    removeTag(slug, token).then(data => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, error: false, success: false, name: '', removed: !removed, reload: !reload });
      }
    });
  };

  const clickSubmit = event => {
    event.preventDefault();
    create({ name }, token).then(data => {
      if (data && data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({ ...values, error: false, success: true, name: '', removed: false, reload: !reload });
      }
    });
  };

  const handleChange = event => {
    setValues({ ...values, name: event.target.value, error: false, success: false, removed: '' });
  };

  const showSuccess = () => {
    if (success) {
      return <p className='text-success'>Tag has been created!</p>;
    }
  };

  const showError = () => {
    if (error) {
      return <p className='text-danger'>Tag already exists!</p>;
    }
  };

  const showRemoved = () => {
    if (removed) {
      return <p className='text-danger'>Tag has been removed!</p>;
    }
  };

  const mouseMoveHandler = () => {
    setValues({ ...values, error: false, success: false, removed: '' });
  };

  const newTagForm = () => (
    <form onSubmit={clickSubmit}>
      <div className='form-group'>
        <label className='text-bold font-weight-bolder'>Tags</label>
        <input type='text' className='form-control' onChange={handleChange} value={name} required />
      </div>
      <div>
        <button type='submit' className='btn btn-primary'>
          Create Tag
        </button>
      </div>
    </form>
  );

  return (
    <Fragment>
      {showSuccess()}
      {showError()}
      {showRemoved()}
      <div onMouseMove={mouseMoveHandler}>
        {newTagForm()}
        {showTags()}
      </div>
    </Fragment>
  );
};

export default TagCRUD;
