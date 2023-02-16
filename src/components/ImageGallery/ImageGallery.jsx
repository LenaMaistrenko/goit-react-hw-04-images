import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import '../styles.css';

export function ImageGallery({ albums }) {
  return (
    <ul className="ImageGallery">
      {albums?.map(album => (
        <ImageGalleryItem
          key={album.id}
          image={album.webformatURL}
          largeImage={album.largeImageURL}
          tag={album.tags}
        />
      ))}
    </ul>
  );
}
