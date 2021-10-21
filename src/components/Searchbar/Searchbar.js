import { Component } from 'react';
import PropTypes from 'prop-types';
export default class Searchbar extends Component {
  state = {
    searchValue: '',
    searchResults: [],
  };
  handleSearchChange = e => {
    this.setState({ searchValue: e.currentTarget.value.toLowerCase() });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchValue);
    this.setState({ searchValue: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            value={this.state.searchValue}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleSearchChange}
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
