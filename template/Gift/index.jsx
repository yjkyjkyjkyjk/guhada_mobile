import css from './Gift.module.scss';
import { observer } from 'mobx-react';
import useStores from 'stores/useStores';
import GiftHeader from './GiftHeader';
import DealItems from 'components/organisms/DealItems';

function Gift() {
  /**
   * states
   */
  const { gift: giftStore } = useStores();

  /**
   * render
   */
  return (
    <div className={css.gift}>
      <GiftHeader />
      <DealItems
        title={'추천 기프트'}
        deals={giftStore.recommendDeals}
        thumbnail={-1}
        isLazy={false}
      />
      <DealItems
        title={'베스트 기프트'}
        deals={giftStore.bestDeals}
        isLazy={false}
      />
    </div>
  );
}

export default observer(Gift);
