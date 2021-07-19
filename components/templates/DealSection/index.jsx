import css from './DealSection.module.scss';
import cn from 'classnames';
import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { useScrollDown, useInfinteScroll } from 'hooks';
import DealItems from 'components/organisms/DealItems';
import FilterOption from './FilterOption';
import LoadMoreButton from './LoadMoreButton';
import Spinner, { SpinnerDiv } from 'components/atoms/Misc/Spinner';
import FilterTags from './FilterTags';
import SpecialFilterTags from './SpecialFilterTags';
import _ from 'lodash';

const DealSection = ({
  deals,
  isLoading,
  moreToLoad,
  handleLoadMore,
  thumbnail = 0,
  filter = false,
  filterTags = false,
  filterSticky = false,
  specialFilterTags = false,
  isInfiniteScroll = true,
  displaySeller = false,
  displayTags = true,
  isLazy = true,
}) => {
  /**
   * states
   */
  const filterRef = useRef();
  const isScrollDown = useScrollDown();
  const [isFilterHidden, setIsFilterHidden] = useState(false);

  /**
   * handlers
   */
  const handleInfiniteScroll = useInfinteScroll(handleLoadMore, moreToLoad);

  const filterHideHandler = _.throttle(() => {
    if (
      filterRef.current &&
      filterRef.current.getBoundingClientRect().top < 61
    ) {
      setIsFilterHidden(true);
    } else {
      setIsFilterHidden(false);
    }
  }, 50);

  /**
   * side effects
   */
  useEffect(() => {
    if (filter) {
      window.addEventListener('scroll', filterHideHandler);

      return () => window.removeEventListener('scorll', filterHideHandler);
    }
  }, []);

  /**
   * render
   */
  return (
    <div className={css['deal-section']}>
      {filter && (
        <div
          className={cn(css['section__filters'], filterSticky && css['sticky'])}
          ref={filterRef}
        >
          {specialFilterTags && <SpecialFilterTags />}
          <FilterOption
            specialFilterTags={specialFilterTags}
            hide={isFilterHidden && isScrollDown}
          />
        </div>
      )}
      {filterTags && <FilterTags specialFilterTags={specialFilterTags} />}
      {isLoading ? (
        <Spinner />
      ) : (
        <DealItems
          deals={deals}
          thumbnail={thumbnail}
          displaySeller={displaySeller}
          displayTags={displayTags}
          isLazy={isLazy}
        />
      )}
      {moreToLoad &&
        (isInfiniteScroll ? (
          <div ref={handleInfiniteScroll}>
            {deals.length > 0 && <SpinnerDiv />}
          </div>
        ) : (
          <LoadMoreButton isLoading={isLoading} onClick={handleLoadMore} />
        ))}
    </div>
  );
};

DealSection.propTypes = {
  header: PropTypes.string,
  deals: PropTypes.object,
  isLoading: PropTypes.bool,
  moreToLoad: PropTypes.bool,
  handleLoadMore: PropTypes.func,
  thumbnail: PropTypes.number,
  filter: PropTypes.bool,
  filterTags: PropTypes.bool,
  filterSticky: PropTypes.bool,
  specialFilterTags: PropTypes.bool,
  isInfiniteScroll: PropTypes.bool,
  displaySeller: PropTypes.bool,
  displayTags: PropTypes.bool,
  isLazy: PropTypes.bool,
};

export default observer(DealSection);
