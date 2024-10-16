export default (state, payload) => ({
  ...state,
  rating: {
    ...state.rating,
    ...payload,
  },
});
