import React from 'react';
import OrderByAlphabet from '../Filters/OrderByAlphabet';
import OrderByPoblation from '../Filters/OrderByPoblation';
import style from './ContainerFilters.module.css';
import { FilterByContinent } from '../Filters/FilterByContinent';
import FilterByCreate from '../Filters/FilterByCreate';

const ContainerFilter = () => {
  return (
    <>
      <section className={`${style.containerFilter} ${style.centered}`}>
        <div>
        </div>
        <div className={style.filterSection}>
          <div className={style.filterContainer}>
            <FilterByContinent />
            <FilterByCreate />
          </div>
        </div>
        <div className={style.sortSection}>
          <div className={style.sortContainer}>
            <OrderByAlphabet />
            <OrderByPoblation />
          </div>
        </div>
      </section>
    </>
  );
};

export default ContainerFilter;
