import css from './Review.module.scss';
import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import useStores from 'stores/useStores';
import ReviewHashtags from './ReviewHashtags';
import ReviewCategories from './ReviewCategories';
import ReviewSection from './ReviewSection';
import { REVIEW_CATEGORY_LIST } from 'stores/NewReviewStore';

function Review({ initialReviewStore }) {
  /**
   * states
   */
  const { newReview: reviewStore } = useStores();
  const categoryRef = useRef();

  /**
   * side effects
   */
  useEffect(() => {
    reviewStore.initializeFetch();
  }, []);

  /**
   * handlers
   */
  const handleClickHashtag = (hashtag) => {
    if (reviewStore.params.hashtag !== hashtag) {
      reviewStore.initializeFetch({
        categoryName: reviewStore.params.categoryName,
        hashtag,
      });
    } else {
      reviewStore.initializeFetch({
        categoryName: reviewStore.params.categoryName,
        hashtag: '',
      });
    }
  };
  const handleClickCategory = (categoryName, target) => {
    if (reviewStore.params.categoryName !== categoryName) {
      reviewStore.initializeFetch({
        categoryName,
        hashtag: '',
      });
    }
    categoryRef.current.scrollTo({
      left: target.offsetLeft - 20,
      behavior: 'smooth',
    });
  };

  /**
   * render
   */
  return (
    <div className={css['review-wrapper']}>
      <ReviewHashtags
        hashtags={initialReviewStore?.hashtags || reviewStore.hashtags}
        hashtagInitialized={reviewStore.hashtagInitialized}
        selected={reviewStore.params.hashtag}
        handleClickHashtag={handleClickHashtag}
      />
      <ReviewCategories
        ref={categoryRef}
        categories={REVIEW_CATEGORY_LIST}
        selected={reviewStore.params.categoryName}
        handleClickCategory={handleClickCategory}
      />
      <ReviewSection
        reviews={reviewStore.reviews}
        isInitial={reviewStore.isInitial}
        isLoading={reviewStore.isLoading}
        moreToLoad={reviewStore.moreToLoad}
        handleLoadMore={() => reviewStore.fetch()}
      />
    </div>
  );
}
export default observer(Review);
