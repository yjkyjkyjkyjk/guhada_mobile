import css from './PluginButtons.modules.scss';
import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import openPopupCenter from 'childs/lib/common/openPopupCenter';
import RecentlyModal from 'template/RecentlyModal';

const PluginButtons = ({ isScrollDown, recentCount, top, kakao, recent }) => {
  /**
   * states
   */
  const [isModalOpen, setIsModalOpen] = useState(0);

  /**
   * render
   */
  return (
    <div className={css['plugin-buttons']}>
      {top && isScrollDown && (
        <div
          className={cn(css['button'], 'special plugin-top')}
          onClick={() => window.scrollTo(0, 0)}
        />
      )}
      {recent && recentCount > 0 && (
        <div
          className={cn(
            css['button'],
            css['button--recently'],
            'special plugin-recently'
          )}
          onClick={() => setIsModalOpen(1)}
        >
          <div className={css['recently__count']}>{recentCount}</div>
        </div>
      )}
      {kakao && (
        <div
          className={cn(css['button'], 'special plugin-kakao')}
          onClick={() =>
            openPopupCenter(
              'https://pf.kakao.com/_yxolxbT/chat',
              '구하다 채팅하기',
              500,
              700
            )
          }
        />
      )}
      {isModalOpen === 1 && (
        <RecentlyModal handleClose={() => setIsModalOpen(0)} />
      )}
    </div>
  );
};

PluginButtons.propTypes = {
  isScrollDown: PropTypes.bool,
  recentCount: PropTypes.number,
  top: PropTypes.bool,
  kakao: PropTypes.bool,
  recent: PropTypes.bool,
};

export default memo(PluginButtons);
