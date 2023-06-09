import Link from 'next/link';
import { Fragment } from 'react';

import UserAuth from '../../components/auth/UserAuth';

const UserIndex = () => {
  return (
    <Fragment>
      <UserAuth>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12 pt-5 pb-5'>
              <h2>User Dashboard</h2>
            </div>
            <div className='col-md-4'>
              <ul className='list-group'>
                <li className='list-group-item'>
                  <Link href='/user/crud/blog'>Create Blog</Link>
                </li>
                <li className='list-group-item'>
                  <Link href='/user/crud/blogs'>Update/Delete Blog</Link>
                </li>
                <li className='list-group-item'>
                  <Link href='/user/update'>Update Profile</Link>
                </li>
              </ul>
            </div>
            <div className='col-md-8'></div>
          </div>
        </div>
      </UserAuth>
    </Fragment>
  );
};

export default UserIndex;
