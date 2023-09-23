import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { paginationItemClasses } from "@mui/material";

const PaginationItems = () => {
  function paginationFunc() {
    const paginationNumber = 40166;
    const arr = [];
    for (let i = 1; i < paginationNumber; i++) {
      arr.push(i);
    }
    return arr;
  }

  // Call paginationFunc and store its return value in 'pages'
  const pages = paginationFunc();

  function linkComponents() {
    // Mapping over 'pages' and logging each item (for debugging)
    const links = pages.map((item, index) => {
      return (
        <Link
          to={`/huru/best-selection-movies/watch/pages/${item}`}
          key={index}
          className="items_child"
        >
          <p>{item}</p>
        </Link>
      );
    });
    return links;
  }

  return (
    <div className="pagination_links">
      {/* Example of using the Material-UI Stack and Pagination components */}
      <Stack spacing={2}>
        {
          pages.map((items)=>(
            <Pagination key = {items} count={items} color = "primary"/>
          ))
        }
      </Stack>
    </div>
  );
};

export default PaginationItems;
