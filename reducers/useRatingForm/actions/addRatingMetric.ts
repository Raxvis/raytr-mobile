import uuid from '../../../utils/uuid';

export default (state) => ({
  ...state,
  rating: {
    ...state.rating,
    scores: [
      ...state.rating.scores,
      {
        ratingId: state.rating.ratingId,
        scoreId: uuid(),
        ratingMetricId: '',
        ratingMetric: {
          ratingMetricId: '',
          ratingMetricName: '',
        },
      },
    ],
  },
});
