import styles from './NotFoundBlock.module.scss';
import notFoundImg from '../../assets/img/not-found.png';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <img src={notFoundImg} alt="not found" />
      <h2>It's empty here</h2>
      <p className={styles.description}>
        Looks like this page can't be found. Maybe it was moved or renamed.
      </p>
      <Link to={'/'}>
        <button className="button pay-btn">
          <span>Go back</span>
        </button>
      </Link>
    </div>
  );
};

export default NotFoundBlock;
