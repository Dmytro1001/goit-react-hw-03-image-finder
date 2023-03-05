import { Component } from 'react';
import { fetchImages } from '../../services/getFetchImages';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGalleryList } from './ImageGallery.styles';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

const STATUS = {
  INIT: 'init',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

export class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
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
      prevProps.value === this.props.state.value
    ) {
      const newPage = await fetchImages(this.props.value, this.state.pege);
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

        {status === STATUS.LOADING ||
          (status === STATUS.INIT && <p>Loading</p>)}

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
      </>
    );
  }
}
