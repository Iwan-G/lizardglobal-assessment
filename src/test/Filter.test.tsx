import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Filter, { FilterProps } from '../components/Filter';

// Mock function for onCategoryChange
const mockOnCategoryChange = jest.fn();

const defaultProps: FilterProps = {
  categories: ['Technology', 'Science', 'Health'],
  onCategoryChange: mockOnCategoryChange,
};

describe('Filter', () => {
  beforeEach(() => {
    mockOnCategoryChange.mockClear();
  });

  test('renders the category filter dropdown with the correct options', () => {
    render(<Filter {...defaultProps} />);

    // Check if the default "All" option is present
    expect(screen.getByText('All')).toBeInTheDocument();

    // Check if all categories are rendered as options
    defaultProps.categories.forEach(category => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  test('calls onCategoryChange function with correct category when a category is selected', () => {
    render(<Filter {...defaultProps} />);

    // Simulate selecting the "Science" category
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Science' } });

    // Check if the onCategoryChange function is called with "Science"
    expect(mockOnCategoryChange).toHaveBeenCalledWith('Science');
  });

  test('calls onCategoryChange function with an empty string when "All" is selected', () => {
    render(<Filter {...defaultProps} />);

    // Simulate selecting the "All" option
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '' } });

    // Check if the onCategoryChange function is called with an empty string
    expect(mockOnCategoryChange).toHaveBeenCalledWith('');
  });

  test('renders correctly with no categories', () => {
    render(<Filter {...defaultProps} categories={[]} />);

    // Ensure only the "All" option is present
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(1);
    expect(screen.getByText('All')).toBeInTheDocument();
  });
});
