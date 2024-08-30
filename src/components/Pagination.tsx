import React from 'react';

export interface PaginationProps {
  postsPerPage: number; // Number of posts to display per page
  totalPosts: number; // Total number of posts available
  paginate: (pageNumber: number) => void; // Function to handle page number click
  currentPage: number; // The currently active page number
}

const Pagination: React.FC<PaginationProps> = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  // Array to store the page numbers
  const pageNumbers: number[] = [];

  // Calculate the total number of pages and populate pageNumbers array
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {/* Map over the pageNumbers array to create a list item for each page number */}
        {pageNumbers.map(number => (
          <li 
            key={number} 
            className={`page-item ${currentPage === number ? 'active' : ''}`}>
            {/* Call paginate function when a page number is clicked */}
            <a onClick={() => paginate(number)} href="#!" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
