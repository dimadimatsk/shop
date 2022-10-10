import React, { useState } from 'react';

const categories = ['All', "Men's clothing", "Women's clothing", 'Jewelery', 'Electronics'];

const Categories = () => {
  const [category, setCategory] = useState('All');
  console.log(category);

  return (
    <div className="categories">
      <ul>
        {categories.map((obj, index) => (
          <li
            key={index}
            className={obj === category ? 'active' : ''}
            onClick={() => setCategory(obj)}>
            {obj}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
