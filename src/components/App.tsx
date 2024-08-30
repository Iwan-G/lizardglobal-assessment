import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import Filter from './Filter';
import Pagination from './Pagination';

export interface Post {
  id: string;
  title: string;
  publishDate: string;
  author: {
    name: string;
    avatar: string;
  };
  summary: string;
  categories: {
    id: string;
    name: string;
  }[];
}

const App: React.FC = () => {
  // State to store the list of posts
  const [posts, setPosts] = useState<Post[]>([]);
  // State to store the filtered posts based on the selected category
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  // State to store the list of unique categories
  const [categories, setCategories] = useState<string[]>([]);
  // State to store the currently selected category for filtering
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  // State to track the current page number for pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  // Number of posts to display per page
  const postsPerPage = 5;

  // useEffect to fetch posts when the component mounts
  useEffect(() => {
    fetch('/api/posts')
      .then(response => response.json())
      .then(data => {
        setPosts(data.posts); // Set the fetched posts
        setFilteredPosts(data.posts); // Initialize filtered posts with all posts
        extractCategories(data.posts); // Extract and set unique categories
      })
      .catch(error => console.error('Error fetching posts:', error)); // Log errors
  }, []);

  // Function to extract unique categories from the list of posts
  const extractCategories = (posts: Post[]) => {
    const allCategories = posts.reduce<string[]>((acc, post) => {
      post.categories.forEach(category => {
        if (!acc.includes(category.name)) {
          acc.push(category.name); // Add unique category names to the accumulator
        }
      });
      return acc;
    }, []);
    setCategories(allCategories); // Set the unique categories
  };

  // Function to handle the change of selected category for filtering posts
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category); // Update the selected category
    setCurrentPage(1); // Reset to the first page when category changes
    if (category === '') {
      setFilteredPosts(posts); // Show all posts if no category is selected
    } else {
      setFilteredPosts(posts.filter(post => post.categories.some(c => c.name === category)));
    }
  };

  // Calculate the index of the last post on the current page
  const indexOfLastPost = currentPage * postsPerPage;
  // Calculate the index of the first post on the current page
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // Get the current posts to display on the current page
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Function to change the current page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="app">
      <h1>Posts</h1>
      {/* Filter component to select category for filtering posts */}
      <Filter categories={categories} onCategoryChange={handleCategoryChange} />
      {/* PostList component to display the current posts */}
      <PostList posts={currentPosts} />
      {/* Pagination component to navigate through pages */}
      <Pagination 
        postsPerPage={postsPerPage} 
        totalPosts={filteredPosts.length} 
        paginate={paginate} 
        currentPage={currentPage} 
      />
    </div>
  );
};

export default App;
