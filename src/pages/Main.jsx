import React from 'react';
import ItemBlock from '../components/ItemBlock';

const Main = () => {
  return (
    <div className="container">
      <div className="content__top"></div>
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
