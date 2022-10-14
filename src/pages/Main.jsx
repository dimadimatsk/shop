import React, { useEffect, useRef, useState } from 'react';
import qs from 'qs';
import Categories from '../components/Categories';
import ItemBlock from '../components/ItemBlock';
import Pagination from '../components/Pagination';
import Sort, { sortList } from '../components/Sort';
import axios from 'axios';
import Skeleton from '../components/ItemBlock/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [pageCount, setPageCount] = useState(3);
  const isMounted = useRef(false);
  const isSearch = useRef(false);

  const { categoryId, sortType, currentPage, searchValue } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryQuery = categoryId > 0 ? categoryId : '';
  const sortByQuery = sortList[sortType].sortProperty === 'rate' ? 'rate' : 'price';
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
    setPageCount(Math.ceil(data.totalCount / 8));
    setItems(data.items);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortByParam = sortList.findIndex(
        (obj) =>
          obj.name ===
          sortList.filter(
            (obj) => obj.sortProperty === params.sortBy && obj.sortOrder === params.order,
          )[0].name,
      );

      dispatch(
        setFilters({
          categoryId: params.category,
          sortType: sortByParam,
          currentPage: params.page,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getItems();
    }

    isSearch.current = false;
  }, [categoryId, sortType, currentPage, searchValue]);

  const itemCards = items
    .filter((obj) => obj['title'].toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj) => <ItemBlock key={obj.id} {...obj} />);
  const skeleton = [...Array(8)].map((_, i) => <Skeleton key={i} />);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        category: categoryQuery,
        sortBy: sortByQuery,
        order: sortOrderQuery,
        page: currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickCategory={(categoryId) => dispatch(setCategoryId(categoryId))}
        />
        <Sort sortType={sortType} onClickSort={(sortType) => dispatch(setSortType(sortType))} />
      </div>
      <h2 className="content__title">Items for sale</h2>
      <div className="content__items">{isLoading ? skeleton : itemCards}</div>

      <Pagination
        currentPage={currentPage}
        onPageClick={(page) => dispatch(setCurrentPage(page))}
        pageCount={pageCount}
      />
    </div>
  );
};

export default Main;
