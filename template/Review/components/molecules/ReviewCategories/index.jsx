import { memo, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import css from './ReviewCategories.module.scss';
import { Image } from 'components/atoms';

// TODO : Styled-components Sprite
const IMAGE_PATH = {
  title: '/public/icons/text/text_category/text_category_kr@3x.png',
};

function ReviewCategories({ categories, onClickCategory }) {
  /**
   * State
   */
  const [list, setList] = useState([]);

  /**
   * Side Effects
   */
  useEffect(() => {
    setList(categories);
    return () => setList([]);
  }, [categories]);

  /**
   * Handlers
   */
  const _onClickCategory = (categoryName) => {
    // TODO : ReviewStore > Search
    onClickCategory(categoryName);
    setList(
      list.map((o) =>
        categoryName === o.categoryName
          ? { ...o, isSelect: true }
          : { ...o, isSelect: false }
      )
    );
  };

  /**
   * Render
   */
  return (
    <div className={css.ReviewCategoryWrapper}>
      <div className={css.Title}>
        <Image src={IMAGE_PATH.title} width={'55px'} />
      </div>
      {list && list.length > 0 && (
        <div className={css.Contents}>
          {list?.map((o, i) => (
            <div
              className={css.ContentItem}
              key={`ReviewCategories-${i}`}
              onClick={() => _onClickCategory(o.categoryName)}
            >
              <div className={css.CategoryImage}>
                <Image
                  src={o.isSelect ? o.categoryImageOn : o.categoryImageOff}
                  size={'contain'}
                  width={'55px'}
                  height={'55px'}
                />
              </div>
              <div
                className={css.CategoryText}
                className={o.isSelect ? 'active' : 'inActive'}
              >
                {o.categoryName}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

ReviewCategories.propTypes = {
  categories: PropTypes.array,
  onClickCategory: PropTypes.func,
};

export default memo(observer(ReviewCategories));
