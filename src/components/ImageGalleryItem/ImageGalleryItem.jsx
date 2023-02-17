import '../styles.css';
import React, { useState } from 'react';
import { Modal } from 'components/Modal/Modal';

export function ImageGalleryItem({ image, tag, largeImage }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleToggleModal = () => {
    setIsOpenModal(prevState => !prevState);
  };

  return (
    <li className="ImageGalleryItem" onClick={handleToggleModal}>
      <img src={image} alt={tag} className="ImageGalleryItem-image" />
      {isOpenModal && (
        <Modal largeImage={largeImage} closeModal={handleToggleModal} />
      )}
    </li>
  );
}
