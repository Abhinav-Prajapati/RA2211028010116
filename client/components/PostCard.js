// components/PostCard.js
import { getRandomAvatar, getRandomPostImage } from '../lib/api';
import { formatDistanceToNow } from 'date-fns';

export default function PostCard({ post, showBadge = false }) {
  const formattedDate = post.timestamp 
    ? formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })
    : 'recently';

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img 
              src={getRandomAvatar(post.userid)} 
              alt="User avatar" 
              className="rounded-full"
              width={40}
              height={40}
            />
          </div>
          <div className="ml-4 flex-1">
            <div className="text-sm font-medium text-gray-900">User ID: {post.userid}</div>
            <div className="text-sm text-gray-500">{formattedDate}</div>
          </div>
          {showBadge && (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
              🔥 Trending
            </span>
          )}
        </div>
      </div>
      <div className="border-t border-gray-200">
        <img 
          src={getRandomPostImage(post.id)}
          alt="Post image"
          className="w-full h-64 object-cover"
        />
      </div>
      <div className="px-4 py-4 sm:px-6">
        <p className="text-gray-800">{post.content}</p>
      </div>
      <div className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="flex items-center text-gray-600 hover:text-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Like
          </button>
          <button className="flex items-center text-gray-600 hover:text-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {post.commentCount || 0} Comments
          </button>
        </div>
        <button className="text-gray-600 hover:text-indigo-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </div>
    </div>
  );
}