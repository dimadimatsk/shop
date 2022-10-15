import React from 'react';

const categories = ['All', "Men's clothing", "Women's clothing", 'Jewelery', 'Electronics'];

const Categories = ({ categoryId, onClickCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((obj, index) => (
          <li
            key={index}
            className={obj === categories[categoryId ? categoryId : 0] ? 'active' : ''}
            onClick={() => onClickCategory(index)}>
            {obj}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
