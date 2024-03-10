import React, { useState, useEffect } from 'react';
import md5 from 'md5';
import FilterForm from './components/FilterForm';
import ProductList from './components/ProductList';
import Pagination from './components/Pagination';
import { filterDuplicates } from './utils/utils';

const API_URL = 'https://api.valantis.store:41000/';
const PASSWORD = 'Valantis';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterPrice, setFilterPrice] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterApplied, setFilterApplied] = useState(false);

  useEffect(() => {
   fetchAllData();
  }, [currentPage]);

  useEffect(() => {
   if (filterApplied) {
     fetchData();
   }
 }, [currentPage, filterApplied]);

  const fetchAllData = async () => {
   setLoading(true);
   try {
     const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
     const authString = md5(`${PASSWORD}_${timestamp}`);
     const offset = (currentPage - 1) * 50;

     const response = await fetch(API_URL, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'X-Auth': authString
       },
       body: JSON.stringify({
         action: 'get_ids',
         params: { offset, limit: 50 }
       })
     });

     if (!response.ok) {
       throw new Error('Failed to fetch products');
     }

     const data = await response.json();
     const productDetails = await fetchProductDetails(data.result);

     const filteredProducts = filterDuplicates(productDetails);

     setProducts(filteredProducts);
   } catch (error) {
     console.error('Error:', error);
   } finally {
     setLoading(false);
   }
 };


  const fetchData = async () => {
   setLoading(true);
   try {
     const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
     const authString = md5(`${PASSWORD}_${timestamp}`);
     const offset = (currentPage - 1) * 50;

     let requestParams = {
      action: 'get_ids',
      params: { offset, limit: 50 }
    };
 
     if (filterApplied) {
      const filters = {};
      if (filterPrice.trim()) {
        filters.price = parseFloat(filterPrice);
      }
      if (filterBrand.trim()) {
        filters.brand = filterBrand.trim();
      }
      if (filterName.trim()) {
        filters.product = filterName.trim();
      }
      requestParams = {
        action: 'filter',
        params: filters,
      };
    }
 
     const response = await fetch(API_URL, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'X-Auth': authString
       },
       body: JSON.stringify(requestParams)
     });
 
     if (!response.ok) {
       throw new Error('Failed to fetch products');
     }
 
     const data = await response.json();
     const productDetails = await fetchProductDetails(data.result);
     const filteredProducts = filterDuplicates(productDetails);
     setProducts(filteredProducts);
   } catch (error) {
     console.error('Error:', error);
   } finally {
     setLoading(false);
   }
 };

  const fetchProductDetails = async (ids) => {
    try {
      const uniqueIds = new Set(ids);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': md5(`${PASSWORD}_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`)
        },
        body: JSON.stringify({
          action: 'get_items',
          params: { ids: Array.from(uniqueIds) }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    setFilterApplied(true);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const resetFilters = () => {
    setLoading(true);
    setFilterPrice('');
    setFilterBrand('');
    setFilterName('');
    setFilterApplied(false);
    setCurrentPage(1);
    fetchAllData();
    setLoading(false);
  };

  return (
    <div className='container'>
      <FilterForm
        filterPrice={filterPrice}
        filterBrand={filterBrand}
        filterName={filterName}
        setFilterPrice={setFilterPrice}
        setFilterBrand={setFilterBrand}
        setFilterName={setFilterName}
        handleFilterSubmit={handleFilterSubmit}
        resetFilters={resetFilters}
      />
      {loading ? (
        <p className='loader'>Loading...</p>
      ) : (
        <div>
          <ProductList products={products} />
          <Pagination
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default App;