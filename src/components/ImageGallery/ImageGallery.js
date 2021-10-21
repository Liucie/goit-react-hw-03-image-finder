import { Component } from 'react';
import PropTypes from 'prop-types';
import { PixabayFetch } from '../../services/pixabay';
import { ImageGalleryItem } from './ImageGalleryItem';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Loader from 'react-loader-spinner';

const base_url = 'https://pixabay.com/api/';
const api_key = '23237261-94e774dc3474a501c481a5592';

const newPixabayFetch = new PixabayFetch(base_url, api_key);

export class ImageGallery extends Component {
  state = {
    searchResults: [],
    isLoading: false,
    showModal: false,
    currentImg: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.setState({ isLoading: true });
      newPixabayFetch.resetPage();
      newPixabayFetch.searchQuery = this.props.searchValue;
      newPixabayFetch
        .searchPhotos()
        .then(searchResults => {
          this.setState({ searchResults, isLoading: false });
        })
        .catch(err => {
          alert('Error! Try again!');
          console.log(err);
        });
    }
  }
  handleClick = () => {
    this.setState({ isLoading: true });
    newPixabayFetch.page = 1;
    newPixabayFetch
      .searchPhotos()
      .then(searchResults => {
        this.setState(prevState => ({
          isLoading: false,
          searchResults: [...prevState.searchResults, ...searchResults],
        }));
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(err => {
        alert('Error! Try again!');
        console.log(err);
      });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  onClickImg = obj => {
    // console.log(obj)
    this.setState({ currentImg: obj });
    this.toggleModal();
  };

  render() {
    const { searchResults, isLoading, showModal, currentImg } = this.state;
    return (
      <>
        <ul className="ImageGallery">
          {searchResults.length > 0 &&
            searchResults.map(item => {
              return (
                <ImageGalleryItem
                  key={item.id}
                  obj={item}
                  onClick={this.onClickImg}
                />
              );
            })}
        </ul>

        {isLoading && (
          <Loader
            type="Grid"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        )}

        {searchResults.length > 0 && <Button onClick={this.handleClick} />}

        {showModal && (
          <Modal
            onClose={this.toggleModal}
            src={currentImg.largeImageURL}
            alt={currentImg.tags}
          ></Modal>
        )}
      </>
    );
  }
}
ImageGallery.propTypes = {
  searchValue: PropTypes.string,
};
