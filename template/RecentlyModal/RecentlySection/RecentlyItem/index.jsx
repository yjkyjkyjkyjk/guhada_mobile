import css from './RecentlyItem.module.scss';
import { memo } from 'react';
import PropTypes from 'prop-types';

const RecentlyItem = ({ item, handleClick, handleDelete }) => (
  <div
    className={css['recently-item']}
    style={{ backgroundImage: `url(${item.imageUrls[0]})` }}
    onClick={() => handleClick(item.dealId)}
  >
    <button onClick={(e) => handleDelete(e, item.dealId)}>
      <div className="misc delete" />
    </button>
  </div>
);

RecentlyItem.propTypes = {
  item: PropTypes.object,
  handleClick: PropTypes.func,
  handleDelete: PropTypes.func,
};
export default memo(RecentlyItem);
