import React from 'react';
import styles from './CategoryWidget.module.css';

const CategoryWidget = ({ categories, onSelectCategory }) => {
  return (
    <div className={styles.widget}>
      <h3 className={styles.widgetTitle}>Categories</h3>
      <ul className={styles.categoryList}>
        {categories.map((category, index) => (
          <li
            key={index}
            className={styles.categoryItem}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryWidget;
