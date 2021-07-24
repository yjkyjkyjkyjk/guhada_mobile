import css from './ReviewItem.module.scss';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import LazyLoad from 'react-lazyload';
import ImageSlider from './ImageSlider';
import Rating, { getRating } from 'components/atoms/Misc/Rating';
import ReviewDetail from './ReviewDetail';

const ReviewItem = ({
  review,
  handleClick = () => {},
  handleLikeClick,
  handleDealClick,
  handleHashtagClick = () => {},
  detailed = false,
  isLazy = true,
}) => (
  <div className={cn(css['review-item'], !detailed && css['divider'])}>
    <div className={css['item__review']} onClick={() => handleClick(review)}>
      <div className={css['review__image']}>
        {isLazy ? (
          <LazyLoad>
            <ImageSlider imageList={review.reviewImageList} />
          </LazyLoad>
        ) : (
          <ImageSlider imageList={review.reviewImageList} />
        )}
      </div>
      <div className={css['review__info']}>
        <div className={css['review__info__icons']}>
          <div
            className={css['icon']}
            onClick={(e) => handleLikeClick(e, review)}
          >
            <span
              className={cn(
                css['icon__image'],
                'misc',
                myBookmarkReview ? 'like--on' : 'like'
              )}
            />
            <span className={css['icon__count']}>{review.bookmarkCount}</span>
          </div>
          <div className={css['icon']}>
            <span className={cn(css['icon__image'], 'misc comment')} />
            <span className={css['icon__count']}>{review.commentCount}</span>
          </div>
        </div>
        <Rating number={getRating(review.rating)} />
      </div>
      {detailed ? (
        <ReviewDetail review={review} handleHashtagClick={handleHashtagClick} />
      ) : (
        <p className={css['review__text']}>
          <span className={css['text__author']}>{review.nickname}</span>
          {review.contents}
        </p>
      )}
    </div>
    <div
      className={css['item__deal']}
      onClick={() => handleDealClick(review.dealId)}
    >
      {isLazy ? (
        <LazyLoad>
          <div
            className={css['deal__image']}
            style={{ backgroundImage: `url(${review.productImageUrl})` }}
          />
        </LazyLoad>
      ) : (
        <div
          className={css['deal__image']}
          style={{ backgroundImage: `url(${review.productImageUrl})` }}
        />
      )}
      <div className={css['deal__info']}>
        <div className={css['deal__info__title']}>{review.brandName}</div>
        <p className={css['deal__info__text']}>{review.dealName}</p>
      </div>
    </div>
  </div>
);

ReviewItem.propTypes = {
  review: PropTypes.object,
  handleClick: PropTypes.func,
  handleLikeClick: PropTypes.func,
  handleDealClick: PropTypes.func,
  handleHashtagClick: PropTypes.func,
  detailed: PropTypes.bool,
  isLazy: PropTypes.bool,
};

export default observer(ReviewItem);
