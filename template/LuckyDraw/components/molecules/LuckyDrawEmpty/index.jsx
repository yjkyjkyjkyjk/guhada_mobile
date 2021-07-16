import css from './LuckyDrawEmpty.module.scss';

/**
 * 럭키드로우 상품이 없는 경우 배너
 * @returns LuckyDrawEmpty
 */
function LuckyDrawEmpty() {
  return (
    <div className={css.wrapper}>
      <div className={css.section}>
        <div className={css.title}>Comming Soon</div>
        <span className={css.contents}>
          <p>더욱 풍성한 제품을 준비중입니다.</p>
          <p>다음 럭키드로우를 기대해주세요!</p>
        </span>
      </div>
    </div>
  );
}

export default LuckyDrawEmpty;
