import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Pagination, { PaginationProps } from '../components/Pagination';

// Mock function for paginate
const mockPaginate = jest.fn();

const defaultProps: PaginationProps = {
  postsPerPage: 5,
  totalPosts: 20,
  paginate: mockPaginate,
  currentPage: 1,
};

describe('Pagination', () => {
  beforeEach(() => {
    mockPaginate.mockClear();
  });

  test('renders correct number of pages', () => {
    render(<Pagination {...defaultProps} />);

    // 20 total posts / 5 posts per page = 4 pages
    const pages = screen.getAllByRole('listitem');
    expect(pages).toHaveLength(4);

    // Check if the page numbers are rendered correctly
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  test('highlights the active page', () => {
    render(<Pagination {...defaultProps} currentPage={2} />);

    // Check if the second page is highlighted as active
    const activePage = screen.getByText('2').closest('li');
    expect(activePage).toHaveClass('active');
  });

  test('calls paginate function with correct page number when a page is clicked', () => {
    render(<Pagination {...defaultProps} />);

    // Click on the third page
    const thirdPageLink = screen.getByText('3');
    fireEvent.click(thirdPageLink);

    // The paginate function should be called with the page number 3
    expect(mockPaginate).toHaveBeenCalledWith(3);
  });

  test('renders no pages if totalPosts is zero', () => {
    render(<Pagination {...defaultProps} totalPosts={0} />);

    // Check if no pages are rendered
    const pages = screen.queryAllByRole('listitem');
    expect(pages).toHaveLength(0);
  });
});
