import AdminAuth from '../../../components/auth/AdminAuth';
import BlogRead from '../../../components/crud/BlogRead';

const Blog = () => {
  return (
    <AdminAuth>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 pt-5 pb-5'>
            <h2>Update/delete blogs</h2>
          </div>
          <div className='col-md-12'>
            <BlogRead />
          </div>
        </div>
      </div>
    </AdminAuth>
  );
};

export default Blog;
