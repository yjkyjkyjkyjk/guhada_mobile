import { memo } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import css from './ReviewFavoriteHashtagList.module.scss';
import {
  HashtagFavoriteHeading,
  HashtagLabel,
} from 'template/Review/components/atoms';

/**
 * ReviewHashtag
 * @param {Object} wrapperStyles : Custom styling contents section
 * @param {Object} headingStyles : Custom styling heading section
 * @param {Array} hashTags : 해시태그 리스트
 * @param {Function} onClickHashtag: 아이템 클릭 핸들러
 * @returns
 */
function ReviewFavoriteHashtagList({
  wrapperStyles,
  headingStyles,
  hashtags,
  onClickHashtag,
}) {
  return (
    hashtags?.length > 0 && (
      <div
        className={css.ReviewFavoriteHashtagListWrapper}
        style={wrapperStyles}
      >
        <HashtagFavoriteHeading headingStyles={headingStyles} />
        <div className={css.Contents}>
          {hashtags?.map((o) => (
            <HashtagLabel
              key={o.id}
              hashtag={o.hashtag}
              onClickHashtag={() => onClickHashtag(o.hashtag)}
            />
          ))}
        </div>
      </div>
    )
  );
}

ReviewFavoriteHashtagList.propTypes = {
  hashTags: PropTypes.array,
  onClickHashtag: PropTypes.func,
};

export default memo(observer(ReviewFavoriteHashtagList));
