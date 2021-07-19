import PropTypes from 'prop-types';
import css from './EventList.module.scss';
import ListItem from './ListItem';
import Filter from './Filter';

function EventList({ eventList, name, handleFilterChange }) {
  /**
   * render
   */
  return (
    <div className={css['event-list']}>
      <div className={css['list__dashboard']}>
        <div className={css['dashboard__count']}>총 {eventList.length}개</div>
        <Filter name={name} handleFilterChange={handleFilterChange} />
      </div>
      <div className={css['list__items']}>
        {eventList.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

EventList.propTypes = {
  eventList: PropTypes.object,
  listName: PropTypes.string,
};

export default EventList;
