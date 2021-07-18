import { memo } from 'react';
import PropTypes from 'prop-types';
import css from './ReviewCardProdInfo.module.scss';
import Image from 'components/atoms/Image';

/**
 * 리뷰 > 카드 > 상품 바로가기
 * @param {Number} dealId, 상품 ID
 * @param {String} imageUrl, 좌측 이미지
 * @param {String} title, 상품명
 * @param {String} contents, 상품 설명
 * @returns
 */
function CardProdInfo({ dealId, imageUrl, title, contents, onClickProduct }) {
  return (
    <div
      className={css.Wrapper}
      onClick={(e) => {
        e.stopPropagation();
        onClickProduct(dealId);
      }}
    >
      <div className={css.ImageSection}>
        <Image src={imageUrl} width={'50px'} height={'50px'} />
      </div>
      <div className={css.ContentSection}>
        <div className={css.Title}>{title}</div>
        <div className={css.Contents}>{contents}</div>
      </div>
    </div>
  );
}

CardProdInfo.propTypes = {
  dealId: PropTypes.number,
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  contents: PropTypes.string,
  onClickProduct: PropTypes.func,
};

export default memo(CardProdInfo);
