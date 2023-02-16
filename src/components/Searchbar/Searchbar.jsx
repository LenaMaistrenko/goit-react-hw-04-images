import { Component } from 'react';
import { HiSearch } from 'react-icons/hi';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    filter: '',
    page: 1,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.filter);
    if (this.state.filter.trim() === '') {
      alert('Please enter a search value');
      return;
    }
  };
  handleChange = e => {
    this.setState({ filter: e.currentTarget.value.toLowerCase() });
  };

  render() {
    const { handleSubmit, handleChange } = this;
    const { filter } = this.state;
    return (
      <header className="Searchbar">
        <form onSubmit={handleSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <HiSearch style={{ width: 20, height: 20 }} />
          </button>

          <input
            className="SearchForm-input"
            type="text"
            name="filter"
            value={filter}
            onChange={handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
