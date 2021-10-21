import { Component } from 'react';
import PropTypes from 'prop-types';
import { PixabayFetch } from '../../services/pixabay';
import { ImageGalleryItem } from './ImageGalleryItem';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Loader from 'react-loader-spinner';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const base_url = 'https://pixabay.com/api/';
const api_key = '23237261-94e774dc3474a501c481a5592';

const newPixabayFetch = new PixabayFetch(base_url, api_key);

export class ImageGallery extends Component {
  state = {
    searchResults: [],
    status: Status.IDLE,
    showModal: false,
    currentImg: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.setState({ status: Status.PENDING });
      newPixabayFetch.resetPage();
      newPixabayFetch.searchQuery = this.props.searchValue;
      newPixabayFetch
        .searchPhotos()
        .then(searchResults => {
          this.setState({ searchResults, status: Status.RESOLVED });
        })
        .catch(err => this.setState({ status: Status.REJECTED }))
        .finally(() => {
          this.setState({ status: Status.RESOLVED });
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        });
    }
  }
  handleClick = () => {
    this.setState({ status: Status.PENDING });
    newPixabayFetch.page = 1;
    newPixabayFetch
      .searchPhotos()
      .then(searchResults => {
        this.setState(prevState => ({
          searchResults: [...prevState.searchResults, ...searchResults],
          status: Status.RESOLVED,
        }));
      })
      .catch(err => this.setState({ status: Status.REJECTED }))
      .finally(() => {
        this.setState({ status: Status.RESOLVED });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
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
    const { searchResults, status, showModal, currentImg } = this.state;
    if (status === 'idle') {
      return <div></div>;
    }
    if (status === 'pending') {
      return (
        <Loader
          type="Grid"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      );
    }
    if (status === 'resolved') {
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
    if (status === 'rejected') {
      return alert('Error! Try again!');
    }
  }
}
ImageGallery.propTypes = {
  searchValue: PropTypes.string,
};
