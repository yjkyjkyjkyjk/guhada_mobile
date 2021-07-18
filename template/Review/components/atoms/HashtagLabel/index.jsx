import { memo } from 'react';
import PropTypes from 'prop-types';
import css from './HashtagLabel.module.scss';
import Image from 'components/atoms/Image';

const IMAGE_PATH = {
  delIcon: '/public/icon/shipping/pc-popup-icon-del.png',
};

/**
 * Hashtag Item
 * @param {Boolean} isClose
 * @param {String} hashtag
 * @param {Function} onClickHashtag
 * @returns
 */
function HashtagLabel({ isClose, hashtag, onClickHashtag }) {
  return (
    <div className={css.Wrapper} onClick={onClickHashtag}>
      # {hashtag}{' '}
      {isClose && (
        <Image
          isLazy={true}
          src={IMAGE_PATH.delIcon}
          width={'16px'}
          height={'16px'}
        />
      )}
    </div>
  );
}

HashtagLabel.propTypes = {
  isClose: PropTypes.bool,
  hashtag: PropTypes.string,
  onClickHashtag: PropTypes.func,
};

export default memo(HashtagLabel);
