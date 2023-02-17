import '../styles.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export function Modal({ largeImage, tag, closeModal }) {
  const onClose = e => {
    if (e.currentTarget !== e.target) {
      closeModal();
    }
  };
  const onEscape = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', onEscape);
    return () => {
      window.removeEventListener('keydown', onEscape);
    };
  });

  return createPortal(
    <div className="Overlay">
      <div className="Modal" onClick={onClose}>
        <img src={largeImage} alt={tag} />
      </div>
    </div>,
    document.getElementById('modal')
  );
}

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
