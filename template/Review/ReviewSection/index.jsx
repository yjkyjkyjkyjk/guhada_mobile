import css from './ReviewSection.module.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import useStores from 'stores/useStores';
import { sendBackToLogin } from 'childs/lib/router';
import { useInfinteScroll } from 'hooks';
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
  const { login: loginStore, review: reviewStore } = useStores();
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
      if (review.myBookmarkReview) {
        reviewStore.delProductReviewBookmarks(review);
      } else {
        reviewStore.setProductReviewBookmarks(review);
      }
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
          <SpinnerDiv />
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
            <SpinnerDiv />
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
          handleOpen={() => setIsModalOpen(true)}
          handleClose={() => setIsModalOpen(false)}
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
