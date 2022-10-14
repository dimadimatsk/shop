import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

const Pagination = ({ currentPage, onPageClick, pageCount }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onPageClick(e.selected + 1)}
      pageRangeDisplayed={2}
      pageCount={pageCount}
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
