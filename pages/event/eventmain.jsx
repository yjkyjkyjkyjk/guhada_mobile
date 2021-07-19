import { useEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from 'stores/useStores';
import isServer from 'childs/lib/common/isServer';
import { getLayoutInfo } from 'stores/LayoutStore';
import HeadForSEO from 'childs/lib/components/HeadForSEO';
import MountLoading from 'components/atoms/Misc/MountLoading';
import Footer from 'components/footer/Footer';
import EventList from 'template/event/EventList';

function EventMainPage() {
  /**
   * states
   */
  const { eventmain: eventMainStore, newEvent: newEventStore } = useStores();

  /**
   * side effects
   */
  useEffect(() => {
    newEventStore.resetEventData();
    if (eventMainStore.eventList.length === 0) {
      eventMainStore.getEventList();
    }
  }, []);

  /**
   * render
   */
  return (
    <>
      <HeadForSEO pageName="이벤트" />
      {eventMainStore.eventList.length === 0 && <MountLoading />}
      <EventList
        eventList={eventMainStore.eventList}
        name="이벤트"
        handleFilterChange={(value) => eventMainStore.getEventList(value)}
      />
      <Footer />
    </>
  );
}

EventMainPage.getInitialProps = function({ pathname, query }) {
  const initialProps = { layout: {} };

  if (isServer) {
    const { type, headerFlags } = getLayoutInfo({ pathname, query });

    initialProps.initialState = {
      layout: { type, headerFlags },
    };
  }

  return initialProps;
};

export default observer(EventMainPage);
