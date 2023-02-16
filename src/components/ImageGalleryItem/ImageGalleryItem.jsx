import '../styles.css';
import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    isOpenModal: false,
  };
  handleToggleModal = e => {
    this.setState(prevState => ({ isOpenModal: !prevState.isOpenModal }));
  };

  render() {
    // console.log(this.props);
    const { image, tag, largeImage } = this.props;

    return (
      <li className="ImageGalleryItem" onClick={this.handleToggleModal}>
        <img src={image} alt={tag} className="ImageGalleryItem-image" />
        {this.state.isOpenModal && (
          <Modal largeImage={largeImage} closeModal={this.handleToggleModal} />
        )}
      </li>
    );
  }
}
