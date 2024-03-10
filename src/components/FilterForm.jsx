import React from 'react';

const FilterForm = ({ filterPrice, filterBrand, filterName, setFilterPrice, setFilterBrand, setFilterName, handleFilterSubmit, resetFilters }) => {
  return (
    <form className='filter-form' onSubmit={handleFilterSubmit}>
      <div>
        <div>
          <input
            type="number"
            placeholder="Filter by price"
            value={filterPrice}
            onChange={(e) => {
              setFilterPrice(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Filter by brand"
            value={filterBrand}
            onChange={(e) => {
              setFilterBrand(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Filter by name"
            value={filterName}
            onChange={(e) => {
              setFilterName(e.target.value);
            }}
          />
        </div>
        <div>
          <button type="submit">
            Filter
          </button>
          <button onClick={resetFilters}>Reset</button>
        </div>
      </div>
    </form>
  );
};

export default FilterForm;