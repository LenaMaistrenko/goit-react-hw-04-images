import './styles.css';
import React from 'react';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { getAlbumsService } from '../services/gallery';

export class App extends Component {
  state = {
    filter: '',
    albums: [],
    status: 'idle',
    totalHits: 0,
    page: 1,
  };
  async componentDidUpdate(prevProps, prevState) {
    const { filter, page } = this.state;
    if (prevState.filter !== filter || prevState.page !== page) {
      this.setState({ status: 'loading' });

      try {
        {
          const response = await getAlbumsService(filter, page);
          const { hits, totalHits } = response;
          if (totalHits === 0) {
            alert('Nothing was found for your request');
            this.setState({ status: 'fulfilled' });
            return;
          }

          this.setState(prevState => ({
            albums: [...prevState.albums, ...hits],
            totalHits: totalHits - [...prevState.albums, ...hits].length,
            status: 'fulfilled',
          }));
        }
      } catch (error) {
        this.setState({ status: 'rejected' });
        throw new Error(error.message);
      }
    }
  }
  handleFilterSubmit = filter => {
    this.setState({ filter, page: 1, albums: [] });
  };

  handlerLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { albums, status, totalHits } = this.state;
    return (
      <>
        {' '}
        <div className="App">
          <Searchbar onSubmit={this.handleFilterSubmit} />
          {status === 'loading' && <Loader />}
          <ImageGallery albums={albums} />
          {Boolean(totalHits) && <Button onLoadMore={this.handlerLoadMore} />}
        </div>
      </>
    );
  }
}
