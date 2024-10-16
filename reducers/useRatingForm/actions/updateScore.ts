export default (state, payload) => ({
  ...state,
  rating: {
    ...state.rating,
    scores: state.rating.scores.map((score) => {
      if (score.scoreId === payload.scoreId) {
        return {
          ...score,
          score: payload.score,
        };
      }
      return score;
    }),
  },
});
