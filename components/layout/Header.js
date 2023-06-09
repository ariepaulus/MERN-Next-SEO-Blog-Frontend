//* 'dynamic' is used to prevent the dreader hydration error by forcing only client-side rendering
import dynamic from 'next/dynamic';
import { Fragment, useState } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
import Router from 'next/router';

import { APP_NAME } from '../../config';
import { isAuth, signout } from '../../actions/authAction';
import Search from '../blog/Search';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Fragment>
      <Navbar color='light' light expand='md'>
        <NavLink href='/' className='font-weight-bold'>
          {APP_NAME}
        </NavLink>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto' navbar>
            <Fragment>
              <NavItem>
                <NavLink href='/blogs'>Blogs</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/contact'>Contact</NavLink>
              </NavItem>
            </Fragment>

            {!isAuth() && (
              <Fragment>
                <NavItem>
                  <NavLink href='/signup' className='nav-link '>
                    Sign Up
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href='/signin' className='nav-link '>
                    Sign In
                  </NavLink>
                </NavItem>
              </Fragment>
            )}

            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                <NavLink href='/user' style={{ cursor: 'pointer' }}>
                  {`User: ${isAuth().name}'s Dashboard`}
                </NavLink>
              </NavItem>
            )}
            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                <NavLink href='/admin' style={{ cursor: 'pointer' }}>
                  {`Admin: ${isAuth().name}'s Dashboard`}
                </NavLink>
              </NavItem>
            )}

            {isAuth() && (
              <NavItem>
                <NavLink
                  className='nav-link '
                  style={{ cursor: 'pointer' }}
                  onClick={() => signout(() => Router.replace(`/signin`))}
                >
                  Sign Out
                </NavLink>
              </NavItem>
            )}

            <NavItem>
              <NavLink href='/user/crud/blog' className='btn btn-primary text-light'>
                Write a blog
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Search />
    </Fragment>
  );
};

export default dynamic(() => Promise.resolve(Header), { ssr: false });
