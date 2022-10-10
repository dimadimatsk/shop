import React from 'react';
import Categories from '../components/Categories';
import ItemBlock from '../components/ItemBlock';
import Sort from '../components/Sort';

const Main = () => {
  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">All items</h2>
      <div className="content__items">
        <ItemBlock />
        <ItemBlock />
        <ItemBlock />
        <ItemBlock />
        <ItemBlock />
        <ItemBlock />
      </div>
    </div>
  );
};

export default Main;
