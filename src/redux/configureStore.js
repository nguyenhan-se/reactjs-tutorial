import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Dishes } from './dishesReducers';
import { Comments } from './commentsReducers';
import { Promotions } from './promotionsReducers';
import { Leaders } from './leadersReducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';
export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      dishes: Dishes,
      comments: Comments,
      leaders: Leaders,
      promotions: Promotions,
      ...createForms({
        feedback: InitialFeedback
      })
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
