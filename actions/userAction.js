import { API } from '../config';
import { handleResponse } from './authAction';

//* Get public profile
export const userPublicProfile = async username => {
  // console.log('userAction - userPublicProfile - username: ', username);
  try {
    const response = await fetch(`${API}/user/${username}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

//* Get private profile
export const getProfile = async token => {
  // console.log('userAction - getProfile - token: ', token);
  try {
    const response = await fetch(`${API}/user/profile`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

//* For updating private (user) profile
export const update = async (token, user) => {
  try {
    const response = await fetch(`${API}/user/update`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: user,
    });
    handleResponse(response);
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};
