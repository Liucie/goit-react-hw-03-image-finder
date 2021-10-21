import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
const modalRoot = document.querySelector('#modalRoot');
export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = e => {
    if (e.code === 'Escape') {
      console.log('press esc');
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">
          <img src={this.props.src} alt={this.props.alt} />
        </div>
      </div>,
      modalRoot,
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func,
  src: PropTypes.string,
  alt: PropTypes.string,
};
