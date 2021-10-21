import PropTypes from 'prop-types';

export function ImageGalleryItem({ onClick, obj }) {
  return (
    <li className="ImageGalleryItem">
      <img
        id={obj.id}
        src={obj.webformatURL}
        alt={obj.tags}
        className="ImageGalleryItem-image"
        onClick={() => {
          onClick(obj);
        }}
      />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  onClick: PropTypes.func,
  obj: PropTypes.object,
};
