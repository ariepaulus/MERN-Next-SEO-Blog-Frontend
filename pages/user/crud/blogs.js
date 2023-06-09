import UserAuth from '../../../components/auth/UserAuth';
import { isAuth } from '../../../actions/authAction';
import BlogRead from '../../../components/crud/BlogRead';

const Blog = () => {
  const username = isAuth() && isAuth().username;
  return (
    <UserAuth>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 pt-5 pb-5'>
            <h2>Update/delete blogs</h2>
          </div>
          <div className='col-md-12'>
            <BlogRead username={username} />
          </div>
        </div>
      </div>
    </UserAuth>
  );
};

export default Blog;
