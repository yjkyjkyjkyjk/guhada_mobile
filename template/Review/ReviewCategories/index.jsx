import css from './ReviewCategories.module.scss';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { memo, forwardRef } from 'react';

const ReviewCategories = forwardRef(
  ({ selected, categories, handleClickCategory }, ref) => (
    <div className={css['review__categories']}>
      <div className={css['categories__header']}>카테고리</div>
      <div className={css['categories__items']} ref={ref}>
        {categories.map(([eng, kor]) => (
          <div
            key={eng}
            className={css['item']}
            onClick={(e) => handleClickCategory(kor, e.target)}
          >
            <button
              className={cn(
                `placeholder ${eng}`,
                selected === kor && css['selected']
              )}
            />
            <div>{kor}</div>
          </div>
        ))}
      </div>
    </div>
  )
);

ReviewCategories.propTypes = {
  selected: PropTypes.string,
  categories: PropTypes.any,
  handleClickHashtag: PropTypes.func,
};

export default memo(ReviewCategories);
