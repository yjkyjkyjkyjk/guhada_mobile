import css from './RecommendedReviews.module.scss';
import PropTypes from 'prop-types';
import ReviewItem from '../../ReviewItem';

const RecommendedReviews = ({
  reviews,
  handleDepthClick = () => {},
  handleLikeClick,
  handleDealClick,
}) => {
  return (
    <div className={css['recommended-reviews']}>
      <div className={css['recommended-reviews__header']}>추천 리뷰</div>
      <div className={css['recommended-reviews__items']}>
        {reviews.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
            handleClick={handleDepthClick}
            handleLikeClick={handleLikeClick}
            handleDealClick={handleDealClick}
            isLazy={false}
          />
        ))}
      </div>
    </div>
  );
};

RecommendedReviews.propTypes = {
  reviews: PropTypes.any,
  handleDealClick: PropTypes.func,
  handleLikeClick: PropTypes.func,
  handleDealClick: PropTypes.func,
};

export default RecommendedReviews;
