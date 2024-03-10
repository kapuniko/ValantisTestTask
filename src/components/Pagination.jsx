import React from 'react';

const Pagination = ({ currentPage, handlePageChange }) => {
  return (
    <div className='pagination'>
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        Prev
      </button>
      <span>Page {currentPage}</span>
      <button onClick={() => handlePageChange(currentPage + 1)}>
        Next
      </button>
    </div>
  );
};

export default Pagination;