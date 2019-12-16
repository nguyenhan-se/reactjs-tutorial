import * as ActionTypes from './action/ActionTypes';

export const Comments = (state = { erroMess: null, comments: [] }, action) => {
  switch (action.type) {
    // load all comments
    case ActionTypes.ADD_COMMENTS:
      return { ...state, erroMess: null, comments: action.payload };
    case ActionTypes.COMMENTS_FAILED:
      return { ...state, erroMess: 'Error Loading or add comments' };
    // add new comment
    case ActionTypes.ADD_COMMENT:
      let comment = action.payload;
      return { ...state, comments: state.comments.concat(comment) };
    default:
      return state;
  }
};
