import css from './ReviewDetail.module.scss';
import PropTypes from 'prop-types';
import moment from 'moment';

const ReviewDetail = ({ review }) => {
  console.log('yoman', review);
  return (
    <div className={css['review-detail']}>
      <div className={css['detail__user-info']}>
        <span>평소 사이즈</span>
        <span>키</span>
        <span>체중</span>
      </div>
      <div className={css['detail__tags']}>
        {/* {review.reviewQuestions.map((question) => (
          <div>{question}</div>
        ))}
        {review.reviewAnswers.map((answer) => (
          <div>{answer}</div>
        ))} */}
      </div>
      <p className={css['detail__text']}>{review.contents}</p>
      <div className={css['detail__date']}>
        {moment(review.createdTimestamp).format('YYYY.MM.DD')}
      </div>
    </div>
  );
};

ReviewDetail.propTypes = {
  review: PropTypes.object,
};

export default ReviewDetail;
