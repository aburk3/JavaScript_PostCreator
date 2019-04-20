class User < ActiveRecord::Base
  has_secure_password
  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy

  validates :first_name, presence: true, on: :create
  validates :last_name, presence: true, on: :create
  validates :email, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }, presence: true, on: :create
  validates :password, presence: true, :length => {:within => 6..40}, on: :create
  validates :password, presence: true, :length => {:within => 6..40}, :allow_blank => true, on: :update

  before_save :downcase_fields

  def downcase_fields
    self.email.downcase!
  end

end
