import React, { useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import PropTypes from 'prop-types';

export function Searchbar(props) {
  const [filter, setFilter] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmit(filter);
    if (filter.trim() === '') {
      alert('Please enter a search value');
      return;
    }
    setFilter('');
  };
  const handleChange = e => {
    setFilter(e.currentTarget.value.toLowerCase());
  };
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

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
