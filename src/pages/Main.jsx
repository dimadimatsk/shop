import React, { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import ItemBlock from '../components/ItemBlock';
import Sort from '../components/Sort';
import axios from 'axios';
import Skeleton from '../components/ItemBlock/Skeleton';

const Main = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [categoryId, setCategoryId] = useState(0);

  const categoryQuery = categoryId > 0 ? categoryId : '';

  const getItems = async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      `https://63441194b9ab4243cade8143.mockapi.io/items?category=${categoryQuery}`,
    );
    setIsLoading(false);
    setItems(data);
  };

  useEffect(() => {
    getItems();
  }, [categoryId]);

  const itemCards = items.map((obj) => <ItemBlock key={obj.id} {...obj} />);
  const skeleton = [...Array(4)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickCategory={(categoryId) => setCategoryId(categoryId)}
        />
        <Sort />
      </div>
      <h2 className="content__title">Items for sale</h2>
      <div className="content__items">{isLoading ? skeleton : itemCards}</div>
    </div>
  );
};

export default Main;
