import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { HeaderSearchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    textSearch: '',
    isOpenModal: false,
    currentImage: null,
  };

  toggleModal = e => {
    this.setState(prevState => ({ isOpenModal: !prevState.isOpenModal }));
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
        <HeaderSearchbar onSearch={this.handleSubmit} />
        <ImageGallery value={this.state.textSearch} onClick={this.openModal} />
        {isOpenModal && (
          <Modal onClose={this.toggleModal} currentImage={currentImage} />
        )}
      </div>
    );
  }
}
