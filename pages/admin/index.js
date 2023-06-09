import Link from 'next/link';
import { Fragment } from 'react';

import AdminAuth from '../../components/auth/AdminAuth';

const AdminIndex = () => {
  return (
    <Fragment>
      <AdminAuth>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12 pt-5 pb-5'>
              <h2>Admin Dashboard</h2>
            </div>
            <div className='col-md-4'>
              <ul className='list-group'>
                <li className='list-group-item'>
                  <Link href='/admin/crud/category-tag'>Create Category</Link>
                </li>
                <li className='list-group-item'>
                  <Link href='/admin/crud/category-tag'>Create Tag</Link>
                </li>
                <li className='list-group-item'>
                  <Link href='/admin/crud/blog'>Create Blog</Link>
                </li>
                <li className='list-group-item'>
                  <Link href='/admin/crud/blogs'>Update/Delete Blog</Link>
                </li>
                <li className='list-group-item'>
                  <Link href='/user/update'>Update Profile</Link>
                </li>
              </ul>
            </div>
            <div className='col-md-8'></div>
          </div>
        </div>
      </AdminAuth>
    </Fragment>
  );
};

export default AdminIndex;
