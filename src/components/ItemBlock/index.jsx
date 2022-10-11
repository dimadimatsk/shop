import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfAlt, faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faFullStar } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const ItemBlock = ({ id, title, price, description, category, image, rate, count }) => {
  return (
    <div className="item-block">
      <div className="item-block__image-container">
        <img className="item-block__image" src={image} alt="item" />
      </div>
      <h4 className="item-block__title">{title}</h4>
      <div className="item-block__rating">
        <span>
          <FontAwesomeIcon
            style={{ color: 'hsl(26, 100%, 55%)' }}
            icon={rate >= 1 ? faFullStar : rate >= 0.5 ? faStarHalfAlt : faStar}
          />
          <FontAwesomeIcon
            style={{ color: 'hsl(26, 100%, 55%)' }}
            icon={rate >= 2 ? faFullStar : rate >= 1.5 ? faStarHalfAlt : faStar}
          />
          <FontAwesomeIcon
            style={{ color: 'hsl(26, 100%, 55%)' }}
            icon={rate >= 3 ? faFullStar : rate >= 2.5 ? faStarHalfAlt : faStar}
          />
          <FontAwesomeIcon
            style={{ color: 'hsl(26, 100%, 55%)' }}
            icon={rate >= 4 ? faFullStar : rate >= 3.5 ? faStarHalfAlt : faStar}
          />
          <FontAwesomeIcon
            style={{ color: 'hsl(26, 100%, 55%)' }}
            icon={rate >= 5 ? faFullStar : rate >= 4.5 ? faStarHalfAlt : faStar}
          />
        </span>
        <span className="item-block__rating-count">{count}</span>
      </div>
      <div className="item-block__bottom">
        <div className="item-block__price">{price} $</div>
        <button className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Add</span>
          <i>0</i>
        </button>
      </div>
    </div>
  );
};

export default ItemBlock;
