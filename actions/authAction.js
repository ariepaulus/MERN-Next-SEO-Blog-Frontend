import Router from 'next/router';
import cookie from 'js-cookie';

import { API } from '../config';

export const handleResponse = response => {
  if (response.status === 401) {
    signout(() => {
      Router.push({
        pathname: '/signin',
        query: {
          message: 'Your session has expired! Please sign in again.',
        },
      });
    });
  }
};

export const preSignup = async user => {
  try {
    const response = await fetch(`${API}/pre-signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const signup = async user => {
  try {
    const response = await fetch(`${API}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const signin = async user => {
  try {
    const response = await fetch(`${API}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const signout = async next => {
  removeCookie('token');
  removeLocalStorage('user');
  next();

  try {
    await fetch(`${API}/signout`, {
      method: 'GET',
    });
    // console.log('You have signed out successfully!');
  } catch (err) {
    return console.log(err);
  }
};

//* Set cookie
export const setCookie = (key, value) => {
  //? Check whether on client side
  if (typeof window !== undefined) {
    return cookie.set(key, value, {
      expires: 1, //* 1 day
    });
  }
};

//* Remove cookie
export const removeCookie = key => {
  //? Check whether on client side
  if (typeof window !== undefined) {
    return cookie.remove(key, {
      expires: 1, //* 1 day
    });
  }
};

//* Get cookie to validate and authenticate user
export const getCookie = key => {
  //? Check whether on client side
  if (typeof window !== undefined) {
    return cookie.get(key);
  }
};

//* Set cookie in local storage
export const setLocalStorage = (key, value) => {
  //? Check whether on client side
  if (typeof window !== undefined) {
    return localStorage.setItem(key, JSON.stringify(value));
  }
};

//* Remove cookie from local storage
export const removeLocalStorage = key => {
  //? Check whether on client side
  if (typeof window !== undefined) {
    return localStorage.removeItem(key);
  }
};

//* Authenticate user by passing data to cookie and local storage
export const authenticate = (data, next) => {
  try {
    setCookie('token', data.token);
    setLocalStorage('user', data.user);
  } catch (err) {
    console.log('Error: ', err.message);
  }

  next();
};

export const isAuth = () => {
  //? Check whether on client side
  if (typeof window !== undefined) {
    const cookieChecked = getCookie('token');
    if (cookieChecked) {
      if (localStorage.getItem('user')) {
        try {
          const result = JSON.parse(localStorage.getItem('user'));
          return result;
        } catch (err) {
          console.log('Error: ', err.message);
        }
        // return JSON.parse(localStorage.getItem('user'));
      } else {
        return false;
      }
    }
  }
};

export const updateUser = (user, next) => {
  if (typeof window !== undefined) {
    if (localStorage.getItem('user')) {
      if (localStorage.getItem('user')) {
        try {
          let auth = JSON.parse(localStorage.getItem('user'));
          auth = user;
          localStorage.setItem('user', JSON.stringify(auth));
        } catch (err) {
          console.log('Error: ', err.message);
        }
        // let auth = JSON.parse(localStorage.getItem('user'));
        // auth = user;
        // localStorage.setItem('user', JSON.stringify(auth));
        next();
      }
    }
  }
};

export const forgotPassword = async email => {
  try {
    const response = await fetch(`${API}/forgot-password`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email),
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const resetPassword = async resetInfo => {
  try {
    const response = await fetch(`${API}/reset-password`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resetInfo),
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const loginWithGoogle = async user => {
  //* This should return the token we get from Google with our backend controller
  try {
    const response = await fetch(`${API}/google-login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};
