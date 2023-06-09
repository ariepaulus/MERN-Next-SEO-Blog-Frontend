import { Fragment, useEffect } from 'react';
import Router from 'next/router';

import { isAuth } from '../../actions/authAction';

const UserAuth = ({ children }) => {
  useEffect(() => {
    if (!isAuth()) {
      Router.push(`/signin`);
    }
  }, []);
  return <Fragment>{children}</Fragment>;
};

export default UserAuth;
