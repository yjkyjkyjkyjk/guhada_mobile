import PropTypes from 'prop-types';
import moment from 'moment';
import css from './LuckyDrawHistoryItem.module.scss';

/**
 * 럭키드로우 Draw history
 * @param {Boolean} isActive Inner item visible
 * @param {Object} item Luckydarw history item
 * @param {Function} onClickHistory Winner history event
 * @returns
 */
function LuckyDrawHistoryItem({ isActive = true, item, onClickHistory }) {
  return (
    <div className={css['wrapper']}>
      {isActive && (
        <>
          <div
            className={css['image-section']}
            style={{ backgroundColor: item.bgColor }}
          >
            <img
              className={css['image']}
              src={item.imageUrl}
              alt="Draw Item Image"
            />
            <div className={css['image-section-cover']} />
            <div className={css['winner-date']}>
              <p>발표일</p>
              <p>{moment(item.winnerAnnouncementAt).format('YYYY. MM. DD')}</p>
            </div>
          </div>
          <div
            className={css['winner-submit']}
            onClick={() => onClickHistory(item.dealId)}
          >
            당첨자 확인
          </div>
        </>
      )}
    </div>
  );
}

LuckyDrawHistoryItem.propTypes = {
  isActive: PropTypes.bool,
  winners: PropTypes.arrayOf(PropTypes.object),
  onClickHistory: PropTypes.func,
};

export default LuckyDrawHistoryItem;
