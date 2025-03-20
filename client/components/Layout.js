// components/Layout.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('/');
  
  useEffect(() => {
    setActiveTab(router.pathname);
  }, [router.pathname]);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-indigo-600">SocialAnalytics</h1>
              </div>
              <div className="ml-6 flex space-x-8">
                <Link href="/">
                  <a className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === '/' 
                      ? 'border-indigo-500 text-gray-900' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}>
                    Feed
                  </a>
                </Link>
                <Link href="/posts?type=trending">
                  <a className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === '/posts' && router.query.type === 'trending'
                      ? 'border-indigo-500 text-gray-900' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}>
                    Trending Posts
                  </a>
                </Link>
                <Link href="/users">
                  <a className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === '/users' 
                      ? 'border-indigo-500 text-gray-900' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}>
                    Top Users
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {children}
        </div>
      </main>
      
      <footer className="bg-white mt-auto py-4 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            Social Media Analytics © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}