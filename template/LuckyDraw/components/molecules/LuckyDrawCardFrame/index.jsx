import { memo } from 'react';
import PropTypes from 'prop-types';
import css from './LuckyDrawCardFrame.module.scss';

/**
 * 럭키드로우 상품 Photo frame
 * @param {String} imageUrl : 상품 이미지
 * @param {String} statusCode : 상품 상태 (NORMAL, READY, START, REQUESTED)
 * @returns
 */
function LuckyDrawCardFrame({ imageUrl, statusCode }) {
  return (
    <div className={css.wrapper}>
      <div
        style={{ backgroundImage: imageUrl, zIndex: '1' }}
        className={css['section-image']}
      />
      {(statusCode === 'NORMAL' || statusCode === 'READY') && (
        <div
          style={{
            backgroundImage: '/public/icon/luckydraw/comming_soon.png',
            zIndex: '2',
          }}
          className={css['section-image']}
        />
      )}
      <div className={css['section-bg']} />
    </div>
  );
}

LuckyDrawCardFrame.propTypes = {
  imageUrl: PropTypes.string,
  statusCode: PropTypes.string,
};

export default memo(LuckyDrawCardFrame);
