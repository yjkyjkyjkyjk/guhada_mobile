import css from './ReviewModal.module.scss';
import cn from 'classnames';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import useStores from 'stores/useStores';
import ModalPortal from 'components/templates/ModalPortal';
import ReviewItem from '../ReviewItem';
import { LoadingSpinner } from 'components/common/loading';

const ReviewModal = ({
  reviewId,
  handleLikeClick,
  handleDealClick,
  handleOpen,
  handleClose,
}) => {
  /**
   * states
   */
  const { newReview: reviewStore } = useStores();
  const [review, setReview] = useState({});

  /**
   * side effects
   */
  useEffect(() => {
    reviewStore.fetchReview(reviewId).then((review) => {
      console.log('yoman', review);
      setReview(review);
    });
    return () => setReview({});
  }, []);

  /**
   * render
   */
  return (
    typeof window === 'object' && (
      <ModalPortal
        shade={false}
        handleOpen={handleOpen}
        handleClose={handleClose}
      >
        <div className={css['modal__header']}>
          <div
            className={cn('icon back', css['header__close'])}
            onClick={handleClose}
          />
          <div className={css['header__title']}>{review.nickname}</div>
        </div>
        <div className={css['modal__section']}>
          {review.id ? (
            <ReviewItem
              review={review}
              likeCount={review.bookmarkCount}
              handleLikeClick={handleLikeClick}
              handleDealClick={handleDealClick}
              detailed
            />
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </ModalPortal>
    )
  );
};

ReviewModal.propTypes = {
  reviewId: PropTypes.oneOfType([PropTypes.any, PropTypes.number]),
  handleLikeClick: PropTypes.func,
  handleDealClick: PropTypes.func,
  handleOpen: PropTypes.func,
  handleClose: PropTypes.func,
};

export default observer(ReviewModal);
