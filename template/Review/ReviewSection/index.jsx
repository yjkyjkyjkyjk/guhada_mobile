import css from './ReviewSection.module.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import useStores from 'stores/useStores';
import { sendBackToLogin } from 'lib/router';
import { useInfinteScroll } from 'lib/hooks';
import { LoadingSpinnerDiv } from 'components/common/loading';
import { SpinnerDiv } from 'components/atoms/Misc/Spinner';
import ReviewItem from './ReviewItem';
import ReviewModal from './ReviewModal';

const ReviewSection = ({
  reviews,
  isInitial,
  isLoading,
  moreToLoad,
  handleLoadMore,
}) => {
  /**
   * states
   */
  const { login: loginStore, newReview: reviewStore } = useStores();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalReviewId, setModalReviewId] = useState(null);

  /**
   * handlers
   */
  const handleInfiniteScroll = useInfinteScroll(handleLoadMore, moreToLoad);

  const handleClick = (reviewId) => {
    setModalReviewId(reviewId);
    setIsModalOpen(true);
  };

  const handleLikeClick = (e, review) => {
    e.stopPropagation();
    if (loginStore.loginStatus === 'LOGIN_DONE') {
      reviewStore.handleReviewLike(review);
    } else {
      sendBackToLogin();
    }
  };

  const handleDealClick = (dealId) => {
    router.push(`/productdetail?deals=${dealId}`);
  };

  /**
   * render
   */
  return (
    <div className={css['review__section']}>
      {isInitial ? (
        <div className={css['section__empty']}>
          <LoadingSpinnerDiv />
        </div>
      ) : reviews.length > 0 ? (
        reviews.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
            likeCount={review.bookmarkCount}
            handleClick={handleClick}
            handleLikeClick={handleLikeClick}
            handleDealClick={handleDealClick}
          />
        ))
      ) : (
        <div className={css['section__empty']}>
          {isLoading ? (
            <LoadingSpinnerDiv />
          ) : (
            <>
              <div className="special no-data" />
              <p className={css['empty__text']}>리뷰가 없습니다.</p>
            </>
          )}
        </div>
      )}
      {moreToLoad && (
        <div ref={handleInfiniteScroll}>
          {reviews.length > 0 && <SpinnerDiv />}
        </div>
      )}
      {isModalOpen && modalReviewId && (
        <ReviewModal
          reviewId={modalReviewId}
          handleLikeClick={handleLikeClick}
          handleDealClick={handleDealClick}
          handleOpen={() => setIsModalOpen(true)}
          handleClose={() => setModalReviewId(null)}
        />
      )}
    </div>
  );
};

ReviewSection.propTypes = {
  reviews: PropTypes.object,
  isInitial: PropTypes.bool,
  isLoading: PropTypes.bool,
  moreToLoad: PropTypes.bool,
  handleLoadMore: PropTypes.func,
};

export default observer(ReviewSection);
