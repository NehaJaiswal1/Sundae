
const express = require('express');
const axios = require('axios');
const cors = require('cors')
const app = express();

app.use(cors())

const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'YOUR_REDIRECT_URI';

app.get('/login', (req, res) => {
  res.redirect(
    `https://api.instagram.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media&response_type=code`
  );
});

app.get('/callback', async (req, res) => {
  const code = req.query.code;
  
  try {
    const response = await axios.post('https://api.instagram.com/oauth/access_token', {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI,
      code: code
    });
    
    const { access_token } = response.data;
    
    // Fetch user details
    const userDetails = await axios.get(`https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`);
    
    // Fetch user posts
    const userPosts = await axios.get(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,like_count&access_token=${access_token}`);
    
    // Display user details
    console.log('Name:', userDetails.data.username);
    console.log('Username:', userDetails.data.username);
    console.log('Number of followers:', userDetails.data.followers_count);
    console.log('Number of following:', userDetails.data.follows_count);
    
    // Display user posts
    userPosts.data.data.forEach(post => {
      console.log('Image:', post.media_url);
      console.log('Caption:', post.caption);
      console.log('Like Count:', post.like_count);
      console.log('--------------------');
    });
    
    res.send('Data fetched successfully!');
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('An error occurred.');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
