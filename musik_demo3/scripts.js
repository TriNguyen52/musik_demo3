const expandBtn = document.querySelector('.expand-btn');
const expandableItems = document.querySelectorAll('.expandable');
const friendListItems = document.querySelectorAll('.friend-list li');

expandBtn.addEventListener('click', () => {
  expandableItems.forEach(item => item.classList.toggle('expanded'));
  expandBtn.classList.toggle('caret-down');
});

friendListItems.forEach(friend => {
  let isExpanded = false;

  friend.addEventListener('click', () => {
    if (isExpanded) {
      friend.classList.remove('friend-expanded');
      isExpanded = false;
    } else {
      friend.classList.add('friend-expanded');
      isExpanded = true;
    }
  });

  friend.addEventListener('dblclick', (event) => {
    event.preventDefault();
    friend.classList.remove('friend-expanded');
    isExpanded = false;
  });
});

// Sample initial post IDs and like statuses (can be updated with a backend or database)
let postIds = ['post-1', 'post-2'];
let postLikes = {
  'post-1': false,
  'post-2': false
};

function togglePostOptions() {
  const postOptionsPopup = document.getElementById('post-options-popup');
  postOptionsPopup.style.display = 'block';
  const contentArea = document.getElementById('content');
}

function submitPost() {
  // Implement post submission functionality here
  const textarea = document.getElementById('post-textarea');
  const content = textarea.value;
  if (content.trim() !== '') {
    const postId = 'post-' + (postIds.length + 1);
    postIds.push(postId);
    postLikes[postId] = false;
    const postHtml = `
      <div class="post" id="${postId}">
        <div class="author">Your Name</div>
        <div class="timestamp">${getCurrentTimestamp()}</div>
        <div class="content">${content}</div>
        <div class="actions">
          <button onclick="toggleLike('${postId}')">Like</button>
          <button onclick="deletePost('${postId}')">Delete</button>
        </div>
      </div>
    `;
    document.getElementById('content').insertAdjacentHTML('beforeend', postHtml);
    textarea.value = '';
  }
  const postOptionsPopup = document.getElementById('post-options-popup');
  postOptionsPopup.style.display = 'none';
  const contentArea = document.getElementById('content');
  contentArea.classList.remove('blur-background');
}

function getCurrentTimestamp() {
  const now = new Date();
  return now.toLocaleString();
}

function toggleLike(postId) {
  const post = document.getElementById(postId);
  postLikes[postId] = !postLikes[postId];
  const likeButton = post.querySelector('button');
  if (postLikes[postId]) {
    likeButton.innerText = 'Unlike';
    likeButton.style.backgroundColor = '#ff6b6b';
  } else {
    likeButton.innerText = 'Like';
    likeButton.style.backgroundColor = '#4CAF50';
  }
}

function deletePost(postId) {
  const post = document.getElementById(postId);
  post.parentNode.removeChild(post);
  // Remove post ID from the postIds array and likes object
  const index = postIds.indexOf(postId);
  if (index !== -1) {
    postIds.splice(index, 1);
    delete postLikes[postId];
  }
}

function saveDraft() {
  // Implement save draft functionality here
  // For example, you can save the content to local storage or send it to the server
  alert('Draft saved!');
}

function cancelPost() {
  // Clear the textarea and hide the post options popup without posting
  const textarea = document.getElementById('post-textarea');
  textarea.value = '';
  const postOptionsPopup = document.getElementById('post-options-popup');
  postOptionsPopup.style.display = 'none';
  const contentArea = document.getElementById('content');
  contentArea.classList.remove('blur-background');
}
