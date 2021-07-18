import PropTypes from 'prop-types';
import css from './ReviewCardContents.module.scss';

/**
 * 리뷰 > 본문 > 타이틀, 내용
 * @param {String} title
 * @param {String} contents
 * @returns
 */
function CardContents({ title, contents }) {
  return (
    <div className={css.Wrapper}>
      <span className={css.Title}>{title}</span>
      <span className={css.Contents}>{contents}</span>
    </div>
  );
}

CardContents.propTypes = {
  title: PropTypes.string,
  contents: PropTypes.string,
};

export default CardContents;
