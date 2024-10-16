import actions from './actions';

const reducers = Object.keys(actions).reduce((acc, type) => {
  acc[type] = actions[type];
  return acc;
}, {});

export default (state, { payload, type }) => {
  if (reducers[type]) return reducers[type](state, payload);

  return state;
};
