class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destory, :next]

  def index
    @posts = Post.all
    respond_to do |f|
      f.html
      f.json { render json: @posts }
    end
  end

end
