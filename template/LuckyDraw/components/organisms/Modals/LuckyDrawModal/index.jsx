import PropTypes from 'prop-types';
import css from './LuckyDrawModal.module.scss';
import ModalWrapper from 'components/molecules/Modal/ModalWrapper/index';

const STATUS_RESPONSES = {
  START: {
    text: '응모완료',
    icon: '/public/icon/luckydraw/check_icon.png',
  },
  WINNER_ANNOUNCEMENT: {
    text: '당첨자 발표',
    icon: '/public/icon/luckydraw/gift_icon.png',
  },
};

/**
 * LuckyDrawModal
 * @param {Boolean} isOpen
 * @param {String} status ( START, WINNER_ANNOUNCEMENT, CLIP )
 * @param {String} contents 본문
 * @param {Function} onClose
 * @returns
 */
function LuckyDrawModal({ isOpen, status, contents, onClose }) {
  const isBigModal =
    status === 'START' || status === 'WINNER_ANNOUNCEMENT' ? true : false;
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div
        className={css.wrapper}
        style={{ height: isBigModal ? '305px' : '205px' }}
      >
        <div
          className={css['section-contents']}
          style={{ height: isBigModal ? '249px' : '149px' }}
        >
          <div className={css['close-button-section']}>
            <button
              className={css['close-button']}
              style={{ backgroundImage: '/public/icon/modal_close.png' }}
              onClick={onClose}
            />
          </div>
          <div className={css['section-info']}>
            {isBigModal && (
              <div className={css['section-status']}>
                <div className={css['section-status-icon-section']}>
                  <div
                    className={css['section-status-icon']}
                    style={{ backgroundImage: STATUS_RESPONSES[status].icon }}
                  />
                </div>
                <div className={css['section-title']}>
                  {STATUS_RESPONSES[status].text}
                </div>
              </div>
            )}
            <div className={css['section-descriptions']}>{contents}</div>
          </div>
        </div>
        <div
          className={css['section-button']}
          style={{ backgroundColor: '#232323' }}
          onClick={onClose}
        >
          확인
        </div>
      </div>
    </ModalWrapper>
  );
}

LuckyDrawModal.propTypes = {
  isOpen: PropTypes.bool,
  status: PropTypes.string,
  contents: PropTypes.string,
  onClose: PropTypes.func,
};

export default LuckyDrawModal;
