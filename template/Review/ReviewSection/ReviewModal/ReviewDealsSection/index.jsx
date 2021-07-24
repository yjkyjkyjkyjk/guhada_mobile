import css from './ReviewDealsSection.module.scss';
import PropTypes from 'prop-types';
import DealItems from 'components/organisms/DealItems';

const ReviewDealsSection = ({ relatedDeals, popularDeals }) => (
  <div className={css['section__deals']}>
    <div className={css['deals']}>
      <div className={css['deals__header']}>비슷한 상품</div>
      <DealItems deals={relatedDeals} isLazy={false} thumbnail={-1} />
    </div>
    <div className={css['deals']}>
      <div className={css['deals__header']}>추천 상품</div>
      <DealItems deals={popularDeals} isLazy={false} thumbnail={-1} />
    </div>
  </div>
);

ReviewDealsSection.propTypes = {
  relatedDeals: PropTypes.any,
  popularDeals: PropTypes.any,
  handleDealClick: PropTypes.func,
};

export default ReviewDealsSection;
