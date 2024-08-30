import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PostList from '../components/PostList';
import { Post } from '../components/PostList'; // import the Post interface

// Mock data
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'First Post',
    publishDate: '2024-08-30',
    author: {
      name: 'John Doe',
      avatar: '/path/to/avatar1.jpg',
    },
    summary: 'This is the first post summary.',
    categories: [
      { id: '1', name: 'Category 1' },
      { id: '2', name: 'Category 2' },
    ],
  },
  {
    id: '2',
    title: 'Second Post',
    publishDate: '2024-08-31',
    author: {
      name: 'Jane Smith',
      avatar: '/path/to/avatar2.jpg',
    },
    summary: 'This is the second post summary.',
    categories: [
      { id: '3', name: 'Category 3' },
      { id: '4', name: 'Category 4' },
    ],
  },
];

describe('PostList', () => {
  test('renders a list of posts', () => {
    render(<PostList posts={mockPosts} />);

    // Check if the titles of the posts are rendered
    expect(screen.getByText('First Post')).toBeInTheDocument();
    expect(screen.getByText('Second Post')).toBeInTheDocument();

    // Check if the summaries of the posts are rendered
    expect(screen.getByText('This is the first post summary.')).toBeInTheDocument();
    expect(screen.getByText('This is the second post summary.')).toBeInTheDocument();

    // Check if the author names are rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  test('renders no posts when the posts array is empty', () => {
    render(<PostList posts={[]} />);

    // Check if nothing is rendered when there are no posts
    expect(screen.queryByText('First Post')).not.toBeInTheDocument();
    expect(screen.queryByText('Second Post')).not.toBeInTheDocument();
  });
});
