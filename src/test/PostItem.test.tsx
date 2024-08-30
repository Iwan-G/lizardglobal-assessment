import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PostItem from '../components/PostItem';
import { Post } from '../components/PostItem';

// Mock data
const mockPost: Post = {
  id: '1',
  title: 'Sample Post',
  publishDate: '2024-08-30',
  author: {
    name: 'John Doe',
    avatar: '/path/to/avatar.jpg',
  },
  summary: 'This is a sample post summary.',
  categories: [
    { id: '1', name: 'Tech' },
    { id: '2', name: 'Science' },
  ],
};

describe('PostItem', () => {
  test('renders post details correctly', () => {
    render(<PostItem post={mockPost} />);

    // Check if the title is rendered
    expect(screen.getByText('Sample Post')).toBeInTheDocument();

    // Check if the author name is rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();

    // Check if the summary is rendered
    expect(screen.getByText('This is a sample post summary.')).toBeInTheDocument();

    // Check if the publish date is rendered in a human-readable format
    expect(screen.getByText('Fri Aug 30 2024')).toBeInTheDocument();

    // Check if the categories are rendered
    expect(screen.getByText('Tech')).toBeInTheDocument();
    expect(screen.getByText('Science')).toBeInTheDocument();

    // Check if the author's avatar is rendered with the correct alt text
    const avatar = screen.getByAltText('John Doe');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', '/path/to/avatar.jpg');
  });

  test('renders correctly without categories', () => {
    const postWithoutCategories = { ...mockPost, categories: [] };
    render(<PostItem post={postWithoutCategories} />);

    // Ensure no category list items are rendered
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});
