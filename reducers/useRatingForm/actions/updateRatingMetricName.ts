export default (state, payload) => ({
  ...state,
  rating: {
    ...state.rating,
    scores: state.rating.scores.map((score) => {
      if (score.scoreId === payload.scoreId) {
        return {
          ...score,
          ratingMetric: {
            ...score.ratingMetric,
            ratingMetricName: payload.ratingMetricName,
          },
        };
      }
      return score;
    }),
  },
});
