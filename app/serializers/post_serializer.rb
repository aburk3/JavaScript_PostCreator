class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :user
  has_many :comments
  belongs_to :user
end
