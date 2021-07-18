import { memo, useState } from 'react';
import dynamic from 'next/dynamic';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import css from './ReviewCardSection.module.scss';
import {
  ReviewCardContents,
  ReviewCardImage,
  ReviewCardRating,
  ReviewCardProdInfo,
} from 'template/Review/components/molecules';

const DynamicReviewDetailModal = dynamic(
  () => import('template/Review/components/organisms/Modals/ReviewDetailModal'),
  {
    ssr: false,
  }
);

/**
 * Review Section
 * @param {Object} review, review item
 * @param {Function} onClickLike, Clicked like
 * @param {Function} onClickProduct, Clicked Product
 * @returns
 */
function ReviewCardSection({ isLazy, review, onClickLike, onClickProduct }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onCloseModal = () => {
    document.documentElement.style.overflow = 'initial';
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <DynamicReviewDetailModal
          reviewId={review?.id}
          isModalOpen={isModalOpen}
          onCloseModal={onCloseModal}
        />
      )}
      <div onClick={() => setIsModalOpen(true)}>
        {/* 이미지 */}
        <ReviewCardImage isLazy={isLazy} images={review.reviewImageList} />

        {/* 컨텐츠 */}
        <div>
          {/* 좋아요, 댓글, 별점 */}
          <ReviewCardRating
            review={review}
            onClickLike={() => onClickLike(review)}
          />

          {/* 본문 */}
          <ReviewCardContents
            title={review?.nickname}
            contents={review?.contents}
          />

          {/* 상품 */}
          <ReviewCardProdInfo
            dealId={review?.dealId}
            imageUrl={review?.productImageUrl}
            title={review?.brandName}
            contents={review?.dealName}
            onClickProduct={onClickProduct}
          />
        </div>
      </div>
      <div className={css.Divider} />
    </>
  );
}

ReviewCardSection.propTypes = {
  review: PropTypes.object,
  onClickLike: PropTypes.func,
  onClickProduct: PropTypes.func,
};

export default memo(observer(ReviewCardSection));
