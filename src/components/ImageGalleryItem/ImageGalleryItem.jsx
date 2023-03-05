import { PropTypes } from 'prop-types';
import {
  ImageGalleryEl,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styles';

export const ImageGalleryItem = ({ url, onClick, bigImages }) => {
  return (
    <ImageGalleryEl onClick={() => onClick(bigImages)}>
      <ImageGalleryItemImage src={url} alt="" />
    </ImageGalleryEl>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  bigImages: PropTypes.string.isRequired,
};
