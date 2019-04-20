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
}
