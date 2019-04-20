$(() => {
  bindClickHandlers();
})

const bindClickHandlers = () => {
  // Prevents Default and updates URL
  $('.all_posts').on('click', (e) => {
    e.preventDefault()
    history.pushState(null, null, "/posts")
    getPosts()
  })

  $(document).on('click', ".show_link", function(e) {
    e.preventDefault()
    $('#app-container').html('')
    let id = $(this).attr('data-id')
    fetch(`/posts/${id}.json`)
    .then(res => res.json())
    .then(post => {
      let newPost = new Post(post)

      let postHtml = newPost.formatShow()

      $('#app-container').append(postHtml)
    })
  })
  /**
   * Hijacks the 'Create Post' submit form
   */
  $('#new_post').on('submit', function(e) {
    e.preventDefault();
    const values = $(this).serialize();

    /**
     * Makes AJAX post,
     * clears container html,
     * creates Post object, formats HTML,
     * and appends HTML to container
     */
    $.post('/posts', values).done(function(data) {
      $('#app-container').html('');
      const newPost = new Post(data)
      const htmlToAdd = newPost.formatShow()

      $('#app-container').html(htmlToAdd);
    })
  })
}

/**
 * Fetches the Post's and appends the returned HTML to index container
 */
const getPosts = () => {
  fetch (`/posts.json`)
    .then(res => res.json())
    .then(posts => {
      $('#app-container').html('')
      posts.forEach(post => {
        let newPost = new Post(post)
        let postHtml = newPost.formatIndex()

        $('#app-container').append(postHtml)
      })
    })
}

/**
 * Post Constructor for creating a new Post object
 */
function Post(post) {
  this.id = post.id
  this.title = post.title
  this.content = post.content
  this.user = post.user
  this.comments = post.comments
  this.likes = post.likes
}

/**
 * Formats the Post's index page
 */
Post.prototype.formatIndex = function() {
  let postHtml = `
    <a href="/posts/${this.id}" data-id="${this.id}" class="show_link"><h1>${this.title}</h1></a>
  `
  return postHtml
}

/**
 * Used to format the HTML for the Post show page
 */
Post.prototype.formatShow = function() {
  let commentHtml = "";
  let postHtml = `
    <h2 class="postTitle">${this.title}</h2> by: ${this.user.first_name + " " + this.user.last_name}
    <p class="postContent">${ this.content }</p>
    <ul>`
  for (i = 0; i < this.comments.length; i++) {
    postHtml += `
      <li>${ this.comments[i].content }</li>
    `
  }
  postHtml += `
    </ul>
    <a href="/posts/${this.id}/comments/new">Create Comment</a>`

  return postHtml
}

/**
 * Constructor function for Comments
 */
function Comment(comment) {
  this.content = comment.content
  this.user = comment.user
}
