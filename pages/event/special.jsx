import { useEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from 'stores/useStores';
import isServer from 'childs/lib/common/isServer';
import { getLayoutInfo } from 'stores/LayoutStore';
import HeadForSEO from 'childs/lib/components/HeadForSEO';
import MountLoading from 'components/atoms/Misc/MountLoading';
import Footer from 'components/footer/Footer';
// import SpecialList from 'template/event/SpecialList';
import EventList from 'template/event/EventList';

function SpecialPage() {
  /**
   * states
   */
  const { special: specialStore, newSpecial: newSpecialStore } = useStores();

  /**
   * side effects
   */
  useEffect(() => {
    newSpecialStore.resetSpecialData();
    if (specialStore.specialList.length === 0) {
      specialStore.getSpecialList();
    }
  }, []);

  /**
   * render
   */
  return (
    <>
      <HeadForSEO pageName="기획전" />
      {specialStore.specialList.length === 0 && <MountLoading />}
      <EventList
        eventList={specialStore.specialList}
        name="기획전"
        handleFilterChange={(value) => specialStore.getSpecialList(value)}
      />
      <Footer />
    </>
  );
}

SpecialPage.getInitialProps = function({ pathname, query }) {
  const initialProps = { layout: {} };

  if (isServer) {
    const { type, headerFlags } = getLayoutInfo({ pathname, query });

    initialProps.initialState = {
      layout: { type, headerFlags },
    };
  }

  return initialProps;
};

export default observer(SpecialPage);
