import { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWindiw, Images } from './Modal.styles';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyModalClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyModalClose);
  }

  handleKeyModalClose = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <Overlay onClick={this.handleBackdropClick}>
        <ModalWindiw>
          <Images src={this.props.currentImage} alt="#" />
        </ModalWindiw>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  currentImage: PropTypes.string.isRequired,
};
