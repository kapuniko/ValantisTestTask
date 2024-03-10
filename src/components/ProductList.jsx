import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div>
      <ul className='product-list'>
        {products.map(product => (
          <div className='product-item' key={product.id}>
            <p>ID: {product.id}</p>
            <p>Name: {product.product}</p>
            <p>Price: {product.price}</p>
            {product.brand ? <p>Brand: {product.brand}</p> : ''}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;