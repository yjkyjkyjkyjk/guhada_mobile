import { memo } from 'react';
import css from './RankingSection.module.scss';
import PropTypes from 'prop-types';
import RankItem, { rankShape } from './RankItem';
import { LoadingSpinnerDiv } from 'components/common/loading';

const RankingSection = ({ rank, handleSearch, count = 50 }) => {
  return (
    <div className={css['ranking__section']}>
      {rank.length > 0 ? (
        rank
          .slice(0, count)
          .map((rankItem, idx) => (
            <RankItem
              key={rankItem.word}
              rank={rankItem}
              idx={idx}
              handleClick={() => handleSearch(rankItem.word)}
            />
          ))
      ) : (
        <div className={css['section__loading']}>
          <LoadingSpinnerDiv />
        </div>
      )}
    </div>
  );
};

RankingSection.propTypes = {
  rank: PropTypes.arrayOf(rankShape),
  handleSearch: PropTypes.func,
  count: PropTypes.number,
};

export default memo(RankingSection, (prevProps, nextProps) => {
  return prevProps.rank === nextProps.rank;
});
