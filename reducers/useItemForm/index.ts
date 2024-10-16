import { useReducer } from 'react';
import reducer from './reducer';
import actions from './actions';

const buildActions = (dispatch) =>
  Object.keys(actions).reduce((acc, type) => {
    acc[type] = (payload) => dispatch({ type, payload });
    return acc;
  }, {});

const useItemForm = (initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    actions: buildActions(dispatch),
    dispatch,
    state,
  };
};

export default useItemForm;
