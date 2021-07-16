import { useEffect, useState, useRef, memo } from 'react';
import css from './LuckyDrawCard.module.scss';
import PropTypes from 'prop-types';
import moment from 'moment';
import addCommaToNum from 'lib/common/addCommaToNum';
import { getTimeDiff } from 'lib/common/getTimeDiff';

import {
  LuckyDrawButton,
  LuckyDrawTimer,
} from 'template/LuckyDraw/components/atoms';
import { LuckyDrawCardFrame } from 'template/LuckyDraw/components/molecules';

/**
 * 럭키드로우 Card
 * @param {String} brandName : 상품 브랜드명
 * @param {Number} dealId : 상품 ID
 * @param {Number} discountPrice : 할인 금액
 * @param {Number} discountRate : 할인율
 * @param {String} imageUrl : 상품 이미지
 * @param {Number} requestFromAt : 이벤트 시작 시간
 * @param {Number} requestToAt : 이벤트 마감 시간
 * @param {Number} sellPrice : 판매 가격
 * @param {String} statusCode : 상품 상태 (NORMAL, READY, START, REQUESTED)
 * @param {String} statusText : 상품 상태 submit text
 * @param {String} title : 상품 제목
 * @param {Number} winnerAnnouncementAt : 발표 일자
 * @param {Number} winnerBuyFromAt : 구매 시작
 * @param {Nubmer} winnerBuyToAt} : 구매 마감
 * @returns
 */
function LuckyDrawCard({
  brandName,
  dealId,
  discountPrice,
  discountRate,
  imageUrl,
  requestFromAt,
  requestToAt,
  sellPrice,
  statusCode,
  statusText,
  title,
  winnerAnnouncementAt,
  winnerBuyFromAt,
  winnerBuyToAt,
  onClickRequestLuckyDraw,
}) {
  /**
   * states
   */
  const timer = useRef(null); // 럭키드로우 타이머 Interval
  const [deadLine, setDeadLine] = useState(null); // 럭키드로우 타이머 String

  /**
   * side effects
   */
  useEffect(() => {
    if (!timer.current) countDown();
    timer.current = setInterval(countDown, 1000);
    return () => clearInterval(timer.current);
  }, [requestToAt]);

  /**
   * helpers
   */

  /**
   * 럭키드로우 타이머 카운트다운
   */
  const countDown = () => {
    const timeStamp = getTimeDiff(requestToAt, Date.now());
    if (timeStamp > 0) {
      const time = moment.duration(timeStamp)?._data;
      setDeadLine({
        day: time.days,
        date: `
          ${moment(time).format('HH')} :
          ${moment(time).format('mm')} :
          ${moment(time).format('ss')}
        `,
      });
    } else {
      clearInterval(timer.current);
    }
  };

  /**
   * render
   */
  return (
    <div className={css.wrapper}>
      {/* 타이머 헤더 */}
      {deadLine && (statusCode === 'START' || statusCode === 'REQUESTED') && (
        <LuckyDrawTimer day={deadLine.day} date={deadLine.date} />
      )}

      {(statusCode === 'NORMAL' || statusCode === 'READY') && (
        <LuckyDrawTimer text={statusText.replace('오픈', 'OPEN')} />
      )}

      {/* 이미지 영역 */}
      <LuckyDrawCardFrame imageUrl={imageUrl} statusCode={statusCode} />

      {/* 응모하기 폼 */}
      {/* TODO : 컴포넌트 분리 */}
      <div className={css.sectionForm}>
        <div className={css.sectionFormHeader}>
          <div>{brandName}</div>
          <div>{title}</div>
        </div>
        <div className={css.sectionFormPrice}>
          <div>
            <div className={css.sectionFormPriceRate}>
              <span>{discountRate}%</span>
            </div>
            <div className={css.sectionFromSellDiscountPrice}>
              <span>{addCommaToNum(sellPrice)}</span>
            </div>
          </div>
          <div className={css.sectionFormSellPrice}>
            <span>{addCommaToNum(discountPrice)}</span>
            <span>원</span>
          </div>
        </div>
        <LuckyDrawButton
          isActive={statusCode === 'START' ? true : false}
          contents={
            statusCode === 'NORMAL' || statusCode === 'READY'
              ? '오픈예정'
              : statusText
          }
          onClick={() => onClickRequestLuckyDraw(dealId)}
        />
        {/* TODO : Atoms > Paragraph > LuckyDaraw Notifiy */}
        <div className={css.sectionNotify}>
          <div className={css.sectionNotifyItem}>
            <span>응모기간</span>
            <span />
            <span>
              {moment(requestFromAt).format('M월 DD일 (ddd) HH:mm')} ~{' '}
              {moment(requestToAt).format('M월 DD일 (ddd) HH:mm')}
            </span>
          </div>
          <div className={css.sectionNotifyItem}>
            <span>발표일자</span>
            <span />
            <span>
              {moment(winnerAnnouncementAt).format('M월 DD일 (ddd) HH:mm')}
            </span>
          </div>
          <div className={css.sectionNotifyItem}>
            <span>구매기간</span>
            <span />
            <span>
              {moment(winnerBuyFromAt).format('M월 DD일 (ddd) HH:mm')} ~{' '}
              {moment(winnerBuyToAt).format('M월 DD일 (ddd) HH:mm')}
            </span>
          </div>
        </div>
      </div>
      <hr className={css.wrapperDivider} />
    </div>
  );
}

LuckyDrawCard.propTypes = {
  brandName: PropTypes.string,
  discountPrice: PropTypes.number,
  discountRate: PropTypes.number,
  imageUrl: PropTypes.string,
  requestToAt: PropTypes.number,
  sellPrice: PropTypes.number,
  statusCode: PropTypes.string,
  statusText: PropTypes.string,
  title: PropTypes.string,
  onClickRequestLuckyDraw: PropTypes.func,
};

export default memo(LuckyDrawCard);
