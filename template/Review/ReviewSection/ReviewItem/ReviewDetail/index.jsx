import css from './ReviewDetail.module.scss';
import PropTypes from 'prop-types';
import moment from 'moment';

const ReviewDetail = ({ review, handleHashtagClick }) => (
  <div className={css['review-detail']}>
    {review.userSize && (
      <div className={css['detail__user-size']}>
        <span>키: {review.userSize.height}, </span>
        <span>몸무게: {review.userSize.weight}</span>
      </div>
    )}
    {review.reviewQuestions && (
      <div className={css['detail__questions']}>
        {review.reviewQuestions.map(({ code, type, answerList }, idx) => (
          <div key={code} className={css['question']}>
            <span className={css['q']}>{type}</span>
            <span className={css['a']}>{answerList[idx].answer}</span>
          </div>
        ))}
      </div>
    )}
    <p className={css['detail__text']}>{review.contents}</p>
    <div className={css['detail__date']}>
      {moment(review.createdTimestamp).format('YYYY.MM.DD')}
    </div>
    {review.hashtagList && (
      <div className={css['detail__hashtags']}>
        {review.hashtagList.map((hashtag) => (
          <button
            key={hashtag}
            className={css['hashtag']}
            onClick={() => handleHashtagClick(hashtag)}
          >
            #{hashtag}
          </button>
        ))}
      </div>
    )}
  </div>
);

ReviewDetail.propTypes = {
  review: PropTypes.object,
  handleHashtagClick: PropTypes.func,
};

export default ReviewDetail;
