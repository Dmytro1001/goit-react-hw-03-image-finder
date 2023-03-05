import { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay } from './Modal.styles';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleModalClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleModalClose);
  }

  handleModalClose = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <Overlay onClick={this.handleBackdropClick}>
        <Modal>
          <img src={this.props.currentImage} alt="#" />
        </Modal>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  currentImage: PropTypes.string.isRequired,
};
