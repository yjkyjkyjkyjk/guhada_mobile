import css from './ReviewHashtags.module.scss';
import cn from 'classnames';
import { memo } from 'react';
import PropTypes from 'prop-types';

const ReviewHashtags = ({
  hashtags,
  hashtagInitialized,
  selected,
  handleClickHashtag,
}) =>
  hashtags.length > 0 && (
    <div className={css['review__hashtags']}>
      <div className={css['hashtags__header']}>
        인기 해시태그{' '}
        <span role="img" aria-label="Love-You Gesture">
          🤟
        </span>
        <span role="img" aria-label="Fire">
          🔥
        </span>
      </div>
      <div className={css['hashtags__items']}>
        {hashtags.map(({ id, hashtag }) => (
          <button
            key={id}
            className={cn(css['item'], selected === hashtag && css['selected'])}
            onClick={() => handleClickHashtag(hashtag)}
          >
            # {hashtag}
          </button>
        ))}
      </div>
    </div>
  );

ReviewHashtags.propTypes = {
  hashtags: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.shape({
      id: PropTypes.number,
      hashtag: PropTypes.string,
      hashtagPopularityPoint: PropTypes.number,
    }),
  ]),
  selected: PropTypes.string,
  hashtagInitialized: PropTypes.bool,
  handleClickHashtag: PropTypes.func,
};

export default memo(ReviewHashtags, (prevProps, nextProps) => {
  if (prevProps.selected !== nextProps.selected) {
    return false;
  }
  if (
    prevProps.selected !== nextProps.selected ||
    nextProps.hashtagInitialized
  ) {
    return true;
  }
  return false;
});

// export default ReviewHashtags;
