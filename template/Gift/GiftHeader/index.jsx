import css from './GiftHeader.module.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';
import cn from 'classnames';
import ScrollableImageModal from './ScrollableImageModal';

const GiftHeader = () => {
  /**
   * states
   */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * render
   */
  return (
    <>
      <div className={css['gift__header']}>
        <div className={cn(css['header__banner'], css['banner--main'])} />
        <div
          className={cn(css['header__banner'], css['banner--sub'])}
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      {isModalOpen && (
        <ScrollableImageModal
          imgSrc={'/public/gift/gift_detail_mob.jpg'}
          handleOpen={() => setIsModalOpen(true)}
          handleClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

GiftHeader.propTypes = {
  handleOpenModal: PropTypes.func,
};

export default GiftHeader;
