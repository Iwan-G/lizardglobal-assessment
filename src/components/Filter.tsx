import React from 'react';

export interface FilterProps {
  categories: string[]; // Array of category names to display in the dropdown
  onCategoryChange: (category: string) => void; // Function to handle the category change event
}

const Filter: React.FC<FilterProps> = ({ categories, onCategoryChange }) => {
  return (
    <div className="filter">
      {/* Label for the category filter dropdown */}
      <label htmlFor="category">Filter by Category:</label>
      {/* Dropdown to select a category, triggering onCategoryChange when selection changes */}
      <select id="category" onChange={(e) => onCategoryChange(e.target.value)}>
        {/* Default option to show all posts */}
        <option value="">All</option>
        {/* Map over categories array to create an option for each category */}
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
