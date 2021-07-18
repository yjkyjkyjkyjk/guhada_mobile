import { memo } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'components/atoms';
import css from './HashtagFavoriteHeading.module.scss';

// TODO : Styled-components Sprite
const IMAGE_PATH = {
  title:
    '/public/icons/text/text_favorite_hashtag/text_favorite_hashtag@3x.png',
  emoji: '/public/icons/emoji/emoji_finger_fire/emoji_finger_fire@3x.png',
};

function HashtagFavoriteHeading({ headingStyles }) {
  return (
    <div className={css.Wrapper} style={headingStyles}>
      <Image src={IMAGE_PATH.title} width={'87px'} />
      <Image src={IMAGE_PATH.emoji} width={'37px'} />
    </div>
  );
}

HashtagFavoriteHeading.propTypes = {
  headingStyles: PropTypes.object,
};

export default memo(HashtagFavoriteHeading);
