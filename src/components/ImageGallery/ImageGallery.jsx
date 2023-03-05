import { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchImages } from '../../services/getFetchImages';
import { ImageGalleryList } from './ImageGallery.styles';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export class ImageGallery extends Component {
  state = {
    images: [],
    totalHits: null,
    page: null,
    status: 'idle',
  };

  async componentDidMount() {
    this.setState({ status: 'idle' });

    try {
      const data = await fetchImages(this.props.value);
      this.setState({ images: data, status: 'resolved' });
    } catch {
      this.setState({ status: 'rejected' });
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

    if (status === 'idle') {
      return <p>Please write what you are looking for in the search field.</p>;
    }

    if (status === 'rejected') {
      return <p>ERROR</p>;
    }

    if (status === 'pending') {
      return (
        <>
          <Loader />
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <ImageGalleryList>
            {images?.map(item => {
              return (
                <ImageGalleryItem
                  key={item.id}
                  url={item.webformatURL}
                  onClick={this.props.onClick}
                  bigImage={item.largeImageURL}
                />
              );
            })}
          </ImageGalleryList>

          {images.length >= 12 && <Button onClick={this.handleLoadMore} />}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
