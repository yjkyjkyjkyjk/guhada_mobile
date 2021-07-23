import css from './ScrollableImageModal.module.scss';
import cn from 'classnames';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ModalPortal from 'components/templates/ModalPortal';
import { LoadingSpinner } from 'components/common/loading';

const ScrollableImageModal = ({ imgSrc, handleOpen, handleClose }) => {
  /**
   * states
   */
  const [loaded, setLoaded] = useState(false);

  /**
   * side effects
   */
  useEffect(() => {
    // preload image
    const image = new Image();
    image.src = imgSrc;
    image.onload = () => {
      setLoaded(true);
    };
  }, [imgSrc]);

  /**
   * render
   */
  return (
    <ModalPortal
      handleOpen={handleOpen}
      handleClose={handleClose}
      shade={false}
    >
      <div className={css['modal__section']}>
        <div
          onClick={handleClose}
          className={cn(css['section__close'], 'icon close')}
        />
        {loaded ? (
          <img className={css['section__image']} src={imgSrc} />
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </ModalPortal>
  );
};

ScrollableImageModal.propTypes = {
  imgSrc: PropTypes.string,
  handleOpen: PropTypes.func,
  handleClose: PropTypes.func,
};

export default ScrollableImageModal;
