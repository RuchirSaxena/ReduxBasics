import axios from "axios";
import {
  applyMiddleware,
  bindActionCreators,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import thunkMiddleware from 'redux-thunk';

const intialState = {
  loading: false,
  users: [],
  error: ''
}

const FETCH_USER_REQUESTED = 'FETCH_USER_REQUESTED';
const FETCH_USER_SUCCEEDED = 'FETCH_USER_SUCCEEDED';
const FETCH_USER_FAILED = 'FETCH_USER_FAILED';

// Action Creators
const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUESTED,
  }
}

const fetchUserSucceded = (users) => {
  return {
    type: FETCH_USER_SUCCEEDED,
    payload: users,
  }
}

const fetchUserFailed = (error) => {
  return {
    type: FETCH_USER_FAILED,
    payload: error
  }
}

const reducer = (state = intialState, action) => {
  switch(action.type) {
    case FETCH_USER_REQUESTED:
      return {
        ...state,
        loading : true
      }
    case FETCH_USER_SUCCEEDED:
      return {
        ...state,
        users : action.payload,
        loading : true,
        error: ''
      }
    case FETCH_USER_FAILED:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload
      }
    default:
      return state;
  }
}

const fetchUsers = () => {
  store.dispatch(fetchUserRequest());
  return (dispatch) => {
    axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      const users = response.data.map(user => user.id);
      store.dispatch(fetchUserSucceded(users));
    }).catch(err => {
      store.dispatch(fetchUserFailed(err.message));
    });
  }
}
debugger;
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {console.log(store.getState())});

store.dispatch(fetchUsers());