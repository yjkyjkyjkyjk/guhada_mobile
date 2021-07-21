import css from './RecentlySection.module.scss';
import { observer } from 'mobx-react';
import useStores from 'stores/useStores';
import { useRouter } from 'next/router';
import RecentlyItem from './RecentlyItem';

const RecentlySection = () => {
  /**
   * states
   */
  const router = useRouter();
  const { mypageRecentlySeen: recentlySeenStore } = useStores();

  /**
   * handlers
   */
  const handleDelete = (e, dealId) => {
    e.stopPropagation();
    recentlySeenStore.removeItem(dealId);
  };
  const handleDeleteAll = () => {
    recentlySeenStore.removeItemAll();
  };
  const handleClick = (dealId) => {
    router.push(`/productdetail?deals=${dealId}`);
  };

  /**
   * render
   */
  return (
    <div className={css['modal__section']}>
      <div className={css['section__header']}>
        <div>총 {recentlySeenStore.list.length}개</div>
        <button className={css['header__delete']} onClick={handleDeleteAll}>
          전체 삭제
        </button>
      </div>
      <div className={css['section__items']}>
        {recentlySeenStore.list.map((item) => (
          <RecentlyItem
            key={item.dealId}
            item={item}
            handleClick={handleClick}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default observer(RecentlySection);
