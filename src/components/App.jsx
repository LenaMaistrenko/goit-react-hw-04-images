import './styles.css';
import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { getAlbumsService } from '../services/gallery';
export function App() {
  const [filter, setFilter] = useState('');
  const [albums, setAlbums] = useState([]);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!filter) return;

    async function getImage() {
      setStatus('loading');
      try {
        const response = await getAlbumsService(filter, page);

        const { hits, totalHits } = response;
        setAlbums(prevState => [...prevState, ...hits]);
        setTotalHits(totalHits);
        //setTotalHits([totalHits - albums.length]);
        setStatus('fulfilled');
        console.log('totalHits', totalHits);
        if (totalHits === 0) {
          alert('Nothing was found for your request');
          setStatus('fulfilled');
          return;
        }
      } catch (error) {
        setStatus('rejected');
        throw new Error(error.message);
      }
    }
    getImage();
  }, [filter, page]);

  const handleFilterSubmit = filter => {
    setFilter(filter);
    setPage(1);
    setAlbums([]);
  };

  const handlerLoadMore = () => {
    setPage(prevState => prevState + 1);
  };
  const koef = Math.ceil(totalHits / 12);
  return (
    <>
      {' '}
      <div className="App">
        <Searchbar onSubmit={handleFilterSubmit} />
        {status === 'loading' && <Loader />}
        <ImageGallery albums={albums} />
        {koef > 1 && koef !== page && <Button onLoadMore={handlerLoadMore} />}
      </div>
    </>
  );
}
