// lib/api.js
const API_BASE_URL = 'http://localhost:3000';

export async function getTopUsers() {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch top users');
    }
    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error('Error fetching top users:', error);
    return [];
  }
}

export async function getTrendingPosts() {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?type=popular`);
    if (!response.ok) {
      throw new Error('Failed to fetch trending posts');
    }
    const data = await response.json();
    return data.posts;
  } catch (error) {
    console.error('Error fetching trending posts:', error);
    return [];
  }
}

export async function getLatestPosts() {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?type=latest`);
    if (!response.ok) {
      throw new Error('Failed to fetch latest posts');
    }
    const data = await response.json();
    return data.posts;
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    return [];
  }
}

// Generate random avatar images
export function getRandomAvatar(userId) {
  return `https://avatars.dicebear.com/api/human/${userId}.svg`;
}

// Generate random post images
export function getRandomPostImage(postId) {
  const imageIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const randomId = imageIds[postId % imageIds.length];
  return `https://picsum.photos/id/${randomId + 20}/800/600`;
}