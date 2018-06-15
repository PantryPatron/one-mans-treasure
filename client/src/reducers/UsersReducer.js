import { FETCH_INTERESTED_USERS } from "../actions/UserActions";
// import { FETCH_USER } from "../actions/UserActions";


export default (state = [], action) =>{
  switch(action.type){
    case FETCH_INTERESTED_USERS: return action.payload.data;
  }
  return state;
}

// module.exports.fetchUser = function(state = [], action) {
//   switch(action.type){
//     case FETCH_USER: return action.payload.data;
//   }
//   return state;
// }

