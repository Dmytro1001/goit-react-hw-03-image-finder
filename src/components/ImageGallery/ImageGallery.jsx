import { Component } from 'react';
import { PropTypes } from 'prop-types';
import { fetchImages } from '../../services/getFetchImages';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGalleryList } from './ImageGallery.styles';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

const STATUS = {
  INIT: 'init',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

export class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    status: 'STATUS.INIT',
  };

  async componentDidMount() {
    this.setState({ status: STATUS.LOADING });

    try {
      const data = await fetchImages(this.props.value);
      this.setState({ images: data, status: STATUS.SUCCESS });
    } catch {
      this.setState({ status: STATUS.ERROR });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      const newData = await fetchImages(this.props.value);
      this.setState({ images: newData });
    }

    if (
      prevState.page !== this.state.page &&
      prevProps.value === this.props.value
    ) {
      const newPage = await fetchImages(this.props.value, this.state.page);
      this.setState(prevState => ({
        images: [...prevState.images, ...newPage],
      }));
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { status, images } = this.state;

    return (
      <>
        {status === STATUS.ERROR && <p>ERROR</p>}

        {status === STATUS.LOADING || (status === STATUS.INIT && <Loader />)}

        {status === STATUS.SUCCESS && (
          <ImageGalleryList>
            {images?.map(item => {
              return (
                <ImageGalleryItem
                  key={item.webformatURL}
                  url={item.webformatURL}
                  onClick={this.props.onClick}
                  bigImage={item.largeImageURL}
                />
              );
            })}
          </ImageGalleryList>
        )}
        {images.length >= 12 && <Button onClick={this.handleLoadMore} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  value: PropTypes.string.isRequired,
  // onClick: PropTypes.func.isRequired,
};
