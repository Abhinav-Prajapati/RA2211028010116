import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import { getTrendingPosts, getLatestPosts } from '../lib/api';

export default function Posts() {
  const router = useRouter();
  const { type = 'trending' } = router.query;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        
        if (type === 'trending' || type === 'popular') {
          const trendingPosts = await getTrendingPosts();
          setPosts(trendingPosts);
        } else {
          const latestPosts = await getLatestPosts();
          setPosts(latestPosts);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    if (router.isReady) {
      fetchPosts();
    }
  }, [router.isReady, type]);

  const title = type === 'trending' || type === 'popular' ? 'Trending Posts' : 'Latest Posts';
  const description = type === 'trending' || type === 'popular' 
    ? 'Posts with the highest engagement and comment counts'
    : 'Most recent posts from our users';

  return (
    <Layout>
      <Head>
        <title>{title} | Social Media Analytics</title>
      </Head>
      
      <div className="pb-5 border-b border-gray-200 mb-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          {description}
        </p>
      </div>
      
      <div className="mb-6 flex space-x-2">
        <button 
          onClick={() => router.push('/posts?type=trending')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            type === 'trending' || type === 'popular'
              ? 'bg-indigo-100 text-indigo-800'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Trending Posts
        </button>
        <button 
          onClick={() => router.push('/posts?type=latest')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            type !== 'trending' && type !== 'popular'
              ? 'bg-indigo-100 text-indigo-800'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Latest Posts
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
        <div className="space-y-6">
          {posts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              showBadge={type === 'trending' || type === 'popular'}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-500">No posts available at the moment.</p>
        </div>
      )}

      {(type === 'trending' || type === 'popular') && posts.length > 0 && (
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Engagement Analytics
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Metrics for trending content
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Total comments
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {posts.reduce((sum, post) => sum + (post.commentCount || 0), 0)}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Average comments per post
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {posts.length ? (posts.reduce((sum, post) => sum + (post.commentCount || 0), 0) / posts.length).toFixed(1) : 0}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Most commented post
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {posts.length > 0 ? `"${posts[0].content.substring(0, 50)}${posts[0].content.length > 50 ? '...' : ''}"` : 'N/A'}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </Layout>
  );
}