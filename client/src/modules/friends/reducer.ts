import {
  REMOVE_USER,
  GET_FRIENDS_FAILURE,
  GET_FRIENDS_SUCCESS,
  ADD_FRIEND_SUCCESS,
  ADD_FRIEND_FAILURE,
} from 'modules/friends/action';
import { User } from 'types';
import {
  UserListAction,
} from 'modules/friends/types';

const initialState: User[] = [];

function userList(state: User[] = initialState, action: UserListAction) {
  switch (action.type) {
    case REMOVE_USER: {
      const newState = state.filter((user) => user.id !== action.payload);
      return newState;
    }
    case GET_FRIENDS_SUCCESS: {
      return action.payload;
    }
    case GET_FRIENDS_FAILURE: {
      const error = action.payload;
      if (error.response) {
        alert(error.response.data.message);
      }
      return state;
    }
    case ADD_FRIEND_SUCCESS: {
      alert(`${action.payload.name}님을 친구로 추가했습니다.`)
      return state.concat(action.payload);
    }
    case ADD_FRIEND_FAILURE: {
      const error = action.payload;
      if(error.response) {
        alert(error.response.data.message);
      }
    }
    default:
      return state;
  }
}


export default userList;
