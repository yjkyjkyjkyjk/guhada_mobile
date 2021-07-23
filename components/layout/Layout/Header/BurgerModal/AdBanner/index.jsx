import css from './AdBanner.module.scss';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Slider from 'react-slick';
import useStores from 'stores/useStores';
import { pushRoute } from 'lib/router';

const AdBanner = ({ handleBeforeClick }) => {
  /**
   * states
   */
  const { newMain: newMainStore, special: specialStore } = useStores();
  const imageList = newMainStore.mainData.mainBannerList;

  /**
   * side effects
   */
  useEffect(() => {
    for (let i = 0; i < imageList.length; ++i) {
      if (imageList[i].link.includes('special')) {
        const eventIds = imageList[i].link.replace(/[^0-9]/g, '');
        imageList[i].eventIds = eventIds;
      }
    }
  }, []);

  /**
   * handlers
   */
  const handleClick = (image) => {
    image.eventIds
      ? specialStore.toSearch({ eventIds: image.eventIds })
      : pushRoute(image.link);
    handleBeforeClick();
  };

  /**
   * render
   */
  return (
    <Slider
      dots
      dotsClass={css['ad-banner__slick-dots']}
      centerMode
      centerPadding="20px"
      speed={500}
      autoplay
      autoplaySpeed={3000}
      slidesToShow={1}
    >
      {imageList.map(
        (image) =>
          image.mainUse &&
          image.communityPlusImageUrl && (
            <div
              key={image.id}
              className={css['image-wrapper']}
              onClick={() => handleClick(image)}
            >
              <div
                className={css['image']}
                style={{
                  backgroundImage: `url('${image.communityPlusImageUrl}')`,
                  backgroundColor: image.backgroundColor,
                }}
              />
            </div>
          )
      )}
    </Slider>
  );
};

AdBanner.propTypes = {
  handleBeforeClick: PropTypes.func,
};

export default observer(AdBanner);
