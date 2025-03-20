// components/UserCard.js
import Image from 'next/image';
import { getRandomAvatar } from '../lib/api';

export default function UserCard({ user, rank }) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-12 w-12 relative">
            <img 
              src={getRandomAvatar(user.id)} 
              alt={user.name}
              className="rounded-full border-2 border-indigo-500"
              width={48}
              height={48}
            />
            <div className="absolute -top-2 -right-2 bg-indigo-600 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs font-bold">
              #{rank}
            </div>
          </div>
          <div className="ml-5">
            <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
            <div className="mt-1 flex items-center">
              <span className="text-sm text-gray-500">
                {user.postCount} {user.postCount === 1 ? 'post' : 'posts'}
              </span>
              <div className="ml-2 flex-shrink-0 flex">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active User
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-4 sm:px-6 bg-gray-50">
        <div className="text-sm text-center">
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            View Profile
          </a>
        </div>
      </div>
    </div>
  );
}