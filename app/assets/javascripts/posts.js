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
