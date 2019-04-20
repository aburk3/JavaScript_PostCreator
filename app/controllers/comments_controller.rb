class CommentsController < ApplicationController
	before_action :set_comment, only: [:show]

  def new
		@post = Post.find(params[:post_id])
	end

	def create
		@comment = Comment.new(comment_params)
		@comment.user = current_user
		@post = Post.find(params[:post_id])
		@post.comments << @comment
    if @comment.save
      redirect_to root_path
    else
      render post_path(@post)
    end
  end

end
