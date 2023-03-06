import { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import { fetchImages } from '../../services/getFetchImages';
import { ImageGalleryList } from './ImageGallery.styles';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export class ImageGallery extends Component {
  state = {
    request: '',
    images: [],
    totalHits: null,
    page: 1,
    loadBtnShown: false,
    error: null,
  };

  // async componentDidMount() {
  //   this.setState({ status: 'idle' });

  //   try {
  //     const data = await fetchImages(this.props.value);
  //     this.setState({ images: data, status: 'resolved' });
  //   } catch {
  //     this.setState({ status: 'rejected' });
  //   }
  // }

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.value;
    const currentQuery = this.props.value;
    const prevPage = prevState.page;
    const currentPage = this.state.page;
    const prevStateRequest = prevState.request;

    if (prevQuery !== currentQuery) {
      this.setState(prev => ({
        ...prev,
        images: [],
        page: 1,
        request: currentQuery,
        loadBtnShown: true,
      }));
    }

    if (
      prevStateRequest !== this.state.request ||
      (prevPage !== currentPage && currentPage !== 1)
    ) {
      this.setState({ loading: true, page: currentPage });

      fetchImages(currentQuery, currentPage)
        .then(data => {
          if (data.total === 0) {
            this.setState({ loading: false });
            return toast.warn(`Nothing was found for ${currentQuery}`, {
              position: 'top-center',
              theme: 'colored',
            });
          }

          if (data.hits.length < 12) {
            this.setState({ loadBtnShown: false });
          }

          this.setState(state => ({
            images: [...state.images, ...data.hits],
            loading: false,
          }));
        })
        .catch(error => this.setState({ error }));
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1, loading: true }));
  };

  render() {
    const { images, loading, loadBtnShown } = this.state;

    return (
      <>
        <ImageGalleryList>
          {images.length > 0 &&
            images.map(item => {
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
        {images.length > 0 && !loading && loadBtnShown && (
          <Button onClick={this.handleLoadMore} />
        )}
        {loading && <Loader />}
        <ToastContainer autoClose={1500} />
      </>
    );
  }
}

ImageGallery.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
