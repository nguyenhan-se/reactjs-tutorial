import * as ActionTypes from './action/ActionTypes';

export const Dishes = (
  state = {
    isLoading: true,
    errMess: null,
    dishes: []
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_DISHES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dishes: action.payload
      };
    case ActionTypes.DISHES_LOADING:
      return { ...state, isLoading: true, errMess: null, dishes: [] };
    case ActionTypes.DISHES_FAILED:
      return { ...state, isLoading: false, errMess: 'ERROR Loading Dishes' };
    default:
      return state;
  }
};
