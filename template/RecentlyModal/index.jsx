import css from './RecentlyModal.module.scss';
import cn from 'classnames';
import PropTypes from 'prop-types';
import ModalPortal from 'components/templates/ModalPortal';
import RecentlySection from './RecentlySection';

function RecentlyModal({ handleOpen, handleClose }) {
  /**
   * render
   */
  return (
    <ModalPortal handleOpen={handleOpen} handleClose={handleClose}>
      <div className={css['modal__header']}>
        <div className={css['header__title']}>최근 본 상품</div>
        <div
          className={cn(css['header__close'], 'icon close')}
          onClick={handleClose}
        />
      </div>
      <RecentlySection />
    </ModalPortal>
  );
}

RecentlyModal.propTypes = {
  handleOpen: PropTypes.func,
  handleClose: PropTypes.func,
};

export default RecentlyModal;
