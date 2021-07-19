import css from './ListItem.module.scss';
import PropTypes from 'prop-types';
import { memo } from 'react';
import moment from 'moment';
import { pushRoute } from 'childs/lib/router';

const ListItem = ({ item }) => {
  /**
   * states
   */
  const startDate =
    item.eventStartDate && moment(item.eventStartDate).format('YYYY. MM. DD');
  const endDate =
    item.eventEndDate && moment(item.eventEndDate).format('YYYY. MM. DD');

  /**
   * render
   */
  return (
    <div
      className={css['list-item']}
      onClick={() => pushRoute(item.detailPageUrl)}
    >
      <div
        className={css['item__image']}
        style={{ backgroundImage: `url(${item.imgUrlM})` }}
      />
      <div className={css['item__info']}>
        <div className={css['info__title']}>{item.eventTitle}</div>
        <div className={css['info__data']}>
          {`${startDate ? startDate : ''} ~ ${endDate ? endDate : ''}`}
        </div>
      </div>
    </div>
  );
};

ListItem.propTypes = {
  item: PropTypes.object,
};

export default memo(ListItem);
