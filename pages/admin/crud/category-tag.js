import AdminAuth from '../../../components/auth/AdminAuth';
import CategoryCRUD from '../../../components/crud/CategoryCRUD';
import TagCRUD from '../../../components/crud/TagCRUD';

const CategoryTag = () => {
  return (
    <AdminAuth>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12 pt-5 pb-5'>
            <h2>Manage Categories and Tags</h2>
          </div>
          <div className='col-md-6'>
            <CategoryCRUD />
          </div>
          <div className='col-md-6'>
            <TagCRUD />
          </div>
        </div>
      </div>
    </AdminAuth>
  );
};

export default CategoryTag;
