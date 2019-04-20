class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destory, :next]

  def index
    @posts = Post.all
    respond_to do |f|
      f.html
      f.json { render json: @posts }
    end
  end

  def show
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @post }
    end
  end

  def new
    @post = Post.new
  end

end
