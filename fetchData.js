
const axios = require('axios');

// Function to fetch Instagram data
async function fetchData() {
  try {
   
    const accountData = await axios.get('API_ENDPOINT_FOR_ACCOUNT_DETAILS');
    const postData = await axios.get('API_ENDPOINT_FOR_USER_POSTS');
    const accountDetails = {
      name: accountData.data.name,
      username: accountData.data.username,
      followers: accountData.data.followers,
      following: accountData.data.following,
    };

    const userPosts = postData.data.posts.map((post) => ({
      image: post.image,
      caption: post.caption,
      likeCount: post.likeCount,
    }));

    // Return the fetched data
    return { accountDetails, userPosts };
  } catch (error) {
    throw new Error('Failed to fetch Instagram data');
  }
}

module.exports = { fetchData };
