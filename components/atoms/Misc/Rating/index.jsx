import css from './Rating.module.scss';
import cn from 'classnames';
import PropTypes from 'prop-types';

export const getRating = (rating) => {
  switch (rating) {
    case 'HALF':
      return 1;
    case 'ONE':
      return 2;
    case 'ONE_HALF':
      return 3;
    case 'TWO':
      return 4;
    case 'TWO_HALF':
      return 5;
    case 'THREE':
      return 6;
    case 'THREE_HALF':
      return 7;
    case 'FOUR':
      return 8;
    case 'FOUR_HALF':
      return 9;
    case 'FIVE':
      return 10;
    default:
      return 0;
  }
};

const Rating = ({ number = 10 }) => (
  <div className={css['rating']}>
    {Array(Math.floor(number / 2))
      .fill(undefined)
      .map((_, i) => (
        <span key={i} className="misc star" />
      ))}
    {number % 2 > 0 && (
      <>
        <span className={cn(css['half'], 'misc star--half')} />
        <span className="misc star-grey--half" />
      </>
    )}
    {Array((number % 2 ? 4 : 5) - Math.floor(number / 2))
      .fill(undefined)
      .map((_, i) => (
        <span key={i} className="misc star-grey" />
      ))}
  </div>
);

Rating.propTypes = {
  number: PropTypes.number,
};

export default Rating;
