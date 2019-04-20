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
