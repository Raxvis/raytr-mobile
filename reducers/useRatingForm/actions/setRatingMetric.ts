import uuid from '../../../utils/uuid';

export default (state, payload) => ({
  ...state,
  rating: {
    ...state.rating,
    scores: payload.map((metric) => ({
      scoreId: uuid(),
      ratingId: state.rating.ratingId,
      ratingMetricId: metric.ratingMetricId,
      ratingMetric: metric,
      score: 0,
    })),
  },
});
