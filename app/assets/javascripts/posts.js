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
