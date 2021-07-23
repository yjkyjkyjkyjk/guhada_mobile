import css from './ModalPortal.module.scss';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { useState, useEffect, cloneElement, Children } from 'react';
import { createPortal } from 'react-dom';
import LayoutStore from 'stores/LayoutStore';

function ModalPortal({
  children,
  selectorId = '__next',
  handleOpen = () => {},
  handleClose = () => {},
  hash = '#modal',
  shade = true,
  gutter,
  closeButton = true,
  slide,
  background = true,
  center = false,
  minHeight = false,
  zIndex,
}) {
  /**
   * states
   */
  const [height, setHeight] = useState(window.innerHeight);

  /**
   * handlers
   */
  const resizeHandler = () => {
    setHeight(window.innerHeight);
  };
  const popstateHandler = () => {
    handleClose();
  };
  const hashChangeHandler = () => {
    if (window.location.hash === hash) {
      handleOpen();
    }
  };

  /**
   * side effects
   */
  useEffect(() => {
    window.onhashchange = hashChangeHandler;
    window.location.hash = hash;
    // window.history.pushState(
    //   { ...window.history.state, as: window.history.state.as + hash },
    //   document.title,
    //   hash
    // );
    document.body.style.overflow = 'hidden';
    window.addEventListener('popstate', popstateHandler);
    window.addEventListener('resize', resizeHandler, true);

    return () => {
      document.body.style.removeProperty('overflow');
      window.removeEventListener('resize', resizeHandler, true);
      if (window.location.hash === hash) {
        LayoutStore._dangerouslyDisableScrollMemo = true;
        window.history.back();
        // window.history.replaceState(
        //   { ...window.history.state },
        //   document.title,
        //   window.location.pathname + window.location.search
        // );
      }
      window.removeEventListener('popstate', popstateHandler);
    };
  }, []);

  /**
   * render
   */
  return (
    typeof document === 'object' &&
    createPortal(
      <div
        className={cn(css['modal-portal'], minHeight && css['min-height'])}
        style={{
          zIndex,
        }}
      >
        {shade && (
          <div className={css['shade']} onClick={handleClose}>
            {closeButton && <div className="icon close--light" />}
          </div>
        )}
        <div
          style={{ height: `${height}px` }}
          className={cn(
            css['modal'],
            !background && css['transparent'],
            gutter && css['gutter'],
            center && css['center'],
            {
              [css['slideUp']]: slide === 1,
              [css['slideLeft']]: slide === 2,
              [css['slideRight']]: slide === 3,
            }
          )}
        >
          {Children.map(
            children,
            (child) => child && cloneElement(child, { height })
          )}
        </div>
      </div>,
      document.getElementById(selectorId)
    )
  );
}

ModalPortal.propTypes = {
  selectorId: PropTypes.string,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  hash: PropTypes.string,
  style: PropTypes.object,
  gutter: PropTypes.bool,
  closeButton: PropTypes.bool,
  slide: PropTypes.number,
  background: PropTypes.bool,
  center: PropTypes.bool,
  minHeight: PropTypes.bool,
};

export default ModalPortal;
