import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import "./css/movies.css";
const PaginationItems = () => {
  const navigate = useNavigate();

  const handlePageChange = (event, page) => {
      if(page){
          navigate(`/huru/best-selection-movies/watch/pages/${page}`)
      }
      return page;
  };

  return (
    <div className='pagination_content' spacing={2}>
      <Pagination
        count={1000}
        variant="outlined"
        shape="rounded"
        onChange={handlePageChange}
        className='pagination_links'
        style= {{color:"white"}}
      />
    </div>
  );
};

export default PaginationItems;
