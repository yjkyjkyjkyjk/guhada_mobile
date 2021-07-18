import PropTypes from 'prop-types';
import css from './ReviewDetail.module.scss';

/**
 * 리뷰 > 상세 > Label
 * @param {Array} answers // review.reviewAnswers
 * @param {Array} questions // review.reviewQuestions
 * @returns
 */
function ReviewDetailLabelList({ answers, questions }) {
  return (
    <div className={css.Wrapper}>
      {questions &&
        questions.length > 0 &&
        questions.map((o, i) => (
          <div className={css.Item} key={`${o.type}-${i}`}>
            <div>{o.type}</div>
            <div>{answers[i].answer}</div>
          </div>
        ))}
    </div>
  );
}

ReviewDetailLabelList.propTypes = {
  answers: PropTypes.object,
  questions: PropTypes.object,
};

export default ReviewDetailLabelList;
