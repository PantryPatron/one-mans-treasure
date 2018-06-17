import axios from 'axios';

export const FETCH_INTERESTED_USERS = 'FETCH_INTERESTED_USERS';
// export const FETCH_USER = 'FETCH_USER';

export const fetchInterestedUsers = (users) => {
  const url = `/interestedUsers`;
  const response = axios.put(url, {users});
  return {
    type: FETCH_INTERESTED_USERS,
    payload: response
  }
}

// export const fetchUser = () =>{
//   const url = `/user`;
//   const response = axios.get(user);
//   return {
//     type: FETCH_USER,
//     payload: response
//   }
// }