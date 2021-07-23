import css from './Loading.module.scss';
import { createPortal } from 'react-dom';
import { isBrowser } from 'childs/lib/common/isServer';

export const LoadingSpinnerDiv = () => (
  <div className={css.loader}>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
);

export const LoadingSpinner = ({ isAbsolute = false }) => (
  <>
    <div className={css.wrap}>
      <LoadingSpinnerDiv />
    </div>
    {isAbsolute && <div className={css.fixedMask} />}
  </>
);

const LoadingPortal = () =>
  isBrowser &&
  createPortal(<LoadingSpinner />, document.getElementById('__next'));

export default LoadingPortal;
