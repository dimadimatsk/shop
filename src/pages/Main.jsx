import React, { useContext, useEffect, useState } from 'react';
import Categories from '../components/Categories';
import ItemBlock from '../components/ItemBlock';
import Pagination from '../components/Pagination';
import Sort, { sortList } from '../components/Sort';
import axios from 'axios';
import Skeleton from '../components/ItemBlock/Skeleton';
import { SearchContext } from '../App';

const Main = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const { searchValue } = useContext(SearchContext);

  const categoryQuery = categoryId > 0 ? categoryId : '';
  const sortByQuery = sortList[sortType].sortProperty === 'rating' ? 'rate' : 'price';
  const sortOrderQuery = sortList[sortType].sortOrder;
  const searchQuery = searchValue ? `&search=${searchValue}` : '';

  const getItems = async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      `https://63441194b9ab4243cade8143.mockapi.io/items?category=${categoryQuery}&sortBy=${sortByQuery}&order=${sortOrderQuery}&${
        searchQuery ? '' : `page=${currentPage}`
      }&limit=8${searchQuery}`,
    );
    setIsLoading(false);
    setItems(data);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getItems();
  }, [categoryId, sortType, currentPage, searchValue]);

  const itemCards = items
    .filter((obj) => obj['title'].toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj) => <ItemBlock key={obj.id} {...obj} />);
  const skeleton = [...Array(8)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickCategory={(categoryId) => setCategoryId(categoryId)}
        />
        <Sort sortType={sortType} onClickSort={(sortType) => setSortType(sortType)} />
      </div>
      <h2 className="content__title">Items for sale</h2>
      <div className="content__items">{isLoading ? skeleton : itemCards}</div>

      <Pagination currentPage={currentPage} onPageClick={(page) => setCurrentPage(page)} />
    </div>
  );
};

export default Main;
