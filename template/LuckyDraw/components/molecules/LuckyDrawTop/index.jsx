import css from './LuckyDrawTop.module.scss';

/**
 * 럭키드로우 상단 배너
 * @returns LuckyDrawTopBanner
 */
const LuckyDrawTopBanner = ({ children }) => (
  <div className={css.luckyDrawTopBannerSection}>{children}</div>
);

export default LuckyDrawTopBanner;
