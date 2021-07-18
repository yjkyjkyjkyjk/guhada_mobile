import { memo } from 'react';
import css from './DealSection.module.scss';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { LinkRoute } from 'lib/router';

import { ReviewDealItem } from 'template/Review/components/molecules';

const ReviewDealSection = ({ isLazy, header, deals, horizontal = false }) => (
  <div className={css['deal-section']}>
    <div className={css['deal-section__name']}>{header}</div>
    <div
      className={cn(
        css['deal-section__items'],
        horizontal && css['items--horizontal']
      )}
    >
      {deals.map((deal) => (
        <LinkRoute
          key={deal.dealId}
          href={`/productdetail?deals=${deal.dealId}`}
        >
          <a>
            <ReviewDealItem
              isLazy={isLazy}
              deal={deal}
              horizontal={horizontal}
            />
          </a>
        </LinkRoute>
      ))}
    </div>
  </div>
);

ReviewDealSection.propTypes = {
  isLazy: PropTypes.bool,
  header: PropTypes.string,
  deals: PropTypes.object,
  horoizontal: PropTypes.bool,
};

export default memo(ReviewDealSection);
