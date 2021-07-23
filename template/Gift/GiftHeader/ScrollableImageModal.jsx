import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ModalPortal from 'components/templates/PopupPortal';
import { LoadingSpinner } from 'components/common/loading';

const ScrollableImageModal = ({ imgSrc, handleClose }) => {
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
    <ModalPortal handleClose={handleClose} shade={false}>
      <div style={{ overflow: 'scroll', height: '100%' }}>
        <div
          onClick={handleClose}
          style={{ position: 'absolute', right: '10px', top: '10px' }}
          className="icon close"
        />
        {loaded ? (
          <img style={{ width: '100vw', height: 'auto' }} src={imgSrc} />
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </ModalPortal>
  );
};

ScrollableImageModal.propTypes = {
  imgSrc: PropTypes.string,
  handleCloseModal: PropTypes.func,
};

export default ScrollableImageModal;
