import axios from 'axios';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfAlt, faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faFullStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { plusItem } from '../redux/slices/cartSlice';

const FullItem = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [item, setItem] = useState();
  const navigate = useNavigate();
  const cartItem = useSelector((state) => state.cart.items.find((obj) => obj.id === id));

  useEffect(() => {
    async function fetchItem() {
      try {
        const { data } = await axios.get(`https://63441194b9ab4243cade8143.mockapi.io/items/${id}`);
        setItem(data);
      } catch (error) {
        console.error();
        navigate('/');
      }
    }
    fetchItem();
  }, []);

  const onClickAdd = () => {
    const obj = {
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      countCart: 0,
    };
    dispatch(plusItem(obj));
  };

  const addedItems = cartItem ? cartItem.countCart : 0;

  if (!item) {
    return <div className="load"></div>;
  }

  return (
    <div className="container">
      <div className="fullitem__top">
        <h2 className="fullitem__title">{item.title}</h2>
        <div className="item-block__rating">
          <span>
            <FontAwesomeIcon
              style={{ color: 'hsl(26, 100%, 55%)' }}
              icon={item.rate >= 1 ? faFullStar : item.rate >= 0.5 ? faStarHalfAlt : faStar}
            />
            <FontAwesomeIcon
              style={{ color: 'hsl(26, 100%, 55%)' }}
              icon={item.rate >= 2 ? faFullStar : item.rate >= 1.5 ? faStarHalfAlt : faStar}
            />
            <FontAwesomeIcon
              style={{ color: 'hsl(26, 100%, 55%)' }}
              icon={item.rate >= 3 ? faFullStar : item.rate >= 2.5 ? faStarHalfAlt : faStar}
            />
            <FontAwesomeIcon
              style={{ color: 'hsl(26, 100%, 55%)' }}
              icon={item.rate >= 4 ? faFullStar : item.rate >= 3.5 ? faStarHalfAlt : faStar}
            />
            <FontAwesomeIcon
              style={{ color: 'hsl(26, 100%, 55%)' }}
              icon={item.rate >= 5 ? faFullStar : item.rate >= 4.5 ? faStarHalfAlt : faStar}
            />
          </span>
          <span className="item-block__rating-count">{item.count} reviews</span>
        </div>
      </div>
      <div className="fullitem__content">
        <img className="fullitem__content--image" src={item.image} alt="item" />
        <div className="fullitem__content--description">
          <h3 className="description--title">Description:</h3>
          <div className="description--content">{item.description}</div>
          <div className="description--price-block">
            <div className="price">{item.price} $</div>
            <button
              onClick={onClickAdd}
              className="button button--outline button--add button--fullitem">
              {addedItems ? (
                <i>{addedItems}</i>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                    stroke="hsl(26, 100%, 55%)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                    stroke="hsl(26, 100%, 55%)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                    stroke="hsl(26, 100%, 55%)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <span>Add to cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullItem;
