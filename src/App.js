import './App.css';
import React, { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';

class App extends Component {
  state = {
    searchValue: '',
  };

  handleFormSubmit = searchValue => {
    this.setState({ searchValue });
  };

  render() {
    const { searchValue } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit}></Searchbar>
        <ImageGallery searchValue={searchValue}></ImageGallery>
      </div>
    );
  }
}

export default App;
