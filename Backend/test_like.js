const axios = require('axios');

async function testLike() {
  try {
    // 1. Get all posts
    console.log("Fetching posts...");
    let posts = await axios.get('http://localhost:8090/api/posts/all');
    let postId = posts.data[0].id;
    console.log(`Using Post ID: ${postId}`);

    // 2. toggle like
    console.log(`Toggling like for Post ${postId}...`);
    await axios.post(`http://localhost:8090/api/interactions/like?postId=${postId}&userId=1`);
    
    // 3. get post again
    console.log("Fetching post again...");
    try {
        let postAfter = await axios.get(`http://localhost:8090/api/posts/${postId}`);
        console.log(`Post exists. Interactions: ${postAfter.data.interactions.length}`);
    } catch (e) {
        console.log("Post not found! It was deleted.");
    }

  } catch (err) {
    console.error("Test failed:", err.message);
  }
}

testLike();
