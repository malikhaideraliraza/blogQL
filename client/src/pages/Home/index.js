import React from 'react';

// components
import BlogList from '../../components/BlogList';

// styles
import './home.css'

const Home = () => {
  return (
    <div>
      <h1>Recents:</h1>
      <div className="blog-list">
       <BlogList /> 
      </div>
    </div>
  );
}

export default Home;
