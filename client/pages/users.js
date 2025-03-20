import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import UserCard from '../components/UserCard';
import { getTopUsers } from '../lib/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const topUsers = await getTopUsers();
        setUsers(topUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Top Users | Social Media Analytics</title>
      </Head>
      
      <div className="pb-5 border-b border-gray-200 mb-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Top Users</h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Users with the highest post counts in our platform.
        </p>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <svg className="animate-spin h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : users.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user, index) => (
            <UserCard key={user.id} user={user} rank={index + 1} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-500">No users available at the moment.</p>
        </div>
      )}
      
      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            User Statistics
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Overview of top user performance
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Total posts by top users
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {users.reduce((sum, user) => sum + user.postCount, 0)}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Average posts per user
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {users.length ? (users.reduce((sum, user) => sum + user.postCount, 0) / users.length).toFixed(1) : 0}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Top contributor
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {users.length > 0 ? users[0].name : 'N/A'}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Layout>
  );
}