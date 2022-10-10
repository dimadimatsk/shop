import React, { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import ItemBlock from '../components/ItemBlock';
import Sort from '../components/Sort';
import axios from 'axios';

const Main = () => {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    const { data } = await axios.get('https://63441194b9ab4243cade8143.mockapi.io/items');
    setItems(data);
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Items for sale</h2>
      <div className="content__items">
        {items.map((obj) => (
          <ItemBlock key={obj.id} {...obj} />
        ))}
      </div>
    </div>
  );
};

export default Main;
