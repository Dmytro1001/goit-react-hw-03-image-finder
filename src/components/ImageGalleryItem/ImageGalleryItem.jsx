import { PropTypes } from 'prop-types';
import {
  ImageGalleryEl,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styles';

export const ImageGalleryItem = ({ url, onClick, bigImage }) => {
  return (
    <ImageGalleryEl onClick={() => onClick(bigImage)}>
      <ImageGalleryItemImage src={url} alt="#" />
    </ImageGalleryEl>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  //   onClick: PropTypes.func.isRequired,
  bigImage: PropTypes.string.isRequired,
};
