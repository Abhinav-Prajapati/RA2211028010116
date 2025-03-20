import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import { getLatestPosts } from '../lib/api';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchLatestPosts() {
    try {
      setLoading(true);
      const latestPosts = await getLatestPosts();
      setPosts(latestPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLatestPosts();
    
    // Set up polling for real-time updates
    const interval = setInterval(() => {
      fetchLatestPosts();
    }, 30000); // Poll every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <Head>
        <title>Feed | Social Media Analytics</title>
      </Head>
      
      <div className="pb-5 border-b border-gray-200 mb-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Latest Posts</h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Real-time feed of the newest posts from all users.
        </p>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-500">
          {!loading && posts.length > 0 && `Showing ${posts.length} posts`}
        </div>
        <button 
          onClick={fetchLatestPosts}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh Feed
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <svg className="animate-spin h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-500">No posts available at the moment.</p>
        </div>
      )}
    </Layout>
  );
}