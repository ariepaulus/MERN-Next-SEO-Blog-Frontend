import AdminAuth from '../../../components/auth/AdminAuth';
import BlogUpdate from '../../../components/crud/BlogUpdate';

const Blog = () => {
  return (
    <AdminAuth>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12 pt-5 pb-5'>
            <h2>Update blog</h2>
          </div>
          <div className='col-md-12'>
            <BlogUpdate />
          </div>
        </div>
      </div>
    </AdminAuth>
  );
};

export default Blog;
