import { useMemo } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import useStores from 'stores/useStores';
import css from './Recently.module.scss';

import Image from 'components/atoms/Image';

import { pushRoute } from 'lib/router';
import { useWindowSize } from 'lib/hooks';
import ModalPortal from 'components/templates/ModalPortal';

const IMAGE_PATH = {
  DELETE_IMAGE: '/public/icon/like_item_delete.png',
  NO_DATA: '/public/icon/icon_no_data.png',
};

function RecentlyTemplate({ handleClose }) {
  const { mypageRecentlySeen } = useStores();
  const { width: windowWidth } = useWindowSize();

  const histoyItems = toJS(mypageRecentlySeen.list);

  /**
   * handlers
   */

  // 최근 본 상품 > 아이템 삭제
  const onClickDeleteItem = (e, dealsId) =>
    mypageRecentlySeen.removeItem(e, dealsId);

  // 최근 본 상품 > 아이템 전체 삭제
  const onClickAllDeleteItem = () => mypageRecentlySeen.removeItemAll();

  // 최근 본 상품 > 아이템 상세 이동
  const onClickSelectItem = (dealId) =>
    pushRoute(`/productdetail?deals=${dealId}`);

  /**
   * Helpers
   */

  // 아이템 길이
  const ContentItemLength = useMemo(
    () => (windowWidth - 43) / 3,
    [windowWidth]
  );

  return (
    <ModalPortal handleClose={handleClose}>
      <div className={css.RecentlyWrapper}>
        <div className={css['header']}>
          <div className={css['header__title']}>최근 본 상품</div>
          <div
            className={cn(css['header__close'], 'icon close')}
            onClick={handleClose}
          />
        </div>
        {/* 상단 메뉴 */}
        <div className={css.MenuSection}>
          <div className={css.MenuCounts}>총 {histoyItems?.length}개</div>
          <button
            className={css.MenuDeleteButton}
            onClick={() => onClickAllDeleteItem()}
          >
            전체 삭제
          </button>
        </div>
        {/* 최근 본 상품 */}
        {histoyItems && histoyItems.length ? (
          <div className={css.ContentSection}>
            {histoyItems.map((o) => (
              // 전체 - 40 / 3
              <div
                className={css.ContentItem}
                key={o.dealId}
                onClick={() => {
                  onClickSelectItem(o.dealId);
                  handleClose();
                }}
                style={{
                  width: ContentItemLength ? `${ContentItemLength}px` : '110px',
                  height: ContentItemLength
                    ? `${ContentItemLength}px`
                    : '110px',
                }}
              >
                <Image src={o.imageUrls[0]} size={'contain'} />
                <div
                  className={css.ContentDeleteButton}
                  onClick={(e) => onClickDeleteItem(e, o.dealsId)}
                  length={ContentItemLength}
                  style={{
                    bottom: ContentItemLength
                      ? `${ContentItemLength}px`
                      : '110px',
                    left: ContentItemLength
                      ? `${ContentItemLength - 26}px`
                      : '110px',
                  }}
                >
                  <Image
                    src={IMAGE_PATH.DELETE_IMAGE}
                    width={'26px'}
                    height={'26px'}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={css.ContentEmpty}>
            <div className={css.ContentEmptyCenter}>
              <div className={css.ContentEmptyItem}>
                <Image
                  isLazy={true}
                  src={IMAGE_PATH.NO_DATA}
                  width={'60px'}
                  height={'60px'}
                />
              </div>
              <div className={css.ContentEmptyItem}>
                최근 본 상품이 없습니다.
              </div>
            </div>
          </div>
        )}
      </div>
    </ModalPortal>
  );
}

export default observer(RecentlyTemplate);
