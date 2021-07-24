import css from './ReviewComments.module.scss';
import PropTypes from 'prop-types';

const ReviewComments = ({ comments }) => {
  return (
    <div className={css['comments']}>
      {comments.content.map((comment) => (
        <div className={css['comment']}>{comment}</div>
      ))}
    </div>
  );
};

ReviewComments.propTypes = {
  comments: PropTypes.object,
};

export default ReviewComments;
