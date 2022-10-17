import React, { useEffect, useRef, useState } from 'react';
import errorImg from '../assets/img/error-image.png';
import Categories from '../components/Categories';
import ItemBlock from '../components/ItemBlock';
import Pagination from '../components/Pagination';
import Sort, { sortList } from '../components/Sort';
import Skeleton from '../components/ItemBlock/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchItems } from '../redux/slices/itemSlice';
import { useSearchParams } from 'react-router-dom';

const Main = () => {
  const [pageCount, setPageCount] = useState(3);
  const isMounted = useRef(false);
  const isSearch = useRef(false);

  let [searchParams, setSearchParams] = useSearchParams();

  const { categoryId, sortType, currentPage, searchValue } = useSelector((state) => state.filter);
  const { items, status, totalCount } = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const categoryQuery = categoryId > 0 ? `category=${categoryId}` : '';
  const sortByQuery = sortList[sortType].sortProperty === 'rate' ? 'rate' : 'price';
  const sortOrderQuery = sortList[sortType].sortOrder;
  const searchQuery = searchValue ? `&search=${searchValue}` : '';

  const getItems = async () => {
    dispatch(fetchItems({ categoryQuery, sortByQuery, sortOrderQuery, currentPage, searchQuery }));
    setPageCount(Math.ceil(totalCount / 8));
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (isMounted.current) {
      setSearchParams({
        category: categoryId > 0 ? `${categoryId}` : '',
        sortBy: sortByQuery,
        order: sortOrderQuery,
        page: currentPage,
      });
    }

    isMounted.current = true;
  }, [categoryQuery, sortByQuery, sortOrderQuery, currentPage, searchValue]);

  useEffect(() => {
    if (window.location.search) {
      const params = Object.fromEntries([...searchParams]);
      const sortByParam = sortList.findIndex(
        (obj) =>
          obj.name ===
          sortList.filter(
            (obj) => obj.sortProperty === params.sortBy && obj.sortOrder === params.order,
          )[0].name,
      );

      dispatch(
        setFilters({
          categoryId: params.category === '' ? 0 : params.category,
          sortType: sortByParam,
          currentPage: params.page,
        }),
      );

      if (window.location.search !== '?category=&sortBy=rate&order=desc&page=1') {
        isSearch.current = true;
      }
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getItems();
    }

    isSearch.current = false;
  }, [categoryQuery, sortByQuery, sortOrderQuery, currentPage, searchValue]);

  const itemCards = items
    .filter((obj) => obj['title'].toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj) => <ItemBlock key={obj.id} {...obj} />);
  const skeleton = [...Array(8)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickCategory={(categoryId) => dispatch(setCategoryId(categoryId))}
        />
        <Sort sortType={sortType} onClickSort={(sortType) => dispatch(setSortType(sortType))} />
      </div>
      {status === 'error' ? (
        <div className="content__error-info">
          <img src={errorImg} alt="error" />
          <h2>Oops! Something wrong...</h2>
          <p>Please, try again later.</p>
        </div>
      ) : (
        <>
          <h2 className="content__title">Items for sale</h2>
          <div className="content__items">{status === 'loading' ? skeleton : itemCards}</div>
        </>
      )}

      <Pagination
        currentPage={currentPage}
        onPageClick={(page) => dispatch(setCurrentPage(page))}
        pageCount={pageCount}
      />
    </div>
  );
};

export default Main;
