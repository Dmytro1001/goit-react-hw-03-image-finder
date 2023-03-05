import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { HeaderSearchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';

export class App extends Component {
  state = {
    isOpenModal: false,
    textSearch: 'wave',
    currentImage: null,
  };

  toggleModal = event => {
    this.setState(prevState => ({
      isOpenModal: !prevState.isOpenModal,
    }));
  };

  openModal = largeImage => {
    this.setState({
      currentImage: largeImage,
      isOpenModal: true,
    });
  };

  handleSubmit = textSearch => {
    this.setState({ textSearch });
  };

  render() {
    const { isOpenModal, currentImage } = this.state;

    return (
      <div className="container">
        <HeaderSearchbar onSubmit={this.handleSubmit} />
        <ImageGallery value={this.state.textSearch} onClick={this.openModal} />
        {isOpenModal && (
          <Modal onClose={this.toggleModal} currentImage={currentImage} />
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
