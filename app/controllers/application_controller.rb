class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :current_user
  before_action :require_logged_in, except: [:new, :create]
  before_action :set_cache_headers

  def logged_in?
    !!current_user
  end


  private
    def require_logged_in
      redirect_to root_path unless logged_in?
    end

    def current_user
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
    end

    def set_cache_headers
      response.headers["Cache-Control"] = "no-cache, no-store, max-age=0, must-revalidate"
      response.headers["Pragma"] = "no-cache"
      response.headers["Expires"] = "Fri, 01 Jan 1990 00:00:00 GMT"
    end

    helper_method :current_user

end
