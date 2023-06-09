import { Fragment, useEffect } from 'react';
import Router from 'next/router';

import { isAuth } from '../../actions/authAction';

const AdminAuth = ({ children }) => {
  useEffect(() => {
    if (!isAuth()) {
      Router.push(`/signin`);
    } else if (isAuth().role !== 1) {
      Router.push(`/`);
    }
  }, []);
  return <Fragment>{children}</Fragment>;
};

export default AdminAuth;
