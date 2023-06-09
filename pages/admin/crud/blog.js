import AdminAuth from '../../../components/auth/AdminAuth';
import BlogCreate from '../../../components/crud/BlogCreate';

const Blog = () => {
  return (
    <AdminAuth>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12 pt-5 pb-5'>
            <h2>Create a new blog</h2>
          </div>
          <div className='col-md-12 pt-5 pb-5'>
            <BlogCreate />
          </div>
        </div>
      </div>
    </AdminAuth>
  );
};

export default Blog;
