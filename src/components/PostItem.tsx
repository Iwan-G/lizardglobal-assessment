import React from 'react';

// Define the structure of a Post object for the PostItem component
interface Post {
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

// Props for the PostItem component
interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <div className="post-item">
      <h3>{post.title}</h3>
      <div className="post-meta">
        {/* Display the author's avatar and name */}
        <img src={post.author.avatar} alt={post.author.name} />
        <span>{post.author.name}</span> | <span>{new Date(post.publishDate).toDateString()}</span>
      </div>
      <p>{post.summary}</p>
      <ul className="post-categories">
        {/* Render the categories of the post */}
        {post.categories.map(category => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostItem;
