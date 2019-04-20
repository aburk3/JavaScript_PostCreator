require 'pry'

class SessionsController < ApplicationController
  def new
    redirect_to user_path(current_user) unless !current_user
    @user = User.new
  end

  def create
    if auth_hash = request.env["omniauth.auth"]
      oauth_email = request.env["omniauth.auth"]["info"]["email"]
      oauth_name = request.env["omniauth.auth"]["info"]["name"]
      oauth_image = request.env["omniauth.auth"]["info"]["image"]
      if @user = User.find_by(:email => oauth_email)
        session[:user_id] = @user.id

        redirect_to user_path(@user)
      else
        first_name = oauth_name.split.first
        last_name = oauth_name.split.last
        @user = User.new(:first_name => first_name, :last_name => last_name, :email => oauth_email, :password_digest => SecureRandom.hex, :image => oauth_image)
        @user.password = SecureRandom.hex

        if @user.save
          session[:user_id] = @user.id
          redirect_to user_path(@user)
        else
          raise @user.errors.full_messages.inspect
        end
      end
    else
      # Normal Login with email/password
      @user = User.find_by(email: params[:user][:email])
      if @user && @user.authenticate(params[:user][:password])
        session[:user_id] = @user.id
        redirect_to user_path(@user)
      else
        redirect_to signin_path
      end
    end
  end

  def destroy
    session.delete :user_id

    redirect_to root_url
  end

  private

  def auth
    request.env['omniauth.auth']
  end
end
