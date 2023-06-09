import UserAuth from '../../../components/auth/UserAuth';
import BlogUpdate from '../../../components/crud/BlogUpdate';

const Blog = () => {
  return (
    <UserAuth>
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
    </UserAuth>
  );
};

export default Blog;
