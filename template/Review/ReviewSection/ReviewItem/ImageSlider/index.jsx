import css from './ImageSlider.module.scss';
import Slider from 'react-slick';

const ImageSlider = ({ imageList }) => {
  return (
    <Slider
      dots
      dotsClass={css['image-slider__slick-dots']}
      centerMode
      centerPadding="20px"
      slidesToShow={1}
      infinite={false}
    >
      {imageList.map((image) => (
        <div key={image} className={css['image-wrapper']}>
          <div
            className={css['image']}
            style={{ backgroundImage: `url('${image}')` }}
          />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
