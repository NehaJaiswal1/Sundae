
fetch('/instagram')
  .then((response) => response.send())
  .then((data) => {
    // Display the account details
    const accountDetailsElement = document.getElementById('account-details');
    accountDetailsElement.innerHTML = `
        <p>Name: ${data.accountDetails.name}</p>
        <p>Username: ${data.accountDetails.username}</p>
        <p>Followers: ${data.accountDetails.followers}</p>
        <p>Following: ${data.accountDetails.following}</p>
    `;

    // Display the user posts
    const userPostsElement = document.getElementById('user-posts');
    data.userPosts.forEach((post) => {
      userPostsElement.innerHTML += `
          <div>
              <img src="${post.image}" alt="Post Image">
              <p>Caption: ${post.caption}</p>
              <p>Likes: ${post.likeCount}</p>
          </div>
      `;
    });
  })
  .catch((error) => {
    console.error(error);
  });
