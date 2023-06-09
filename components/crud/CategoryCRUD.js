import { Fragment, useState, useEffect } from 'react';
import { getCookie } from '../../actions/authAction';
import { create, getCategories, removeCategory } from '../../actions/categoriesAction';

const CategoryCRUD = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, categories, removed, reload } = values;
  const token = getCookie('token');

  useEffect(() => {
    loadCategories();
  }, [reload]);

  const loadCategories = () => {
    getCategories().then(data => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, categories: data });
      }
    });
  };

  const showCategories = () => {
    return categories.map((category, index) => {
      return (
        <button
          onDoubleClick={() => deleteConfirm(category.slug)}
          title='Double click to delete'
          key={index}
          className='btn btn-outline-primary mr-1 ml-1 mt-3'
        >
          {category.name}
        </button>
      );
    });
  };

  const deleteConfirm = slug => {
    let answer = window.confirm('Are you sure you want to delete this category?');
    if (answer) {
      deleteCategory(slug);
    }
  };

  const deleteCategory = slug => {
    removeCategory(slug, token).then(data => {
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
      return <p className='text-success'>Category has been created!</p>;
    }
  };

  const showError = () => {
    if (error) {
      return <p className='text-danger'>Category already exists!</p>;
    }
  };

  const showRemoved = () => {
    if (removed) {
      return <p className='text-danger'>Category has been removed!</p>;
    }
  };

  const mouseMoveHandler = () => {
    setValues({ ...values, error: false, success: false, removed: '' });
  };

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className='form-group'>
        <label className='text-bold font-weight-bolder'>Categories</label>
        <input type='text' className='form-control' onChange={handleChange} value={name} required />
      </div>
      <div>
        <button type='submit' className='btn btn-primary'>
          Create Category
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
        {newCategoryForm()}
        {showCategories()}
      </div>
    </Fragment>
  );
};

export default CategoryCRUD;
