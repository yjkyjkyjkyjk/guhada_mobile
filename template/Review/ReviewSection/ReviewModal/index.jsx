import css from './ReviewModal.module.scss';
import cn from 'classnames';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import useStores from 'stores/useStores';
import ModalPortal from 'components/templates/ModalPortal';
import ReviewItem from '../ReviewItem';
import { LoadingSpinnerDiv } from 'components/common/loading';
import AdBanner from 'components/layout/Layout/Header/BurgerModal/AdBanner';
import ReviewComments from './ReviewComments';
import ReviewDetailComment from './ReviewDetailComment';
import ReviewDealsSection from './ReviewDealsSection';
import RecommendedReviews from './RecommendedReviews';

const ReviewModal = ({
  handleLikeClick,
  handleDealClick,
  handleOpen,
  handleClose,
}) => {
  /**
   * states
   */
  const {
    newReview: reviewStore,
    newMain: newMainStore,
    user: userStore,
  } = useStores();
  const router = useRouter();

  /**
   * side effects
   */
  useEffect(() => {
    return reviewStore.resetDetailedReview;
  }, []);

  /**
   * handlers
   */
  const handleHashtagClick = (hashtag) => {
    router.push(`/search?keyword=${hashtag}`);
  };

  /**
   * render
   */
  return (
    <ModalPortal
      shade={false}
      handleOpen={handleOpen}
      handleClose={handleClose}
    >
      <div className={css['modal__header']}>
        <div
          className={cn('icon close', css['header__close'])}
          onClick={handleClose}
        />
        <div className={css['header__title']}>
          {reviewStore.detailedReview.nickname}
        </div>
      </div>
      <div className={css['modal__section']}>
        <div className={css['section__review']}>
          {reviewStore.detailedReview.createdTimestamp ? (
            <ReviewItem
              review={reviewStore.detailedReview}
              handleLikeClick={handleLikeClick}
              handleDealClick={handleDealClick}
              handleHashtagClick={handleHashtagClick}
              detailed
            />
          ) : (
            <div className={css['review__empty']}>
              <LoadingSpinnerDiv />
            </div>
          )}
          <div className={css['review__ad-banner']}>
            <AdBanner
              imageList={newMainStore.mainData.mainBannerList}
              centerMode={false}
            />
          </div>
          {reviewStore.detailedReview.comments?.content.length > 0 && (
            <ReviewComments comments={reviewStore.detailedReview.comments} />
          )}
          <ReviewDetailComment
            avatar={userStore.userInfo.profileImageUrl}
            handleSubmit={() => {}}
          />
        </div>
        {reviewStore.detailedReview.relatedDeals && (
          <ReviewDealsSection
            relatedDeals={reviewStore.detailedReview.relatedDeals}
            popularDeals={reviewStore.detailedReview.popularDeals}
            handleDealClick={handleDealClick}
          />
        )}
        {reviewStore.detailedReview.recommendedReviews && (
          <RecommendedReviews
            reviews={reviewStore.detailedReview.recommendedReviews}
            handleDepthClick={() => {}}
            handleLikeClick={handleLikeClick}
            handleDealClick={handleDealClick}
          />
        )}
      </div>
    </ModalPortal>
  );
};

ReviewModal.propTypes = {
  handleLikeClick: PropTypes.func,
  handleDealClick: PropTypes.func,
  handleOpen: PropTypes.func,
  handleClose: PropTypes.func,
};

export default observer(ReviewModal);
